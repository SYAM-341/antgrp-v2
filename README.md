# AntGRP — Website

A Next.js 16 + Tailwind v4 marketing site for **AntGRP**. Light, premium aesthetic inspired by Tesla, Mercedes-Benz, and Starlink, with deep navy + Tesla-blue accents and a full mega-menu navigation.

## Highlights

- **Light hero** with bold display type (Inter + Instrument Serif italic), AWS partner badges, status chips, and a glowing brand-blue orb visual
- **Full mega-menu nav** — Solutions, Services, Industries, About — bold blue links, hover panels, mobile drawer
- **Pages**: Home, About, Contact, Legal, Solutions, Services, Industries, Careers
- **Sections**: Hero, Stats (100+ specialists), Capabilities grid, Sectors (your original images & copy), Partners marquee, Principles (deep navy), Final CTA card
- **Light footer** with full sitemap and live status indicator
- **Theme tokens** in `app/globals.css` and `tailwind.config.ts` (`--color-brand`, `--color-navy`, etc.)

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
```

> `next/font/google` fetches Inter & Instrument Serif at build time. Your dev machine needs internet access during `next build`.

## File structure

```
app/
  page.tsx               Home (Hero + Stats + Capabilities + Sectors + Partners + Principles + CTA)
  about/page.tsx         Mission, principles, process
  contact/page.tsx       Three direct channels (HR, Finance, Timesheets) + form
  legal/page.tsx         Disclaimer + privacy
  solutions/page.tsx     Cloud / Data / Agentic AI / DevOps
  services/page.tsx      Staffing / Delivery / QA / App Dev / Cloud / Hosting
  industries/page.tsx    IT, Real Estate, Agriculture, Automotive
  careers/page.tsx       Principles + open roles
  layout.tsx             Fonts, metadata, Nav, Footer
  globals.css            Theme tokens, animations
components/
  Nav.tsx                Mega-menu (client) — bold blue links
  Hero.tsx               Light hero
  Stats.tsx              4-up stats strip
  Capabilities.tsx       Service cards
  Sectors.tsx            Industry cards (uses /public/sectors images)
  Partners.tsx           Tech logos marquee
  Principles.tsx         Deep navy 3-up
  CTA.tsx                Premium navy CTA card
  PageHeader.tsx         Reusable light page hero
  Footer.tsx             Light multi-column footer
  Container.tsx          Layout wrapper
  Section.tsx            Generic section
  Badge.tsx              Pill badge
lib/clsx.ts              Class joiner
public/sectors/          Original sector imagery — preserved verbatim
```

## Customizing

- **Brand color**: change `--color-brand` / `--color-brand-2` in `app/globals.css`
- **Stats**: edit `components/Stats.tsx`
- **Open roles**: edit `roles` array in `app/careers/page.tsx`
- **Tech logos**: edit `tools` array in `components/Partners.tsx`
- **Contact channels**: edit `channels` array in `app/contact/page.tsx`
