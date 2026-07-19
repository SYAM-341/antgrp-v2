import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function TeamAugmentationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Technology Staffing &"
        accent="Team Augmentation"
        description="The right people, matched to your stack, your domain, and your team. Contract, contract-to-hire, and direct placement across every IT discipline."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                Find the Right Talent, Fast
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                Great teams are built on fit, not just résumés. We vet every
                consultant for technical depth, domain experience, and how they
                work with a team — then match them to your technology stack and
                business context. Whether you need one senior architect, a
                platform squad, or leadership for a critical initiative, we
                deliver people who contribute from week one.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                What We Offer
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Dedicated Development Teams",
                    description:
                      "Full-time dedicated teams working exclusively on your projects with your goals.",
                  },
                  {
                    title: "Skilled Individual Contributors",
                    description:
                      "Senior developers, architects, and engineers for specific expertise needs.",
                  },
                  {
                    title: "Technical Leadership",
                    description:
                      "Engineering managers, tech leads, and architects to guide your initiatives.",
                  },
                  {
                    title: "Flexible Engagement Models",
                    description:
                      "Short-term, long-term, or project-based augmentation tailored to your needs.",
                  },
                  {
                    title: "Rapid Onboarding",
                    description:
                      "Quick ramp-up with knowledge transfer and integration into your team.",
                  },
                  {
                    title: "Quality Assurance",
                    description:
                      "QA engineers and testing specialists to ensure product quality.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
                  >
                    <h4 className="text-xl font-semibold text-ink mb-3">
                      {item.title}
                    </h4>
                    <p className="text-mute leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                Engineering Specialties
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Frontend Engineers",
                  "Backend Engineers",
                  "Full-Stack Engineers",
                  "Cloud Architects",
                  "DevOps Engineers",
                  "Data Engineers",
                  "Mobile Developers",
                  "QA Engineers",
                  "Tech Leads",
                ].map((specialty) => (
                  <div
                    key={specialty}
                    className="rounded-xl border border-line bg-cream p-4 text-center transition hover:border-brand/40 hover:bg-soft"
                  >
                    <p className="font-semibold text-ink">{specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                Key Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  "Scale your team without long-term hiring commitments",
                  "Access to specialized expertise on demand",
                  "Faster project execution with experienced engineers",
                  "Cost-effective compared to permanent hiring",
                  "Flexible engagement models match your needs",
                  "Placements matched to your existing culture and processes",
                ].map((benefit) => (
                  <li key={benefit} className="flex gap-4">
                    <span className="text-brand font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-lg text-mute">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-3 to-brand p-12 text-center md:p-16">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Scale Your Engineering Team
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Let&apos;s discuss how we can augment your team with skilled
                engineers.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
              >
                Request Team Augmentation
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
