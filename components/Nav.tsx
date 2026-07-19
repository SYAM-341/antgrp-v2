"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";
import Logo from "./Logo";

type NavLink = { href: string; label: string; desc?: string };
type NavGroup = { title?: string; links: NavLink[] };
type NavItem = { label: string; href?: string; columns?: NavGroup[] };

const NAV: NavItem[] = [
  {
    label: "Services",
    columns: [
      {
        title: "Consulting & Delivery",
        links: [
          {
            href: "/services/solutions-architecture",
            label: "Solutions Architecture",
            desc: "System design and technology strategy.",
          },
          {
            href: "/services/cloud-architecture",
            label: "Cloud Architecture & Migration",
            desc: "AWS, Azure, and GCP.",
          },
          {
            href: "/services/data-engineering",
            label: "Data Engineering & Analytics",
            desc: "Pipelines, warehousing, reporting.",
          },
          {
            href: "/services/ai-ml",
            label: "AI/ML Engineering",
            desc: "Applied machine learning in production.",
          },
        ],
      },
      {
        title: "Staffing & Engineering",
        links: [
          {
            href: "/services/team-augmentation",
            label: "Technology Staffing",
            desc: "Vetted specialists, matched to your stack.",
          },
          {
            href: "/services/full-stack-development",
            label: "Full-Stack Development",
            desc: "Web applications and APIs.",
          },
          {
            href: "/services/devops-infrastructure",
            label: "DevOps & Infrastructure",
            desc: "CI/CD and infrastructure as code.",
          },
          {
            href: "/services/mobile-development",
            label: "Mobile Development",
            desc: "iOS, Android, cross-platform.",
          },
        ],
      },
    ],
  },
  {
    label: "Industries",
    columns: [
      {
        links: [
          {
            href: "/industries#healthcare",
            label: "Healthcare",
            desc: "HIPAA-aware delivery and talent.",
          },
          {
            href: "/industries#finance",
            label: "Finance & Banking",
            desc: "Payments, core banking, risk.",
          },
          {
            href: "/industries#telecom",
            label: "Telecommunications",
            desc: "Billing and network systems.",
          },
        ],
      },
      {
        links: [
          {
            href: "/industries#ecommerce",
            label: "Retail & E-Commerce",
            desc: "High-volume commerce platforms.",
          },
          {
            href: "/industries#insurance",
            label: "Insurance",
            desc: "Policy, claims, and compliance.",
          },
          {
            href: "/industries#technology",
            label: "Technology & SaaS",
            desc: "Product engineering support.",
          },
        ],
      },
    ],
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Leadership",
    href: "/leadership",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

function Caret() {
  return (
    <svg className="ml-1.5 h-3 w-3 opacity-70" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MegaPanel({ columns }: { columns: NavGroup[] }) {
  return (
    <div className="absolute left-1/2 top-full z-50 hidden min-w-[640px] -translate-x-1/2 pt-3 group-hover:block">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-xl shadow-ink/5 ring-1 ring-ink/5">
        <div className="grid grid-cols-2 gap-x-10 gap-y-2">
          {columns.map((col, i) => (
            <div key={i}>
              {col.title ? (
                <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                  {col.title}
                </div>
              ) : null}
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="group/item block rounded-md p-1 -m-1 hover:bg-soft"
                    >
                      <div className="text-sm font-semibold text-ink group-hover/item:text-brand transition">
                        {l.label}
                      </div>
                      {l.desc ? (
                        <div className="mt-0.5 text-xs text-mute">{l.desc}</div>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="AntGRP home">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-[15px]" aria-label="Main">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                {item.href && !item.columns ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center rounded-md px-3 py-2 font-semibold text-ink/80 hover:text-ink transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="inline-flex items-center rounded-md px-3 py-2 font-semibold text-ink/80 hover:text-ink transition"
                      type="button"
                    >
                      {item.label}
                      {item.columns ? <Caret /> : null}
                    </button>
                    {item.columns ? <MegaPanel columns={item.columns} /> : null}
                  </>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-3 transition shadow-sm"
            >
              Get in Touch
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 4h12M2 8h12M2 12h12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {open ? (
          <div className="md:hidden border-t border-line py-4">
            <div className="grid gap-4">
              {NAV.map((item) => (
                <div key={item.label}>
                  {item.href && !item.columns ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-1.5 text-sm font-semibold text-ink"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand">
                        {item.label}
                      </div>
                      <ul className="mt-2 space-y-1.5">
                        {(item.columns ?? [])
                          .flatMap((c) => c.links)
                          .map((l) => (
                            <li key={l.href + l.label}>
                              <Link
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="block py-1 text-sm font-medium text-ink/80 hover:text-ink"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
