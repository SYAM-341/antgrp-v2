import Link from "next/link";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

const chips = [
  "IT Consulting & Staffing",
  "Real Estate",
  "Agriculture",
  "Automotive",
];

const pillars = [
  {
    title: "Structured Delivery",
    desc: "Service delivery models aligned to sector-specific requirements, timelines, and quality controls.",
  },
  {
    title: "Governance & Compliance",
    desc: "Operational discipline with accountability, documentation, and adherence to applicable standards.",
  },
  {
    title: "Scalable Operations",
    desc: "Repeatable processes and systems designed to support both current engagements and future growth.",
  },
];

const process = [
  {
    n: "01",
    t: "Discover",
    d: "Short, focused engagement to understand goals, constraints, and the shape of the right team.",
  },
  {
    n: "02",
    t: "Scope",
    d: "Plain-language proposal — outcomes, milestones, roles, and a transparent commercial model.",
  },
  {
    n: "03",
    t: "Build",
    d: "Weekly cadence: working software, written updates, and clear ownership across every workstream.",
  },
  {
    n: "04",
    t: "Operate",
    d: "Optional managed run with monitoring, incident handling, and quarterly business reviews.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A delivery partner"
        accent="built for what's next."
        description="AntGRP is an American-owned professional services organization, founded by a first responder, delivering enterprise-grade solutions across diverse industry sectors with a focus on reliability, compliance, and scale."
      />

      <section className="bg-white py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Profile
              </div>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                How we operate.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-zinc-700">
                AntGRP operates with a structured yet adaptable business model,
                enabling support for a broad range of technical, operational,
                and advisory engagements. We prioritize clear communication,
                consistent execution, and responsible business practices across
                all areas of operation.
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-700">
                Our approach is designed to align with applicable regulatory
                requirements and industry expectations, while remaining flexible
                to meet the needs of clients and partners across diverse
                markets.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line bg-soft px-3 py-1 text-xs font-semibold text-zinc-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-line bg-cream p-7">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  Core principles
                </div>
                <ul className="mt-4 space-y-3 text-sm text-zinc-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-2" />
                    Documentation and clarity in execution
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-2" />
                    Compliance-minded operations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-2" />
                    Scalable processes and governance
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Operating Model
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Enterprise-focused approach.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-line bg-white p-7 transition hover:shadow-md hover:border-brand-2/40"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  Operating pillar
                </div>
                <div className="mt-3 text-lg font-semibold tracking-tight text-ink">
                  {p.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="process" className="scroll-mt-24 bg-navy py-20 text-white md:py-24">
        <Container size="wide">
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-2">
                Our Process
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-4xl">
                Four steps.{" "}
                <span className="font-serif-italic text-zinc-300">
                  No surprises.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-zinc-400 md:col-span-7">
              From the first conversation through ongoing operations, our process is
              designed to keep stakeholders aligned and outcomes visible.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark md:grid-cols-4">
            {process.map((p) => (
              <div key={p.t} className="flex flex-col bg-navy-2 p-7">
                <div className="text-sm font-medium text-brand-2">{p.n}</div>
                <div className="mt-3 text-xl font-semibold">{p.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-zinc-200 transition"
            >
              Start a conversation
              <span aria-hidden className="ml-2">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
