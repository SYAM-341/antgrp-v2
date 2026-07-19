import { defineConfig, devices } from "@playwright/test";

/**
 * AntGRP website E2E suite.
 *
 * BASE_URL env var controls the target:
 *   - unset          → starts a local production build automatically (webServer)
 *   - https://...    → runs against a deployed environment (no webServer)
 *
 * Examples:
 *   npx playwright test
 *   BASE_URL=https://antgrp.com npx playwright test
 */
const baseURL = process.env.BASE_URL ?? "http://localhost:3000";
const isExternal = Boolean(process.env.BASE_URL);

export default defineConfig({
  testDir: "./e2e/tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
      // Mobile project runs the specs tagged @mobile plus nav/smoke coverage.
      grep: /@mobile|@smoke/,
    },
    {
      // Narrow desktop (split-screen laptop widths) — regression coverage
      // for layout defects that only appear between mobile and full width.
      name: "narrow-desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1024, height: 768 } },
      testMatch: ["**/navigation.spec.ts", "**/smoke.spec.ts"],
    },
    // Enable for cross-browser runs on a machine with the browsers installed:
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  ...(isExternal
    ? {}
    : {
        webServer: {
          // Test-only credentials; must match e2e/helpers.ts.
          command:
            "ADMIN_PASSWORD=test-admin-123 MAIL_TO=hradmin@antgrp.com npm run start",
          url: baseURL,
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
        },
      }),
});
