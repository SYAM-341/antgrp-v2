import { test, expect } from "@playwright/test";
import path from "path";
import { seedPublishedJob, type SeededJob } from "../helpers";

const FIXTURE_RESUME = path.join(__dirname, "..", "fixtures", "resume.pdf");

test.describe("Careers portal (candidate)", () => {
  let job: SeededJob;

  test.beforeAll(async ({ request }) => {
    job = await seedPublishedJob(request, `E2E Data Engineer ${Date.now()}`);
  });

  test("published job appears on /careers and detail page renders", async ({ page }) => {
    await page.goto("/careers");
    const card = page.getByRole("link", { name: new RegExp(job.title) });
    await expect(card).toBeVisible();
    await card.click();
    await expect(page).toHaveURL(new RegExp(`/careers/${job.slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText(job.title);
    await expect(page.getByText("Apply for this position")).toBeVisible();
  });

  test("empty submit shows client-side validation errors", async ({ page }) => {
    await page.goto(`/careers/${job.slug}`);
    await page.getByRole("button", { name: /submit application/i }).click();
    await expect(page.locator("#af-name-error")).toHaveText(/enter your name/i);
    await expect(page.locator("#af-email-error")).toHaveText(/enter your email/i);
    await expect(page.locator("#af-resume-error")).toHaveText(/attach your resume/i);
  });

  test("resume upload autofills candidate fields", async ({ page }) => {
    await page.goto(`/careers/${job.slug}`);
    await page.locator("#af-resume").setInputFiles(FIXTURE_RESUME);
    // Autofill note appears after server-side parsing
    await expect(page.getByText(/pre-filled \d+ field/i)).toBeVisible({ timeout: 15000 });
    await expect(page.locator("#af-name")).toHaveValue("Priya Sharma");
    await expect(page.locator("#af-email")).toHaveValue("priya.sharma@example.com");
    await expect(page.locator("#af-phone")).toHaveValue(/469/);
    await expect(page.locator("#af-linkedin")).toHaveValue(/linkedin\.com\/in\/priyasharma-dev/);
  });

  test("full application submits successfully", async ({ page }) => {
    await page.goto(`/careers/${job.slug}`);
    await page.locator("#af-resume").setInputFiles(FIXTURE_RESUME);
    await expect(page.getByText(/pre-filled \d+ field/i)).toBeVisible({ timeout: 15000 });
    await page.locator("#af-auth").selectOption("Work visa (H1B, L1, etc.)");
    await page.getByRole("button", { name: /submit application/i }).click();
    await expect(page.getByRole("status").filter({ hasText: "Application received" }))
      .toBeVisible({ timeout: 15000 });
  });

  test("server error state shows fallback message", async ({ page }) => {
    await page.route("**/api/apply", (route) =>
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "We couldn't save your application. Please try again or email careers@antgrp.com." }),
      }),
    );
    await page.goto(`/careers/${job.slug}`);
    await page.locator("#af-resume").setInputFiles(FIXTURE_RESUME);
    await expect(page.getByText(/pre-filled \d+ field/i)).toBeVisible({ timeout: 15000 });
    await page.locator("#af-auth").selectOption("Requires sponsorship");
    await page.getByRole("button", { name: /submit application/i }).click();
    await expect(page.locator("main").getByRole("alert")).toContainText("careers@antgrp.com");
  });

  test("unknown job slug returns 404", async ({ page }) => {
    const res = await page.goto("/careers/not-a-real-job");
    expect(res?.status()).toBe(404);
  });
});
