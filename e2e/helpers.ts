import type { APIRequestContext, Page } from "@playwright/test";

/** Shared admin password — must match the webServer env in playwright.config.ts. */
export const ADMIN_PASSWORD = "test-admin-123";
export const ADMIN_EMAIL = "recruiter@antgrp.com";

export async function adminLogin(request: APIRequestContext): Promise<void> {
  const res = await request.post("/api/admin/login", {
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  if (!res.ok()) throw new Error(`admin login failed: ${res.status()}`);
}

export async function adminLoginViaUi(page: Page): Promise<void> {
  await page.goto("/admin/login");
  await page.locator("#admin-email").fill(ADMIN_EMAIL);
  await page.locator("#admin-password").fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: /^sign in$/i }).click();
  await page.waitForURL(/\/admin\/jobs/);
}

export interface SeededJob {
  id: string;
  slug: string;
  title: string;
}

/** Creates and publishes a job through the admin API; returns its ids. */
export async function seedPublishedJob(
  request: APIRequestContext,
  title: string,
): Promise<SeededJob> {
  await adminLogin(request);
  const res = await request.post("/api/admin/jobs", {
    data: {
      title,
      location: "Remote (US)",
      employmentType: "Full-time",
      experienceLevel: "Senior",
      description: "Design and operate data pipelines for enterprise clients.",
      requirements: "5+ years experience\nStrong SQL and Python",
      salaryRange: "$130k-$160k",
      status: "published",
    },
  });
  if (!res.ok()) throw new Error(`seed job failed: ${res.status()}`);
  const body = await res.json();
  return { id: body.job.id, slug: body.job.slug, title: body.job.title };
}
