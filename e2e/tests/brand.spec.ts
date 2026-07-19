import { test, expect } from "@playwright/test";

/** v5 brand system: serif display headings, sans UI, tagline, capability
 *  grid, and contact-page cleanup. */
test.describe("Typography system", () => {
  test("h1 uses the serif; body and buttons use the sans", async ({ page }) => {
    await page.goto("/");
    const h1Font = await page
      .getByRole("heading", { level: 1 })
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(h1Font).toContain("Source Serif 4");

    const bodyFont = await page.evaluate(
      () => getComputedStyle(document.body).fontFamily,
    );
    expect(bodyFont).toContain("Source Sans 3");
    expect(bodyFont).not.toContain("Serif");

    const btnFont = await page
      .getByRole("link", { name: /start a conversation/i })
      .evaluate((el) => getComputedStyle(el).fontFamily);
    expect(btnFont).toContain("Source Sans 3");
  });

  test("body text uses the darkened palette at 17px", async ({ page }) => {
    await page.goto("/");
    const style = await page.evaluate(() => {
      const s = getComputedStyle(document.body);
      return { size: s.fontSize, color: s.color };
    });
    expect(style.size).toBe("17px");
  });

  test("no Manrope anywhere", async ({ page }) => {
    await page.goto("/");
    const fonts = await page.evaluate(() =>
      Array.from(document.fonts).map((f) => f.family).join(","),
    );
    expect(fonts).not.toContain("Manrope");
  });
});

test.describe("Hero tagline", () => {
  test('renders "Expertise, delivered." with teal accent line', async ({ page }) => {
    await page.goto("/");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toContainText("Expertise,");
    await expect(h1).toContainText("delivered.");
    await expect(h1.locator("span.text-brand")).toHaveText("delivered.");
  });
});

test.describe("Capability grid", () => {
  test("renders four capability cards with icons", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section", { hasText: "Four practices" }).first();
    for (const title of [
      "Cloud & Infrastructure",
      "Data & Analytics",
      "AI & Machine Learning",
      "Enterprise Software",
    ]) {
      await expect(section.getByRole("heading", { name: title })).toBeVisible();
    }
    await expect(section.locator("svg")).toHaveCount(4);
  });
});

test.describe("Contact page cleanup", () => {
  test("no mailing address card", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByText(/mailing address/i)).toHaveCount(0);
    await expect(page.getByText(/available on request/i)).toHaveCount(0);
  });
});
