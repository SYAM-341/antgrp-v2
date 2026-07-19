# AntGRP — Website

A Next.js 16 + Tailwind CSS v4 site for AntGRP, an IT consulting and
technology staffing firm. Version 3: bright light-first design (Manrope
typeface, warm off-white / slate / muted-teal palette), rewritten copy, a
fully implemented About page in the main navigation, LinkedIn integration,
and a real backend for the contact form with email notification and an HR
webhook integration layer.

## Requirements

- Node.js 18.18+ (built and tested on Node 22)
- npm 10+

## Quick start (local development)

```bash
npm install
cp .env.example .env.local   # optional — the form works without it (mock mode)
npm run dev                  # http://localhost:3000
```

With no environment variables set, contact-form submissions are validated
and "delivered" through a mock email transport that prints the full
rendered message to the server console — useful for development and demos
without credentials.

## Production build & run

```bash
npm run build
npm run start                # serves on http://localhost:3000
```

The build has no network dependency (fonts are self-hosted via
`@fontsource-variable/manrope`), so it runs in offline/CI environments.

## Lint

```bash
npm run lint
```

---

## Environment variables

All configuration lives in environment variables — see `.env.example`.
Never commit real values; `.gitignore` already excludes `.env*`.

| Variable | Required | Purpose |
|---|---|---|
| `MAIL_TO` | for email | Recipient(s) of form notifications, comma-separated |
| `MAIL_FROM` | no | From header on notifications (default `AntGRP Website <no-reply@antgrp.com>`) |
| `SMTP_HOST` | for real email | SMTP server hostname. Unset = mock transport (logs to console) |
| `SMTP_PORT` | no | Default `587` |
| `SMTP_SECURE` | no | `"true"` for implicit TLS (port 465); default STARTTLS |
| `SMTP_USER` / `SMTP_PASS` | if server requires auth | SMTP credentials |
| `HR_WEBHOOK_URL` | for HR sync | HR system endpoint that receives submissions as JSON |
| `HR_WEBHOOK_SECRET` | recommended | Shared secret for HMAC-SHA256 body signing |

## Email setup

Any standard SMTP provider works (Google Workspace, Microsoft 365, Amazon
SES, Postmark, Mailgun, etc.). Example for a typical provider:

```bash
MAIL_TO=hradmin@antgrp.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=apikey-or-username
SMTP_PASS=secret
```

If `SMTP_HOST` is unset, the app falls back to nodemailer's `jsonTransport`
mock: the message (subject, recipients, text and HTML bodies) is rendered
and written to the server log so the pipeline can be tested end to end
without credentials.

## HR integration (webhook)

Every valid submission is forwarded to the HR admin system as an HTTP POST
if `HR_WEBHOOK_URL` is set.

**Payload** (JSON, `Content-Type: application/json`):

```json
{
  "source": "antgrp-website",
  "type": "contact_form",
  "receivedAt": "2026-07-18T22:45:32.225Z",
  "data": {
    "name": "John Smith",
    "email": "john@client.io",
    "company": null,
    "message": "…"
  }
}
```

**Authentication**: if `HR_WEBHOOK_SECRET` is set, the request carries an
`X-Antgrp-Signature: sha256=<hex>` header — an HMAC-SHA256 digest of the
raw request body. The HR system should recompute the digest and compare in
constant time; a reference implementation is in `lib/webhook.ts`
(`verifySignature`). Requests time out after 5 seconds; failures are
logged server-side and, if email also fails, surfaced to the user as a
server-error state.

**To activate the integration, the HR system owner needs to provide:**

1. The HTTPS endpoint URL that accepts the POST above (set as `HR_WEBHOOK_URL`).
2. A shared secret for signing (set as `HR_WEBHOOK_SECRET` on both sides).
3. Confirmation of the expected success response (any 2xx is treated as delivered).
4. Optionally: any field-mapping requirements, if the payload shape above
   needs to change (edit `forwardToHr` in `app/api/contact/route.ts`).

## Form security & privacy

- **Validation** — server-side (authoritative) and client-side (fast
  feedback) via the shared `lib/contact.ts`. Length limits and email
  format enforced on every field.
