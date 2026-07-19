import Container from "@/components/Container";

/** Capability grid — icon, title, one concrete sentence each. */
const capabilities = [
  {
    title: "Cloud & Infrastructure",
    desc: "Migrations, landing zones, and the day-two operations that keep them stable.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <path d="M17.5 19a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.42A3.5 3.5 0 0 0 6.5 19h11z" />
      </svg>
    ),
  },
  {
    title: "Data & Analytics",
    desc: "Pipelines and warehouses that finance and operations both agree to trust.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
        <path d="M5 5.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
        <path d="M5 11.5v6c0 1.55 3.13 2.8 7 2.8s7-1.25 7-2.8v-6" />
      </svg>
    ),
  },
  {
    title: "AI & Machine Learning",
    desc: "Models that make it past the demo — deployed, monitored, and retrained.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.5 5.5 8 8M18.5 5.5 16 8M5.5 18.5 8 16M18.5 18.5 16 16" />
      </svg>
    ),
  },
  {
    title: "Enterprise Software",
    desc: "Applications and integrations built to outlast the team that shipped them.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18M8 21h8M12 18v3" />
      </svg>
    ),
  },
];

export default function Partners() {
  return (
    <section className="border-y border-line bg-white py-16 md:py-20">
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl text-ink md:text-3xl">
            Four practices. One standard of work.
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-line bg-cream p-6 transition hover:border-brand/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                {c.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{c.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
