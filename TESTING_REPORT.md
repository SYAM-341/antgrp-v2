# Testing Report — AntGRP Website (v3)

Date: 2026-07-18
Scope: light-theme redesign, copy rewrite, About page, LinkedIn
integration, and the contact-form backend (email + HR webhook).

## 1. Build & static analysis

| Check | Command | Result |
|---|---|---|
| Install | `npm install` | Passes |
| Production build | `npm run build` | **Passes.** 17 static routes + 1 dynamic API route (`/api/contact`), Next.js 16.2.6 / Turbopack. No network access needed (self-hosted Manrope). |
| TypeScript | part of `next build` | Passes |
| Lint | `npm run lint` | **0 errors** (one pre-existing style warning on `postcss.config.mjs`) |

## 2. Functional tests (production server)

All routes requested against `npm run start`; every page returned HTTP
200: `/`, `/about`, `/leadership`, `/industries`, `/careers`, `/contact`,
`/legal`, `/services`, and all 8 service detail pages.

Navigation: About and Leadership are now direct top-level links; Services
and Industries retain mega-menus; mobile drawer mirrors the same items.
Footer sitemap verified against the actual route list.

## 3. Contact form backend — end-to-end tests

Environment: production build, `MAIL_TO` set (mock email transport — no
SMTP credentials available in the test environment), `HR_WEBHOOK_URL`
pointed at a local listener that recomputes and checks the HMAC signature.

| # | Scenario | Expected | Result |
|---|---|---|---|
| T1 | GET all routes | 200 | ✅ |
| T2 | Valid submission | 200 `{ok:true}`; email rendered; webhook delivered with **valid HMAC** | ✅ (listener logged payload, `valid: true`) |
| T3 | Invalid email format | 422 + `errors.email` | ✅ |
| T4 | Message under 10 chars | 422 + `errors.message` | ✅ |
| T5 | Honeypot field filled | Fake 200, **no** email/webhook delivery | ✅ (listener received nothing) |
| T6 | Malformed JSON body | 400 | ✅ |
| T7 | XSS payload in name/message | Accepted but HTML-escaped in email (`&lt;script&gt;…`) | ✅ (verified in rendered email HTML) |
| T8 | 6th submission inside 10-min window | 429 with retry message | ✅ (three consecutive 429s) |
| T9 | All delivery channels failing (webhook down, no email) | 502 with user-facing fallback message | ✅ |

**Email behavior**: with no `SMTP_HOST`, nodemailer's `jsonTransport`
renders the complete message (from/to/reply-to/subject/text/HTML) to the
server log — the full pipeline up to the SMTP handshake is exercised.
Real SMTP delivery could not be tested because no credentials exist in
this environment; the transport switch is a single config branch and the
message construction is identical in both modes.

**HR webhook**: tested against a real local HTTP listener. Verified the
documented payload shape, the 5-second timeout path (T9), and that the
`X-Antgrp-Signature` HMAC-SHA256 digest validates against the shared
secret. The production HR endpoint URL/spec was not available; the
integration layer and its activation requirements are documented in the
README ("HR integration").

## 4. UI states (contact form)

Implemented and code-reviewed: inline field errors with `aria-invalid` +
`aria-describedby`, disabled submitting state, success confirmation
(`role="status"`), and a server-error banner (`role="alert"`) shown on
429/5xx with a fallback email address. Client-side validation mirrors the
server rules via the shared `lib/contact.ts`, and the server re-validates
authoritatively (verified by T3/T4 issued directly against the API,
bypassing the client).

## 5. Accessibility checks

- `<html lang="en">` present; one `<h1>` per page; heading levels nest
  h1 → h2 → h3 without skips (grep-verified across pages).
- Color contrast (computed): body text `#1f2b3a` on white 14.5:1;
  secondary `#545b66` 6.8:1; accent `#0f766e` on white 5.4:1; white on
  accent buttons 5.4:1; footer `slate-300`/`slate-400` on `#1f2b3a` ≥
  5.5:1 — all meet WCAG AA for their text sizes.
- Every form input has a programmatically associated `<label>`; required
  fields marked; honeypot hidden from assistive tech (`aria-hidden`,
  `tabIndex={-1}`, off-screen).
- External LinkedIn links: `rel="noopener noreferrer"`, visible text
  labels, and screen-reader-only "(opens in a new tab)" notes; the
  icon-only footer link has an `aria-label`.
- Decorative SVGs marked `aria-hidden`; mobile menu button exposes
  `aria-expanded`.
- Note: automated tooling (axe, Lighthouse) could not run — no browser is
  available in this environment. Checks above were performed against the
  rendered HTML and computed contrast ratios.

## 6. Responsive testing

No headless browser is available in this sandbox (system dependencies for
Playwright's Chromium cannot be installed without root — attempted and
blocked), so responsive behavior was verified at the rendered-HTML/CSS
level:

- Mobile nav toggle/drawer (`md:hidden`/`md:flex`) present and mirrors
  desktop items.
- 30+ responsive grid declarations across pages (`sm:`/`md:`/`lg:`
  breakpoints) for card grids, the form layout (2-column collapsing to
  1), footer columns, and the process strip.
- Type scales down at each breakpoint (`text-4xl md:text-5xl lg:text-6xl`
  hero, etc.).
- Recommended before launch: a manual pass at 375 / 768 / 1024 / 1440 px
  or a preview deploy (Vercel/Netlify render in real browsers).

## 7. Known limitations

1. **SMTP not live-tested** — no credentials in the build environment;
   mock transport verified the full message pipeline instead (§3).
2. **HR endpoint is a documented placeholder** — the integration layer is
   complete and tested against a local listener; activation needs the
   four items listed in the README.
3. **Rate limiter is in-memory** — correct on a single instance; use a
   shared store on serverless/multi-instance hosting (documented, and the
   code is isolated for the swap).
4. **No pixel-level browser testing** in this environment (§5, §6).
5. **Company LinkedIn URL** — the brief supplied the admin dashboard URL,
   which only admins can open; the site links the public company page
   form of the same URL (`linkedin.com/company/124884115/`).
6. **No persistent storage of submissions** — by design (privacy);
   delivery is email + webhook. If an audit trail is required, add a
   database write in the API route.

## 8. Summary

Production build succeeds; all 18 routes serve correctly; the form
workflow — validation, sanitization, honeypot, rate limiting, email
notification, and signed HR webhook forwarding — was tested end to end as
far as available credentials allow (mock SMTP transport, local webhook
listener with real HMAC verification). Remaining activation steps are
credential/endpoint provisioning only, documented in the README.
