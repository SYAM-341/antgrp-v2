import { test, expect } from "@playwright/test";

const LINKEDIN_COMPANY = "https://www.linkedin.com/company/124884115/";
const LINKEDIN_FOUNDER = "https://www.linkedin.com/in/antgrpmary/";

test.describe("LinkedIn integration", () => {
  test("footer has company + founder links with safe attributes", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");

    const company = footer.getByRole("link", { name: /AntGRP on LinkedIn/i }).last();
    await expect(company).toHaveAttribute("href", LINKEDIN_COMPANY);
    await expect(company).toHaveAttribute("target", "_blank");
    await expect(company).toHaveAttribute("rel", /noopener/);

    const founder = footer.getByRole("link", { name: /founder on linkedin/i });
    await expect(founder).toHaveAttribute("href", LINKEDIN_FOUNDER);
    await expect(founder).toHaveAttribute("rel", /noopener/);
  });

  test("contact page lists both LinkedIn channels", async ({ page }) => {
    await page.goto("/contact");
    const main = page.locator("main");
    await expect(
      main.getByRole("link", { name: /antgrp company page/i }),
    ).toHaveAttribute("href", LINKEDIN_COMPANY);
    await expect(
      main.getByRole("link", { name: /founder & president/i }),
    ).toHaveAttribute("href", LINKEDIN_FOUNDER);
  });

  test("leadership page links the founder", async ({ page }) => {
    await page.goto("/leadership");
    await expect(
      page.getByRole("link", { name: /connect with our founder/i }),
    ).toHaveAttribute("href", LINKEDIN_FOUNDER);
  });

  test("mailto channels are present on contact page", async ({ page }) => {
    await page.goto("/contact");
    for (const addr of ["hradmin@antgrp.com", "finance@antgrp.com", "timesheets@antgrp.com"]) {
      await expect(
        page.locator("main").getByRole("link", { name: addr }),
      ).toHaveAttribute("href", `mailto:${addr}`);
    }
  });
});
