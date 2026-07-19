import Link from "next/link";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

export const metadata = {
  title: "About — AntGRP",
  description:
    "What AntGRP does, how engagements are run, and the standards the firm holds itself to across IT consulting and technology staffing.",
};

const capabilities = [
  { label: "IT Consulting", detail: "Architecture, strategy, and delivery" },
  { label: "Technology Staffing", detail: "Contract, contract-to-hire, direct placement" },
  { label: "Cloud & Data", detail: "AWS, Azure, GCP, warehousing, pipelines" },
  { label: "AI & Software Engineering", detail: "Applied ML, web, mobile, DevOps" },
];

const values = [
  {
    title: "Fit over volume",
    desc: "One well-matched recommendation is worth more than a long list. We would rather decline an engagement than staff it badly.",
  },
  {
    title: "Everything in writing",
    desc: "Proposals, status updates, and decisions are documented. Clients should never have to rely on memory or goodwill to know where things stand.",
  },
  {
    title: "Compliance-minded",
    desc: "We work in regulated industries and treat their constraints — HIPAA, financial audit requirements, data-handling rules — as part of the job, not an obstacle to it.",
  },
  {
    title: "Long-term over transactional",
    desc: "Pricing, staffing, and communication are structured for repeat relationships, not one-off wins.",
  },
];

const process = [
  {
    n: "01",
    t: "Discover",
    d: "A focused conversation about your goals, constraints, and technology landscape — enough to know whether we can help before anyone commits.",
  },
  {
    n: "02",
    t: "Scope",
    d: "A plain-language proposal: outcomes, milestones, roles, and pricing, agreed in writing before work begins.",
  },
  {
    n: "03",
    t: "Deliver",
    d: "Placements made or delivery underway, with written status updates and a named owner responsible for the engagement.",
  },
  {
    n: "04",
    t: "Support",
    d: "Check-ins after placement, managed operations where contracted, and periodic reviews to confirm the engagement is still delivering value.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="What we do, and"
        accent="how we do it."
        description="AntGRP is an IT consulting and technology staffing firm. This page explains the firm's purpose, the way engagements are run, and the standards we hold ourselves to."
      />

      {/* Purpose */}
      <section className="bg-white py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Purpose
              </div>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                Matching people to problems.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-mute">
                Most technology initiatives fail for people reasons: the wrong
                skills on the team, unclear ownership, or advisors who don&apos;t
                understand the systems they&apos;re advising on. AntGRP exists to
                close that gap. We combine a consulting practice that
                understands enterprise systems with a staffing operation that
                can identify, vet, and place the specialists those systems
                need.
              </p>
              <p className="mt-4 text-base leading-relaxed text-mute">
                Engagements range from a single critical hire to multi-year
                delivery programs. In every case the approach is the same:
                start from the business problem, agree the scope in writing,
                and put a named owner on the outcome.
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="rounded-2xl border border-line bg-cream p-7">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  Capabilities
                </div>
                <ul className="mt-4 space-y-4">
                  {capabilities.map((c) => (
                    <li key={c.label}>
                      <div className="text-sm font-semibold text-ink">
                        {c.label}
                      </div>
                      <div className="text-xs text-mute">{c.detail}</div>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-3"
                >
                  All services <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-line bg-cream py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Values
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              The standards we work to.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-line bg-white p-7 transition hover:border-brand/40"
              >
                <div className="text-lg font-semibold text-ink">{v.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Approach / process */}
      <section
        id="process"
        className="scroll-mt-24 border-t border-line bg-white py-20 md:py-24"
      >
        <Container size="wide">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Approach
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              How an engagement runs.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mute">
              The same four stages apply whether the engagement is one
              placement or an entire program.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {process.map((p) => (
              <div key={p.t} className="flex flex-col bg-cream p-7">
                <div className="text-sm font-bold text-brand">{p.n}</div>
                <div className="mt-3 text-xl font-semibold text-ink">
                  {p.t}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership teaser */}
      <section className="border-t border-line bg-cream py-16 md:py-20">
        <Container size="wide">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Leadership
              </div>
              <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">
                Leadership stays close to delivery.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mute">
                AntGRP&apos;s leadership reviews proposals before they go out and
                remains a reachable point of escalation for the life of every
                engagement. Read how that works in practice.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/leadership"
                className="inline-flex items-center justify-center rounded-full border border-line-dark bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                Meet our leadership
                <span aria-hidden className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
