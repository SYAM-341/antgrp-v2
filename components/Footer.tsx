import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

// Public company page derived from the provided LinkedIn admin URL
// (admin dashboard URLs are only visible to page admins).
const LINKEDIN_COMPANY = "https://www.linkedin.com/company/124884115/";
const LINKEDIN_FOUNDER = "https://www.linkedin.com/in/antgrpmary/";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Consulting",
    links: [
      { label: "Solutions Architecture", href: "/services/solutions-architecture" },
      { label: "Cloud Architecture", href: "/services/cloud-architecture" },
      { label: "Data Engineering", href: "/services/data-engineering" },
      { label: "AI/ML Engineering", href: "/services/ai-ml" },
    ],
  },
  {
    title: "Staffing & Delivery",
    links: [
      { label: "Technology Staffing", href: "/services/team-augmentation" },
      { label: "Full-Stack Development", href: "/services/full-stack-development" },
      { label: "DevOps & Infrastructure", href: "/services/devops-infrastructure" },
      { label: "Mobile Development", href: "/services/mobile-development" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Healthcare", href: "/industries#healthcare" },
      { label: "Finance & Banking", href: "/industries#finance" },
      { label: "Retail & E-Commerce", href: "/industries#ecommerce" },
      { label: "Technology & SaaS", href: "/industries#technology" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Legal", href: "/legal" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink text-slate-300">
      <Container size="wide">
        <div className="grid gap-12 py-16 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Link href="/" aria-label="AntGRP home">
              <Logo dark />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              IT consulting and technology staffing across cloud, data, AI,
              and enterprise software.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="pulse-soft absolute inline-flex h-full w-full rounded-full bg-brand-2 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-2" />
              </span>
              Accepting new engagements
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={LINKEDIN_COMPANY}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AntGRP company page on LinkedIn (opens in a new tab)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-brand-2 hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={LINKEDIN_COMPANY}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 transition hover:text-white"
              >
                AntGRP on LinkedIn
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-2">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        className="text-sm text-slate-400 hover:text-white transition"
                        href={l.href}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-400 md:flex-row md:items-center">
          <div>© {year} AntGRP. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/legal" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/legal" className="hover:text-white transition">
              Disclaimer
            </Link>
            <a
              href={LINKEDIN_FOUNDER}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Founder on LinkedIn
            </a>
            <a
              className="hover:text-white transition"
              href="mailto:hradmin@antgrp.com"
            >
              hradmin@antgrp.com
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
