import { type Page, type Locator, expect } from "@playwright/test";

/** Header navigation — desktop mega-menus, direct links, and mobile drawer. */
export class NavComponent {
  readonly page: Page;
  readonly header: Locator;
  readonly logo: Locator;
  readonly getInTouchButton: Locator;
  readonly mobileMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("header");
    this.logo = this.header.getByRole("link", { name: "AntGRP home" });
    this.getInTouchButton = this.header.getByRole("link", { name: "Get in Touch" });
    this.mobileMenuButton = this.header.getByRole("button", { name: "Toggle menu" });
  }

  desktopNav(): Locator {
    return this.header.getByRole("navigation", { name: "Main" });
  }

  async openMegaMenu(label: "Services" | "Industries"): Promise<void> {
    await this.desktopNav().getByRole("button", { name: label }).hover();
  }

  megaMenuLink(name: string): Locator {
    return this.header.getByRole("link", { name, exact: false }).first();
  }

  async openMobileDrawer(): Promise<void> {
    await this.mobileMenuButton.click();
    await expect(this.mobileMenuButton).toHaveAttribute("aria-expanded", "true");
  }

  directLink(label: "About" | "Careers" | "Contact"): Locator {
    return this.desktopNav().getByRole("link", { name: label, exact: true });
  }
}
