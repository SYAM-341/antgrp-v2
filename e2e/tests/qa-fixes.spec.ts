import { test, expect } from "@playwright/test";
import { NavComponent } from "../pages/NavComponent";

/** Regression coverage for the external QA report (v5.1). */

test.describe("QA-1/2: flyout menu behavior", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop-only");

  test("flyout closes after selecting an option", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/");
    await nav.openMegaMenu("Services");
    const link = nav.megaMenuLink("Cloud Architecture & Migration");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/services\/cloud-architecture$/);
    // The panel must be gone after navigation
    await expect(
      page.getByRole("link", { name: "Data Engineering & Analytics", exact: false }).first(),
    ).toBeHidden();
    await expect(page.locator("header").getByRole("button", { name: "Services" }))
      .toHaveAttribute("aria-expanded", "false");
  });

  test("flyout closes on Escape", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/");
    await nav.openMegaMenu("Services");
    await expect(nav.megaMenuLink("Cloud Architecture & Migration")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(nav.megaMenuLink("Cloud Architecture & Migration")).toBeHidden();
  });

  test("flyout fits a short viewport (DevTools-docked scenario)", async ({ browser }) => {
    // Simulates a browser window squeezed by docked developer tools.
    const page = await browser.newPage({ viewport: { width: 1280, height: 500 } });
    const nav = new NavComponent(page);
    await page.goto("/");
    await nav.openMegaMenu("Services");
    const link = nav.megaMenuLink("Cloud Architecture & Migration");
    await expect(link).toBeVisible();
    const panel = page.locator("header .fixed .rounded-2xl").first();
    const box = await panel.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(1281);
    expect(box!.y + box!.height).toBeLessThanOrEqual(501);
    await page.close();
  });
});

test.describe("QA-3: recruiter email on careers pages", () => {
  test("careers list page shows careers@antgrp.com mailto", async ({ page }) => {
    await page.goto("/careers");
    await expect(
      page.locator("main").getByRole("link", { name: "careers@antgrp.com" }).first(),
    ).toHaveAttribute("href", "mailto:careers@antgrp.com");
  });
});

test.describe("QA-4: back-to-top button", () => {
  test("hidden at top, appears after scroll, returns to top", async ({ page }) => {
    await page.goto("/");
    const btn = page.getByRole("button", { name: "Back to top" });
    await expect(btn).toHaveCount(0);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(btn).toBeVisible();

    await btn.click();
    await page.waitForFunction(() => window.scrollY < 50);
    await expect(btn).toHaveCount(0);
  });
});

test.describe("QA-5: footer links render cleanly", () => {
  test("Full-Stack Development stays on one line", async ({ page }) => {
    await page.goto("/");
    const link = page
      .locator("footer")
      .getByRole("link", { name: "Full-Stack Development" });
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    expect(box).toBeTruthy();
    // A wrapped two-line link would be ~2x the line height.
    expect(box!.height).toBeLessThan(30);
  });
});

test.describe("QA-6: single Privacy & Disclaimer link", () => {
  test("footer has one combined legal link, not two", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(
      footer.getByRole("link", { name: "Privacy & Disclaimer" }),
    ).toHaveAttribute("href", "/legal");
    await expect(footer.getByRole("link", { name: "Privacy", exact: true })).toHaveCount(0);
    await expect(footer.getByRole("link", { name: "Disclaimer", exact: true })).toHaveCount(0);
  });
});
