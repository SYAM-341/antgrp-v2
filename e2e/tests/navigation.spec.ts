import { test, expect } from "@playwright/test";
import { NavComponent } from "../pages/NavComponent";

test.describe("Header navigation (desktop)", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop-only nav tests");

  test("logo links home", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/about");
    await nav.logo.click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("direct links navigate to About, Careers, Contact", async ({ page }) => {
    const nav = new NavComponent(page);
    for (const [label, path] of [
      ["About", "/about"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ] as const) {
      await page.goto("/");
      await nav.directLink(label).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });

  test("Services mega-menu opens and navigates", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/");
    await nav.openMegaMenu("Services");
    const link = nav.megaMenuLink("Cloud Architecture & Migration");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/services\/cloud-architecture$/);
  });

  test("Industries mega-menu opens and navigates", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/");
    await nav.openMegaMenu("Industries");
    const link = nav.megaMenuLink("Healthcare");
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/industries#healthcare$/);
  });

  test("Get in Touch button goes to contact", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/");
    await nav.getInTouchButton.click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});

test.describe("Header navigation (mobile drawer)", () => {
  test.skip(({ isMobile }) => !isMobile, "Mobile-only nav tests");

  test("@mobile drawer opens, lists links, and navigates", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/");
    await expect(nav.mobileMenuButton).toBeVisible();
    await nav.openMobileDrawer();
    const aboutLink = nav.header.getByRole("link", { name: "About", exact: true });
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about$/);
  });
});

test.describe("Footer", () => {
  test("sitemap links resolve", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    for (const [name, path] of [
      ["Technology Staffing", "/services/team-augmentation"],
      ["Legal", "/legal"],
    ] as const) {
      await page.goto("/");
      await footer.getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });
});

test.describe("Mega-menu viewport containment", () => {
  test.skip(({ isMobile }) => isMobile, "Desktop-only");

  test("Services panel stays fully inside the viewport", async ({ page }) => {
    const nav = new NavComponent(page);
    await page.goto("/");
    await nav.openMegaMenu("Services");
    const link = nav.megaMenuLink("Cloud Architecture & Migration");
    await expect(link).toBeVisible();
    const box = await link.locator("xpath=ancestor::div[contains(@class,'rounded-2xl')]").first().boundingBox();
    const viewport = page.viewportSize()!;
    expect(box, "panel should render").toBeTruthy();
    expect(box!.x, "panel clipped off the left edge").toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width, "panel clipped off the right edge").toBeLessThanOrEqual(viewport.width + 1);
  });
});
