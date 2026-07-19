import { type Page, type Locator, expect } from "@playwright/test";

/** Contact page — form fields, states, and direct-channel links. */
export class ContactPage {
  readonly page: Page;
  readonly name: Locator;
  readonly company: Locator;
  readonly email: Locator;
  readonly message: Locator;
  readonly submitButton: Locator;
  readonly successPanel: Locator;
  readonly serverErrorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.locator("#cf-name");
    this.company = page.locator("#cf-company");
    this.email = page.locator("#cf-email");
    this.message = page.locator("#cf-message");
    this.submitButton = page.getByRole("button", { name: /send message/i });
    this.successPanel = page.getByRole("status").filter({ hasText: "Message received" });
    this.serverErrorAlert = page.locator("main").getByRole("alert");
  }

  async goto(): Promise<void> {
    await this.page.goto("/contact");
    await expect(this.name).toBeVisible();
  }

  async fill(data: {
    name?: string;
    company?: string;
    email?: string;
    message?: string;
  }): Promise<void> {
    if (data.name !== undefined) await this.name.fill(data.name);
    if (data.company !== undefined) await this.company.fill(data.company);
    if (data.email !== undefined) await this.email.fill(data.email);
    if (data.message !== undefined) await this.message.fill(data.message);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  fieldError(field: "name" | "email" | "company" | "message"): Locator {
    return this.page.locator(`#cf-${field}-error`);
  }

  /** Stub the backend so tests never send real email. */
  async mockApi(
    status: number,
    body: Record<string, unknown>,
  ): Promise<void> {
    await this.page.route("**/api/contact", (route) =>
      route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify(body),
      }),
    );
  }
}
