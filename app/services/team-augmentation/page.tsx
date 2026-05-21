import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function TeamAugmentationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Team Augmentation"
        accent="Services"
        description="Flexible engineering teams for projects of any scale. Dedicated developers, architects, and technical leads."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Augment Your Engineering Capacity
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                Scale your team quickly with skilled engineers. Whether you need
                frontend developers, cloud architects, or full-stack teams, we
                have the talent you need.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                    className="border border-slate-200 rounded-lg p-6 hover:border-brand-2 transition"
                  >
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                    className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200"
                  >
                    <p className="font-semibold text-slate-900">{specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Key Benefits
              </h3>
              <ul className="space-y-4">
                {[
                  "Scale your team without long-term hiring commitments",
                  "Access to specialized expertise on demand",
                  "Faster project execution with experienced engineers",
                  "Cost-effective compared to permanent hiring",
                  "Flexible engagement models match your needs",
                  "Seamless integration with your culture and processes",
                ].map((benefit) => (
                  <li key={benefit} className="flex gap-4">
                    <span className="text-brand font-bold flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-lg text-slate-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Scale Your Engineering Team
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can augment your team with skilled
                engineers.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
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
