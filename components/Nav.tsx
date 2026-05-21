"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";

type NavLink = { href: string; label: string; desc?: string };
type NavGroup = { title?: string; links: NavLink[] };
type NavItem = { label: string; href?: string; columns?: NavGroup[] };

const NAV: NavItem[] = [
  {
    label: "Solutions",
    columns: [
      {
        title: "Technology",
        links: [
          {
            href: "/solutions#cloud",
            label: "Cloud Modernization",
            desc: "Migration, FinOps, scale.",
          },
          {
            href: "/solutions#data",
            label: "Data & Analytics",
            desc: "Pipelines that drive decisions.",
          },
          {
            href: "/solutions#agentic",
            label: "Agentic AI",
            desc: "Production-grade AI agents.",
          },
          {
            href: "/solutions#devops",
            label: "DevOps & Platform",
            desc: "Reliable delivery at speed.",
          },
        ],
      },
      {
        title: "Industry",
        links: [
          {
            href: "/industries#it",
            label: "IT Consulting & Staffing",
            desc: "Right talent, right time.",
          },
          {
            href: "/industries#realestate",
            label: "Real Estate",
            desc: "Acquisition & advisory.",
          },
          {
            href: "/industries#agriculture",
            label: "Agriculture",
            desc: "Sustainable operations.",
          },
          {
            href: "/industries#automotive",
            label: "Automotive",
            desc: "Future-ready ventures.",
          },
        ],
      },
    ],
  },
  {
    label: "Services",
    columns: [
      {
        links: [
          {
            href: "/services#staffing",
            label: "IT Staffing",
            desc: "Vetted engineers, on demand.",
          },
          {
            href: "/services#delivery",
            label: "Project Delivery",
            desc: "Outcome-based engagements.",
          },
          {
            href: "/services#qa",
            label: "QA as a Service",
            desc: "Defects found before users do.",
          },
        ],
      },
      {
        links: [
          {
            href: "/services#app",
            label: "App Development",
            desc: "Idea to launch, end to end.",
          },
          {
            href: "/services#cloud",
            label: "Cloud & DevOps",
            desc: "Infrastructure that scales.",
          },
          {
            href: "/services#hosting",
            label: "Managed Hosting",
            desc: "Monitored, always on.",
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
            href: "/industries#it",
            label: "IT Consulting & Staffing",
            desc: "Engineering talent network.",
          },
          {
            href: "/industries#realestate",
            label: "Real Estate",
            desc: "Acquisition, management, advisory.",
          },
        ],
      },
      {
        links: [
          {
            href: "/industries#agriculture",
            label: "Agriculture",
            desc: "Sustainable, compliant growth.",
          },
          {
            href: "/industries#automotive",
            label: "Automotive",
            desc: "Ventures and partnerships.",
          },
        ],
      },
    ],
  },
  {
    label: "About",
    columns: [
      {
        links: [
          { href: "/about", label: "Company", desc: "Who we are." },
          {
            href: "/about#process",
            label: "Our Process",
            desc: "How we deliver.",
          },
        ],
      },
      {
        links: [
          { href: "/legal", label: "Legal", desc: "Disclaimers & policies." },
        ],
      },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
  },
];

function Caret() {
  return (
    <svg className="ml-1.5 h-3 w-3 opacity-80" viewBox="0 0 12 12" fill="none">
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
      <div className="rounded-2xl border border-line bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5">
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
                      <div className="text-sm font-semibold text-ink group-hover/item:text-brand-2 transition">
                        {l.label}
                      </div>
                      {l.desc ? (
                        <div className="mt-0.5 text-xs text-zinc-500">
                          {l.desc}
                        </div>
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
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[17px] font-bold tracking-tight text-ink"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand-2 to-brand-3 text-white text-[12px] font-bold shadow-sm">
              A
            </span>
            AntGRP
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-[15px]">
            {NAV.map((item) => (
              <div key={item.label} className="group relative">
                {item.href && !item.columns ? (
                  // Direct link (like Careers)
                  <Link
                    href={item.href}
                    className="inline-flex items-center rounded-md px-3.5 py-2 font-bold text-ink hover:text-brand-2 transition"
                  >
                    {item.label}
                  </Link>
                ) : (
                  // Dropdown menu
                  <>
                    <button
                      className="inline-flex items-center rounded-md px-3.5 py-2 font-bold text-ink hover:text-brand-2 transition"
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
              Contact Us
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-line"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          <div className="md:hidden border-t border-line py-3">
            <div className="grid gap-3">
              {NAV.map((item) => (
                <div key={item.label}>
                  {item.href && !item.columns ? (
                    // Direct link
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-sm font-semibold text-ink"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    // Dropdown menu
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
                                className="block py-1 text-sm font-semibold text-ink"
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
                Contact Us
              </Link>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
