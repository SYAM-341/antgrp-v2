import Link from "next/link";
import Container from "./Container";

function StatusChip({ children, dot = "green" }: { children: React.ReactNode; dot?: "green" | "amber" }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-700 shadow-sm backdrop-blur">
      <span className="relative flex h-2 w-2">
        <span
          className={`pulse-soft absolute inline-flex h-full w-full rounded-full ${
            dot === "green" ? "bg-emerald-500" : "bg-amber-500"
          } opacity-75`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            dot === "green" ? "bg-emerald-500" : "bg-amber-500"
          }`}
        />
      </span>
      {children}
    </div>
  );
}

function PartnerBadge({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex w-[112px] flex-col items-center justify-center rounded-[10px] border border-line bg-white px-2 py-2 text-center shadow-sm">
      <div className="text-[11px] font-bold tracking-tight text-ink">{label}</div>
      <div className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-amber-600">PARTNER</div>
      <div className="mt-0.5 text-[8px] leading-tight text-zinc-600">{sub}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-soft via-white to-white text-ink">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dots opacity-70" />
        <div className="absolute inset-0 bg-light-glow" />
        <div className="absolute -right-32 top-1/3 h-[480px] w-[480px] rounded-full bg-brand-2/10 blur-[140px]" />
        <div className="absolute -left-32 -bottom-24 h-[420px] w-[420px] rounded-full bg-brand-3/8 blur-[140px]" />
      </div>

      {/* Status chips top corners */}
      <Container size="wide" className="relative">
        <div className="flex items-start justify-between pt-6">
          <StatusChip>Systems Operational</StatusChip>
          <StatusChip>Actively Hiring</StatusChip>
        </div>
      </Container>

      <Container size="wide" className="relative">
        <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:py-24 lg:py-28">
          {/* Left: copy */}
          <div className="md:col-span-7">
            {/* Partner badges row */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <PartnerBadge label="aws" sub="Advanced Tier Services" />
              <PartnerBadge label="aws" sub="DevOps Services" />
              <PartnerBadge label="aws" sub="SMB Services" />
              <PartnerBadge label="aws" sub="AI Services" />
            </div>

            <h1 className="font-display text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[88px] text-ink">
              Engineering Teams.
              <br />
              <span className="font-serif-italic text-brand-2">Delivered.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
              AntGRP builds high-performing engineering squads and delivers
              cloud, data, and platform programs for organizations that move fast.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-3 transition shadow-sm"
              >
                Start a project
                <span aria-hidden className="ml-2">→</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-ink hover:bg-soft transition"
              >
                Explore services
              </Link>
            </div>
          </div>

          {/* Right: visual */}
          <div className="md:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* Soft glow background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-2/15 via-brand-3/10 to-transparent blur-3xl" />
              <div className="absolute inset-6 rounded-full border border-line" />
              <div className="absolute inset-16 rounded-full border border-line/70" />
              <div className="absolute inset-28 rounded-full border border-line/50" />

              {/* Central orb */}
              <div className="float-slow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative h-44 w-44 rounded-full bg-gradient-to-br from-white via-soft to-zinc-200 shadow-[0_18px_60px_rgba(37,99,235,0.25)] ring-1 ring-line">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-2/20 via-transparent to-transparent" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="font-display text-5xl text-ink">A</div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700">
                      AntGRP
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbit dots */}
              <div className="absolute left-1/2 top-6 -translate-x-1/2 h-2 w-2 rounded-full bg-brand-2 shadow-[0_0_12px_rgba(37,99,235,0.8)]" />
              <div className="absolute right-8 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-brand shadow-[0_0_12px_rgba(29,78,216,0.8)]" />
              <div className="absolute left-1/2 bottom-6 -translate-x-1/2 h-2 w-2 rounded-full bg-zinc-400" />
              <div className="absolute left-8 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-zinc-300" />
            </div>
          </div>
        </div>
      </Container>

      {/* Featured engagement card */}
      <Container size="wide" className="relative pb-12 md:pb-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line shadow-sm md:grid-cols-5">
          {[
            { eyebrow: "IT Staffing", title: "Engineering Network" },
            { eyebrow: "Type", title: "Project Delivery" },
            { eyebrow: "Stack", title: "Cloud-Native" },
            { eyebrow: "Outcome", title: "Faster Time to Value", accent: true },
          ].map((c) => (
            <div key={c.title} className="bg-white px-5 py-5 md:px-6 md:py-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-mute">
                {c.eyebrow}
              </div>
              <div
                className={`mt-2 text-base font-semibold ${
                  c.accent ? "text-brand-2" : "text-ink"
                }`}
              >
                {c.title}
              </div>
            </div>
          ))}
          <Link
            href="/services"
            className="col-span-2 flex items-center justify-center gap-2 bg-ink px-5 py-5 text-sm font-semibold text-white hover:bg-ink-3 transition md:col-span-1"
          >
            View Capabilities
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
