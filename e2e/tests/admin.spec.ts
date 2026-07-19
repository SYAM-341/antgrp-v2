import { test, expect } from "@playwright/test";
import { adminLoginViaUi, seedPublishedJob } from "../helpers";

test.describe("Recruiter admin", () => {
  test("unauthenticated /admin/jobs redirects to login", async ({ page }) => {
    await page.goto("/admin/jobs");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("wrong password shows error", async ({ page }) => {
    await page.goto("/admin/login");
    await page.locator("#admin-email").fill("recruiter@antgrp.com");
    await page.locator("#admin-password").fill("wrong-password");
    await page.getByRole("button", { name: /^sign in$/i }).click();
    await expect(page.locator("form").getByRole("alert")).toContainText(/incorrect email or password/i);
  });

  test("login → create job via UI → publish lifecycle", async ({ page }) => {
    await adminLoginViaUi(page);
    await page.getByRole("link", { name: "New job" }).click();
    const title = `E2E Cloud Architect ${Date.now()}`;
    await page.locator("#jf-title").fill(title);
    await page.locator("#jf-location").fill("Dallas, TX (Hybrid)");
    await page.locator("#jf-desc").fill("Own AWS landing-zone design for enterprise clients.");
    await page.locator("#jf-req").fill("AWS certification\nTerraform experience");
    await page.locator("#jf-status").selectOption("draft");
    await page.getByRole("button", { name: /create job/i }).click();
    await page.waitForURL(/\/admin\/jobs$/);

    const row = page.locator("tr", { hasText: title });
    await expect(row).toContainText("draft");

    // Draft job is NOT public
    await page.goto("/careers");
    await expect(page.getByText(title)).toHaveCount(0);

    // Publish it
    await page.goto("/admin/jobs");
    await page.locator("tr", { hasText: title }).getByRole("button", { name: "Publish" }).click();
    await expect(page.locator("tr", { hasText: title })).toContainText("published");

    // Now it is public
    await page.goto("/careers");
    await expect(page.getByText(title)).toBeVisible();

    // Close it again
    await page.goto("/admin/jobs");
    await page.locator("tr", { hasText: title }).getByRole("button", { name: "Close" }).click();
    await expect(page.locator("tr", { hasText: title })).toContainText("closed");
    await page.goto("/careers");
    await expect(page.getByText(title)).toHaveCount(0);
  });

  test("applications list shows submitted candidates with status control", async ({ page, request }) => {
    const job = await seedPublishedJob(request, `E2E QA Engineer ${Date.now()}`);
    // Submit an application through the API (multipart)
    const res = await request.post("/api/apply", {
      multipart: {
        jobId: job.id,
        name: "Test Candidate",
        email: "candidate@example.com",
        phone: "+1 555 010 2030",
        workAuthorization: "US Citizen / Green Card",
        resume: {
          name: "resume.pdf",
          mimeType: "application/pdf",
          buffer: Buffer.from("%PDF-1.4 minimal"),
        },
      },
    });
    expect(res.ok()).toBeTruthy();

    await adminLoginViaUi(page);
    await page.locator("tr", { hasText: job.title }).getByRole("link", { name: /1 application/ }).click();
    await expect(page.getByText("Test Candidate")).toBeVisible();
    await expect(page.getByText("candidate@example.com")).toBeVisible();

    // Status change persists (wait for the PATCH before reloading)
    const patchDone = page.waitForResponse(
      (r) => r.url().includes("/api/admin/applications/") && r.request().method() === "PATCH",
    );
    await page.getByLabel("Status for Test Candidate").selectOption("contacted");
    await patchDone;
    await page.reload();
    await expect(page.getByLabel("Status for Test Candidate")).toHaveValue("contacted");
  });
});
