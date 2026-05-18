import Link from "next/link";
import Container from "./Container";

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Cloud Modernization", href: "/solutions#cloud" },
      { label: "Data & Analytics", href: "/solutions#data" },
      { label: "Agentic AI", href: "/solutions#agentic" },
      { label: "DevOps & Platform", href: "/solutions#devops" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "IT Staffing", href: "/services#staffing" },
      { label: "Project Delivery", href: "/services#delivery" },
      { label: "App Development", href: "/services#app" },
      { label: "Cloud & DevOps", href: "/services#cloud" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "IT Consulting & Staffing", href: "/industries#it" },
      { label: "Real Estate", href: "/industries#realestate" },
      { label: "Agriculture", href: "/industries#agriculture" },
      { label: "Automotive", href: "/industries#automotive" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Legal", href: "/legal" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-cream text-zinc-700">
      <Container size="wide">
        <div className="grid gap-12 py-16 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-ink"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand-2 to-brand-3 text-white text-sm font-bold shadow-sm">
                A
              </span>
              AntGRP
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-600">
              Engineering teams and outcome-based delivery for organizations
              that move fast across technology, real estate, agriculture, and
              automotive.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-zinc-600">
              <span className="relative flex h-2 w-2">
                <span className="pulse-soft absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              All systems operational
            </div>
          </div>

          {/* Sitemap */}
          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        className="text-sm text-zinc-700 hover:text-brand-2 transition"
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

        <div className="flex flex-col items-start justify-between gap-3 border-t border-line py-6 text-xs text-zinc-500 md:flex-row md:items-center">
          <div>© {year} AntGRP. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/legal" className="hover:text-brand-2 transition">
              Privacy
            </Link>
            <Link href="/legal" className="hover:text-brand-2 transition">
              Disclaimer
            </Link>
            <a className="hover:text-brand-2 transition" href="mailto:hradmin@antgrp.com">
              hradmin@antgrp.com
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
