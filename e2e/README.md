# AntGRP — E2E test suite (Playwright + TypeScript)

66 UI tests across two projects (desktop Chrome + Pixel 7 mobile viewport),
organized as page objects + specs.

## Layout

```
playwright.config.ts        Config: projects, baseURL, auto webServer
e2e/
  pages/
    NavComponent.ts         Header nav: mega-menus, direct links, mobile drawer
    ContactPage.ts          Contact form fields, states, API mocking helper
  tests/
    smoke.spec.ts           All 16 routes: 200, title, single h1; 404 check
    navigation.spec.ts      Mega-menus, direct links, mobile drawer, footer
    home.spec.ts            Hero, 8 service cards, 6 industry cards, no-stats guard
    contact-form.spec.ts    Validation, success, 502/429/422 states (API mocked)
    links.spec.ts           LinkedIn hrefs + target/rel, mailto channels
    accessibility.spec.ts   axe-core WCAG 2.1 AA scan on 6 pages, labels, lang
```

## Running

```bash
npx playwright install chromium     # one-time browser download

npm run test:e2e                    # builds nothing — starts the local prod
                                    # server automatically (run `npm run build` first)
npm run test:e2e:ui                 # interactive UI mode
BASE_URL=https://antgrp.com npm run test:e2e   # against production
npm run test:e2e:report             # open the last HTML report
```

Notes:

- The contact-form specs mock `/api/contact` with `page.route`, so no test
  ever sends a real email or consumes the production rate limit — safe to
  run against production.
- The `no statistics` test on the homepage is a regression guard for the
  content policy (no "N+ years/clients" claims).
- The axe scan fails only on serious/critical violations; full violation
  JSON (including minor findings) is attached to the HTML report per page.
- Firefox/WebKit projects are stubbed in `playwright.config.ts` — uncomment
  and `npx playwright install` to run cross-browser.
