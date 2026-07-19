# Testing Report — AntGRP Website (v5: brand system + recruiter accounts)

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

## 9. v4 additions — careers portal & responsive audit

### Build & suite status

- `npm run build`: passes — 24 routes (16 public pages incl. dynamic
  /careers and /careers/[slug], admin pages, 9 API endpoints).
- Playwright: **151 passed, 2 intentional skips** across three projects
  (desktop 1280px, mobile Pixel 7, narrow-desktop 1024px) in ~19s.
- `npm run lint`: 0 errors.

### Careers portal — end-to-end verification (local store + mock SMTP)

| Scenario | Result |
|---|---|
| Admin login (correct / wrong password / rate limited) | ✅ 200 / 401 / 429 |
| Unauthorized job create / resume download | ✅ 401 |
| Job create → appears on /careers → detail page renders | ✅ |
| Draft job hidden from public; publish → visible; close → hidden | ✅ (UI lifecycle test) |
| Resume parse: fixture PDF extracts name/email/phone/LinkedIn | ✅ all 4 fields |
| Application form: empty submit, field errors, server 502 state | ✅ |
| Full application submit → stored, resume saved, HR email rendered | ✅ (`email notification: sent` via mock transport) |
| Admin applications list, resume download (auth-gated), status persistence | ✅ |
| Health endpoint (keep-alive target) | ✅ 200 + DB touch |

Supabase-backed storage uses the same `Store` interface exercised above;
live Supabase behavior (signed URLs, RLS) could not be tested without an
account and is listed as a limitation.

### Responsive audit (workstream 1)

- New automated overflow check: 17 routes x 3 widths (375/768/1024) assert
  zero horizontal overflow.
- **Two real defects found and fixed:**
  1. Mega-menu panel clipped off-viewport at narrow desktop widths
     (positioning anchored to the nav item; now viewport-centered with a
     max-width clamp). Regression-tested by a bounding-box assertion that
     runs at both 1280px and 1024px.
  2. Header overflow at exactly 768px — the desktop nav needed 788px,
     pushing the CTA off-screen. Desktop nav breakpoint moved from `md`
     (768px) to `lg` (1024px); tablets now get the mobile drawer.
- New `narrow-desktop` (1024x768) Playwright project re-runs navigation +
  smoke specs on every run.

### v4 known limitations

1. **Supabase not live-tested** (no account/credentials in the build
   environment). The store interface is fully exercised against the local
   implementation; the Supabase implementation is code-reviewed and uses
   documented SDK calls only. First production submission should be
   verified after setup (README steps).
2. **Resume parsing is heuristic** — scanned PDFs yield no autofill (the
   UI tells the candidate); unusual name layouts may not extract. By
   design, uncertain fields stay blank.
3. **Single shared recruiter password** (v1 scope). Per-recruiter accounts
   would need Supabase Auth — a documented future step, still free.
4. **In-memory rate limiting** on serverless remains best-effort per
   instance (unchanged from v3; honeypot and validation still apply).
5. **Keep-alive/backup workflows** require the repo to be on GitHub with
   two secrets set for backups; they cannot be tested from this
   environment but use standard Actions features only.


## 10. v5 additions

### Suite status
- `npm run build`: passes — 25 routes.
- Playwright: **158 passed, 2 intentional skips** across desktop /
  mobile / narrow-desktop projects (~27s). `npm run lint`: 0 errors.
- axe WCAG 2.1 AA scans pass on all scanned pages with the new
  serif/sans system and darkened palette.

### What was verified end to end (local fallback mode + mock SMTP)
| Scenario | Result |
|---|---|
| Registration: non-@antgrp.com rejected server-side (403) | ✅ |
| Registration: domain OK → 503 without Supabase (documented local behavior); short password 422 | ✅ |
| Login: non-domain email rejected even with valid password | ✅ |
| Login sets HttpOnly cookie; logout clears; admin bounces to login | ✅ |
| All admin APIs 401 without session | ✅ |
| Job posting records "posted by <recruiter email>" and displays it | ✅ |
| Application notification delivered to careers@ (mock log verified) | ✅ |
| Contact notification delivered to inquiry@ (mock log verified) | ✅ |
| Serif applied to h1; sans on body/buttons; no Manrope loaded | ✅ |
| Tagline "Expertise, delivered." renders with teal accent | ✅ |
| Capability grid renders 4 cards with icons | ✅ |
| Contact: no mailing address; icon-only LinkedIn; no founder links on /, /about, /contact | ✅ |

### Needs live verification after Supabase Auth setup (cannot be tested here)
1. Verification email delivery through Hostinger SMTP (Supabase dashboard
   config) and the click-through confirm flow.
2. signInWithPassword against real accounts, including the unverified-
   account 403 path.
3. First production job posting attributed to a real recruiter account.

### v5 limitations
- Local fallback mode intentionally accepts any @antgrp.com email with
  the shared dev password — development convenience only; do not set
  ADMIN_PASSWORD in production once Supabase Auth is live.
- Password reset is handled by Supabase's built-in recovery email flow;
  a custom in-site reset page is a possible future addition.


## 11. v5.1 — external QA report fixes

All six findings from the independent tester were fixed and regression-
tested (e2e/tests/qa-fixes.spec.ts):

| # | Finding | Fix | Regression test |
|---|---|---|---|
| 1 | Flyout stayed open after selecting an option | Mega-menus rewritten from CSS hover to React state; closed on link click and on every route change | ✅ closes after navigation; aria-expanded resets |
| 2 | Services flyout rendered incorrectly with DevTools open | Panel now conditionally rendered with max-height + internal scroll; verified at a 1280x500 (DevTools-docked) viewport | ✅ bounding box fully inside short viewport |
| — | (bonus) | Escape key closes the flyout; caret rotates with state | ✅ |
| 3 | No recruiter email for direct resumes | careers@antgrp.com mailto added on /careers and on every job's apply section | ✅ mailto present |
| 4 | No back-to-top button | Floating accessible button (appears after 500px scroll, smooth-scrolls up) | ✅ hidden at top, visible after scroll, returns to top |
| 5 | Footer link "Full-Stack Development" wrapped into two lines; excess spacing | Footer links no-wrap, sitemap columns rebalanced, footer padding tightened | ✅ single-line bounding check |
| 6 | Privacy and Disclaimer both pointed at /legal | Combined into a single "Privacy & Disclaimer" link (client's chosen option) | ✅ one link, old two absent |

Suite after fixes: **165 passed, 2 intentional skips**; build and lint clean.
