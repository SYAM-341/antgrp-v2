import { test, expect } from "@playwright/test";

const LINKEDIN_COMPANY = "https://www.linkedin.com/company/124884115/";

test.describe("LinkedIn integration", () => {
  test("footer has company link with safe attributes", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");

    const company = footer.getByRole("link", { name: /AntGRP on LinkedIn/i }).last();
    await expect(company).toHaveAttribute("href", LINKEDIN_COMPANY);
    await expect(company).toHaveAttribute("target", "_blank");
    await expect(company).toHaveAttribute("rel", /noopener/);

  });

  test("contact page has icon-only company LinkedIn link", async ({ page }) => {
    await page.goto("/contact");
    const link = page.locator("main").getByRole("link", { name: /antgrp on linkedin/i });
    await expect(link).toHaveAttribute("href", LINKEDIN_COMPANY);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveText("");
  });

  test("no founder links anywhere public", async ({ page }) => {
    for (const path of ["/", "/contact", "/about"]) {
      await page.goto(path);
      await expect(page.getByRole("link", { name: /founder/i })).toHaveCount(0);
    }
  });

  test("mailto channels are present on contact page", async ({ page }) => {
    await page.goto("/contact");
    for (const addr of ["careers@antgrp.com", "inquiry@antgrp.com"]) {
      await expect(
        page.locator("main").getByRole("link", { name: addr }),
      ).toHaveAttribute("href", `mailto:${addr}`);
    }
  });
});
