import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Automated WCAG scan (axe-core) on key pages. Fails on any serious or
 * critical violation. Moderate/minor findings are reported in the HTML
 * report attachment without failing the build.
 */
const pagesToScan = ["/", "/about", "/contact", "/services", "/careers"];

for (const path of pagesToScan) {
  test(`axe scan: ${path}`, async ({ page }, testInfo) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    await testInfo.attach(`axe-${path.replace(/\//g, "_") || "home"}`, {
      body: JSON.stringify(results.violations, null, 2),
      contentType: "application/json",
    });

    const serious = results.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    );
    expect(
      serious,
      serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes)`).join("\n"),
    ).toEqual([]);
  });
}

test("html lang attribute is set", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("all contact form inputs have associated labels", async ({ page }) => {
  await page.goto("/contact");
  for (const id of ["cf-name", "cf-company", "cf-email", "cf-message"]) {
    await expect(page.locator(`label[for="${id}"]`)).toHaveCount(1);
  }
});