- **Sanitization** — control characters stripped from all inputs; all
  values HTML-escaped before inclusion in the notification email.
- **Anti-spam** — a CSS-hidden honeypot field; submissions that fill it
  receive a fake success and are discarded without delivery.
- **Rate limiting** — 5 submissions per IP per 10 minutes (HTTP 429
  beyond that). The limiter is in-memory, which is correct for a
  single-instance deployment; on serverless or multi-instance hosting,
  swap it for a shared store (e.g. Upstash Redis) — the logic is isolated
  at the top of `app/api/contact/route.ts`.
- **Privacy** — applicant data is not persisted by the website; it exists
  only in the notification email and the HR webhook delivery. Server logs
  record delivery outcomes, not form contents (the mock email transport,
  dev-only, is the single exception).

## UI states

The contact form (`components/ContactForm.tsx`) implements:
- inline field validation errors (`aria-invalid` + `aria-describedby`),
- a submitting state with disabled button,
- a success confirmation (`role="status"`),
- a server-error banner (`role="alert"`) for 429/5xx responses, with a
  fallback email address.

## LinkedIn

- Company page: `https://www.linkedin.com/company/124884115/` — linked
  from the footer (icon + text) and the contact page. Note: the URL
  provided in the brief was the admin dashboard
  (`…/admin/dashboard/`), which only page admins can open; the public
  form of the same page URL is used so visitors don't hit a login wall.
- Founder/President: `https://www.linkedin.com/in/antgrpmary/` — linked
  from the footer, the contact page, and the Leadership page.
- All external links use `target="_blank"` with
  `rel="noopener noreferrer"` and screen-reader text noting the new tab.

## Design system

- **Typeface**: Manrope (variable, self-hosted). Body 16px / 1.65 line
  height.
- **Palette**: warm off-white `#faf9f6`, soft gray `#f3f2ee`, hairline
  `#e6e4df`, deep slate `#1f2b3a` (text + footer), secondary text
  `#545b66` (6.8:1 on white), accent teal `#0f766e` (5.4:1 on white —
  WCAG AA for normal text).
- **Tokens** live in `app/globals.css` (`@theme`) and are mirrored in
  `tailwind.config.ts`. Change `--color-brand`/`brand-3` to re-accent the
  whole site.
- The only remaining dark surface is the footer (deep slate); all page
  headers, the hero, and every content section are light.

## Project structure

```
app/
  page.tsx                    Home
  about/page.tsx              About — purpose, capabilities, values, approach
  leadership/page.tsx         Leadership & governance (+ founder LinkedIn)
  careers/page.tsx            Open roles
  contact/page.tsx            Contact channels, LinkedIn, form
  industries/page.tsx         Six industries
  legal/page.tsx              Disclaimer & privacy
  services/…                  Overview + 8 service detail pages
  api/contact/route.ts        Form backend: validation, rate limit, email, HR webhook
  layout.tsx                  Root layout — font, metadata, Nav, Footer
  globals.css                 Design tokens & backgrounds
components/
  ContactForm.tsx             Client form with success/error/validation states
  Nav.tsx                     Light navigation; About is a top-level link
  Footer.tsx                  Slate footer with LinkedIn links
  Hero / PageHeader / …       Section components (all light-themed)
lib/
  contact.ts                  Shared validation + sanitization
  webhook.ts                  HMAC signature verification reference
.env.example                  All configuration, documented
```

## Deployment

Standard Next.js App Router app. Vercel/Netlify/Node hosting all work:

```bash
npm install && npm run build && npm run start
```

Set the environment variables from `.env.example` in your host's
dashboard. On serverless platforms, note the rate-limiter caveat above.

## End-to-end tests

A Playwright + TypeScript suite lives in `e2e/` (66 tests: smoke, navigation,
homepage content, contact-form states with a mocked API, LinkedIn links, and
an axe-core accessibility scan). See `e2e/README.md` for structure and usage.

```bash
npx playwright install chromium   # once
npm run build && npm run test:e2e # local production build
BASE_URL=https://antgrp.com npm run test:e2e  # against the live site
```

## Known limitations

See `TESTING_REPORT.md` for the full test log and limitations.
