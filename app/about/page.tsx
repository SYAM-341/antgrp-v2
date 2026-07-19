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
    desc: "One well-matched recommendation is worth more than a long list. We would rather turn down work than staff it badly.",
  },
  {
    title: "Everything in writing",
    desc: "Proposals, updates, and decisions get written down as they happen. You should never need memory or goodwill to know where things stand.",
  },
  {
    title: "Compliance-minded",
    desc: "HIPAA, financial audits, data-handling rules — in the industries we serve, the constraints are part of the job. We treat them that way from day one.",
  },
  {
    title: "Long-term over transactional",
    desc: "We price and staff for the second project, not the first invoice. Repeat clients are the only growth plan we have.",
  },
];

const process = [
  {
    n: "01",
    t: "Discover",
    d: "A focused conversation about the problem, the constraints, and what already exists — enough for both sides to know if this is worth pursuing.",
  },
  {
    n: "02",
    t: "Scope",
    d: "A plain-language proposal: what gets done, by when, by whom, for how much. Signed before anyone starts.",
  },
  {
    n: "03",
    t: "Deliver",
    d: "People placed or delivery underway, with written status updates and one owner you can call when something needs to move.",
  },
  {
    n: "04",
    t: "Support",
    d: "Check-ins after every placement, managed operations where contracted, and honest reviews of whether the work is still earning its keep.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Who we are, and"
        accent="how we work."
        description="AntGRP is an IT consulting and staffing firm. This page explains what we believe about technology work, how a project with us actually runs, and what you can hold us to."
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
                Most technology projects don&apos;t fail on technology. They
                fail because the wrong people are on them — or because the
                advisors recommending a direction have never operated the
                systems they&apos;re advising on. AntGRP was built to close
                that gap: a consulting practice that understands how
                platforms actually behave in production, joined to a
                staffing operation that can find and place the specialists
                who run them.
              </p>
              <p className="mt-4 text-base leading-relaxed text-mute">
                Some clients need one critical hire. Others hand us a
                multi-year program. Either way the shape is identical: start
                from the business problem, put the scope in writing, and
                name one person who answers for the outcome.
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
              How a project runs.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mute">
              The same four stages, whether we place one person or run an
              entire program.
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

      <CTA />
    </>
  );
}
