import { test, expect } from "@playwright/test";
import { ADMIN_EMAIL, ADMIN_PASSWORD, adminLoginViaUi } from "../helpers";

/**
 * Recruiter accounts. The suite runs in LOCAL fallback mode (no Supabase
 * credentials): any @antgrp.com email + the shared dev password signs in.
 * Domain enforcement and session behavior are identical in both modes;
 * Supabase-specific behavior (verification emails) needs live checking
 * after setup — see TESTING_REPORT.
 */
test.describe("Registration domain enforcement", () => {
  test("non-antgrp.com address is rejected server-side", async ({ request }) => {
    const res = await request.post("/api/admin/register", {
      data: { email: "someone@gmail.com", password: "a-long-password-123" },
    });
    expect(res.status()).toBe(403);
    const body = await res.json();
    expect(body.error).toContain("@antgrp.com");
  });

  test("antgrp.com address passes the domain gate (503 without Supabase)", async ({ request }) => {
    const res = await request.post("/api/admin/register", {
      data: { email: "newhire@antgrp.com", password: "a-long-password-123" },
    });
    expect(res.status()).toBe(503); // domain OK; Supabase not configured locally
  });

  test("short password rejected", async ({ request }) => {
    const res = await request.post("/api/admin/register", {
      data: { email: "newhire@antgrp.com", password: "short" },
    });
    expect(res.status()).toBe(422);
  });

  test("register page renders with domain notice", async ({ page }) => {
    await page.goto("/admin/register");
    await expect(page.getByText(/@antgrp\.com email addresses/i)).toBeVisible();
    await expect(page.locator("#reg-email")).toBeVisible();
  });
});

test.describe("Login and sessions", () => {
  test("non-domain email cannot sign in even with correct password", async ({ request }) => {
    const res = await request.post("/api/admin/login", {
      data: { email: "attacker@gmail.com", password: ADMIN_PASSWORD },
    });
    expect(res.status()).toBe(401);
  });

  test("login sets HttpOnly cookie; logout clears it", async ({ page, context }) => {
    await adminLoginViaUi(page);
    const cookie = (await context.cookies()).find((c) => c.name === "antgrp_admin");
    expect(cookie).toBeTruthy();
    expect(cookie!.httpOnly).toBe(true);

    // Header shows the signed-in recruiter and a sign-out button
    await expect(page.getByText(`Signed in as`)).toBeVisible();
    await expect(page.getByText(ADMIN_EMAIL, { exact: true })).toBeVisible();
    await page.getByRole("button", { name: /sign out/i }).click();
    await page.waitForURL(/\/admin\/login/);

    // Session is gone: admin page bounces back to login
    await page.goto("/admin/jobs");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("admin APIs return 401 without a session", async ({ request }) => {
    for (const [method, url] of [
      ["get", "/api/admin/jobs"],
      ["post", "/api/admin/jobs"],
      ["get", "/api/admin/applications"],
    ] as const) {
      const res = await (method === "get"
        ? request.get(url)
        : request.post(url, { data: {} }));
      expect(res.status(), `${method.toUpperCase()} ${url}`).toBe(401);
    }
  });

  test("job created via UI records posted-by", async ({ page }) => {
    await adminLoginViaUi(page);
    await page.getByRole("link", { name: "New job" }).click();
    const title = `E2E PostedBy ${Date.now()}`;
    await page.locator("#jf-title").fill(title);
    await page.locator("#jf-location").fill("Remote");
    await page.locator("#jf-desc").fill("Posted-by attribution test posting.");
    await page.locator("#jf-req").fill("One requirement");
    await page.getByRole("button", { name: /create job/i }).click();
    await page.waitForURL(/\/admin\/jobs$/);
    const row = page.locator("tr", { hasText: title });
    await expect(row).toContainText(`posted by ${ADMIN_EMAIL}`);
  });
});
