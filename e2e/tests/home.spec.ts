import { test, expect } from "@playwright/test";

test.describe("Homepage content", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hero renders headline, copy, and CTAs", async ({ page }) => {
    await expect(
      page.getByRole("heading", { level: 1, name: /right people/i }),
    ).toBeVisible();
    const hero = page.locator("section").first();
    await expect(hero.getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(hero.getByRole("link", { name: /explore services/i })).toHaveAttribute(
      "href",
      "/services",
    );
  });

  test("all eight service cards render with links", async ({ page }) => {
    const section = page.locator("section", { hasText: "Eight services" }).first();
    const cards = section.getByRole("link", { name: /learn more/i });
    await expect(cards).toHaveCount(8);
  });

  test("all six industry cards render", async ({ page }) => {
    for (const name of [
      "Healthcare",
      "Finance & Banking",
      "Telecommunications",
      "Retail & E-Commerce",
      "Insurance",
      "Technology & SaaS",
    ]) {
      await expect(
        page.locator("main").getByRole("link", { name: new RegExp(name) }).first(),
      ).toBeVisible();
    }
  });

  test("no statistics or numeric claims on the page", async ({ page }) => {
    const body = await page.locator("main").innerText();
    expect(body).not.toMatch(/\d+\+\s*(years|clients|consultants|engagements|specialists)/i);
  });

  test("closing CTA links to contact and about", async ({ page }) => {
    const cta = page.locator("section", { hasText: "Tell us what you need" }).last();
    await expect(cta.getByRole("link", { name: /get in touch/i })).toHaveAttribute(
      "href",
      "/contact",
    );
    await expect(cta.getByRole("link", { name: /about antgrp/i })).toHaveAttribute(
      "href",
      "/about",
    );
  });
});
