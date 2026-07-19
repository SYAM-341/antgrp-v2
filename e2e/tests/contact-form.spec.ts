import { test, expect } from "@playwright/test";
import { ContactPage } from "../pages/ContactPage";

/**
 * All backend responses are mocked with page.route so the suite never
 * sends real email or consumes the production rate limit. The real
 * backend has its own server-side tests (see TESTING_REPORT.md).
 */
test.describe("Contact form", () => {
  let contact: ContactPage;

  test.beforeEach(async ({ page }) => {
    contact = new ContactPage(page);
    await contact.goto();
  });

  test("shows inline validation errors on empty submit", async () => {
    await contact.submit();
    await expect(contact.fieldError("name")).toHaveText(/enter your name/i);
    await expect(contact.fieldError("email")).toHaveText(/enter your work email/i);
    await expect(contact.fieldError("message")).toHaveText(/tell us briefly/i);
    // Errors are wired to inputs for screen readers
    await expect(contact.name).toHaveAttribute("aria-invalid", "true");
    await expect(contact.name).toHaveAttribute("aria-describedby", "cf-name-error");
  });

  test("rejects an invalid email format", async () => {
    await contact.fill({
      name: "Test User",
      email: "not-an-email",
      message: "A sufficiently long test message.",
    });
    await contact.submit();
    await expect(contact.fieldError("email")).toHaveText(/valid email/i);
  });

  test("rejects a message under 10 characters", async () => {
    await contact.fill({ name: "Test User", email: "user@example.com", message: "short" });
    await contact.submit();
    await expect(contact.fieldError("message")).toHaveText(/at least 10 characters/i);
  });

  test("successful submission shows confirmation and clears form", async () => {
    await contact.mockApi(200, { ok: true });
    await contact.fill({
      name: "Test User",
      company: "Example Corp",
      email: "user@example.com",
      message: "We need two engineers for a platform migration.",
    });
    await contact.submit();
    await expect(contact.successPanel).toBeVisible();
    // "Send another message" resets back to an empty form
    await contact.page.getByRole("button", { name: /send another message/i }).click();
    await expect(contact.name).toBeVisible();
    await expect(contact.name).toHaveValue("");
  });

  test("server 502 shows error alert with fallback email", async () => {
    await contact.mockApi(502, {
      ok: false,
      error: "We couldn't process your message right now. Please email hradmin@antgrp.com directly.",
    });
    await contact.fill({
      name: "Test User",
      email: "user@example.com",
      message: "A sufficiently long test message.",
    });
    await contact.submit();
    await expect(contact.serverErrorAlert).toBeVisible();
    await expect(contact.serverErrorAlert).toContainText("hradmin@antgrp.com");
  });

  test("rate limit 429 surfaces retry message", async () => {
    await contact.mockApi(429, {
      ok: false,
      error: "Too many submissions. Try again in a few minutes.",
    });
    await contact.fill({
      name: "Test User",
      email: "user@example.com",
      message: "A sufficiently long test message.",
    });
    await contact.submit();
    await expect(contact.serverErrorAlert).toContainText(/too many submissions/i);
  });

  test("server-side field errors (422) map onto inputs", async () => {
    await contact.mockApi(422, {
      ok: false,
      errors: { email: "Enter a valid email address." },
    });
    await contact.fill({
      name: "Test User",
      email: "passes-client@example.com",
      message: "A sufficiently long test message.",
    });
    await contact.submit();
    await expect(contact.fieldError("email")).toHaveText(/valid email/i);
  });
});
