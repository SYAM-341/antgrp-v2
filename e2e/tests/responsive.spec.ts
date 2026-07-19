import { test, expect } from "@playwright/test";

/**
 * Horizontal-overflow audit: every public route must not scroll sideways
 * at mobile (375), tablet (768), or narrow-desktop (1024) widths.
 * Catches clipped/overflowing layout defects as a class.
 */
const routes = [
  "/", "/about", "/services", "/industries", "/careers",
  "/contact", "/legal", "/admin/login",
  "/services/team-augmentation", "/services/solutions-architecture",
  "/services/cloud-architecture", "/services/data-engineering",
  "/services/ai-ml", "/services/devops-infrastructure",
  "/services/full-stack-development", "/services/mobile-development",
];
const widths = [375, 768, 1024];

for (const width of widths) {
  test.describe(`no horizontal overflow @ ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of routes) {
      test(`${route} fits ${width}px`, async ({ page }) => {
        await page.goto(route);
        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return doc.scrollWidth - doc.clientWidth;
        });
        expect(overflow, `${route} overflows by ${overflow}px at ${width}px`).toBeLessThanOrEqual(1);
      });
    }
  });
}
