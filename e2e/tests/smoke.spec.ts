import { test, expect } from "@playwright/test";

/**
 * @smoke — every route loads, has exactly one h1, and the expected title.
 */
const routes: Array<{ path: string; h1: RegExp; title: RegExp }> = [
  { path: "/", h1: /expertise/i, title: /IT Consulting & Technology Staffing/ },
  { path: "/about", h1: /who we are/i, title: /About — AntGRP/ },
  { path: "/services", h1: /what we/i, title: /Services — AntGRP/ },
  { path: "/industries", h1: /industry context/i, title: /Industries — AntGRP/ },
  { path: "/careers", h1: /do the work/i, title: /Careers — AntGRP/ },
  { path: "/contact", h1: /start the/i, title: /Contact — AntGRP/ },
  { path: "/legal", h1: /disclaimers/i, title: /AntGRP/ },
  { path: "/services/team-augmentation", h1: /technology staffing/i, title: /AntGRP/ },
  { path: "/services/solutions-architecture", h1: /solutions/i, title: /AntGRP/ },
  { path: "/services/cloud-architecture", h1: /cloud architecture/i, title: /AntGRP/ },
  { path: "/services/data-engineering", h1: /data engineering/i, title: /AntGRP/ },
  { path: "/services/ai-ml", h1: /ai\/ml/i, title: /AntGRP/ },
  { path: "/services/devops-infrastructure", h1: /devops/i, title: /AntGRP/ },
  { path: "/services/full-stack-development", h1: /full-stack/i, title: /AntGRP/ },
  { path: "/services/mobile-development", h1: /mobile/i, title: /AntGRP/ },
];

for (const { path, h1, title } of routes) {
  test(`@smoke ${path} renders`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(title);
    const headings = page.getByRole("heading", { level: 1 });
    await expect(headings).toHaveCount(1);
    await expect(headings.first()).toContainText(h1);
  });
}

test("@smoke unknown route returns 404", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
});
