import Link from "next/link";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Leadership — AntGRP",
  description:
    "The operating principles and governance approach behind AntGRP's IT consulting and technology staffing engagements.",
};

const commitments = [
  {
    title: "Direct accountability",
    desc: "Every engagement has a named owner on our side, not a rotating point of contact. Escalation paths are defined before an engagement starts, not after something goes wrong.",
  },
  {
    title: "Decisions made close to the work",
    desc: "Leadership stays involved in how engagements are scoped and staffed, so commitments made in a proposal are commitments the delivery team can actually keep.",
  },
  {
    title: "Measured, sustainable growth",
    desc: "We take on the engagements we can resource properly. Saying no to a poor fit is treated as a better outcome than a placement or project that fails six months in.",
  },
  {
    title: "Transparency as a default",
    desc: "Clear commercial terms, honest status reporting, and no incentive structures that reward volume over client outcomes.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Operating principles,"
        accent="not a mission statement."
        description="AntGRP's leadership team is directly involved in how engagements are scoped, staffed, and managed. The commitments below describe how that involvement shows up in practice."
      />

      <section className="bg-white py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-3xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Approach
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Leadership that stays close to delivery.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-mute">
              Technology staffing and consulting engagements fail most often
              for operational reasons — unclear ownership, misaligned
              expectations, or leadership that is disconnected from the
              day-to-day work. AntGRP is structured to avoid that failure
              mode: leadership is involved in engagement scoping and
              remains a reachable point of escalation for the duration of
              the relationship, not just at the point of sale.
            </p>
            <p className="mt-4 text-base leading-relaxed text-mute">
              That approach informs the governance practices described on
              our{" "}
              <Link href="/about" className="font-semibold text-ink underline underline-offset-4 decoration-brand-2/40 hover:decoration-brand-2">
                About
              </Link>{" "}
              page, and the commitments below.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Leadership commitments
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              What clients can expect.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {commitments.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-line bg-white p-7 transition hover:border-brand/40"
              >
                <div className="text-lg font-semibold text-ink">
                  {c.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20 md:py-24">
        <Container size="wide">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
              Governance
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Accountable to every engagement.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mute">
              Leadership review is built into how AntGRP operates: proposals
              are reviewed before they go out, placements and delivery
              milestones are tracked centrally, and client feedback —
              positive or critical — reaches leadership directly rather
              than being filtered through account management alone. This
              is what allows a growing firm to keep the accountability of a
              much smaller one.
            </p>
            <a
              href="https://www.linkedin.com/in/antgrpmary/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-dark bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
              Connect with our founder on LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
