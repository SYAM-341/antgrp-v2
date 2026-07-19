import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function SolutionsArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Solutions"
        accent="Architecture"
        description="Enterprise solution design, system integration, and technical strategy consulting for complex business challenges."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                Enterprise Solutions Design
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                Architecture is a set of decisions you&apos;ll live with for
                years. We help you make them deliberately — mapping the
                systems you have, the constraints you can&apos;t move, and
                the shortest defensible path to what you need.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Solution Architecture Design",
                    description:
                      "Design comprehensive solutions that address complex business challenges with technology.",
                  },
                  {
                    title: "System Integration",
                    description:
                      "Integrate disparate systems and applications for unified business processes.",
                  },
                  {
                    title: "Technology Strategy",
                    description:
                      "Define technology roadmaps aligned with business goals and competitive advantages.",
                  },
                  {
                    title: "Enterprise Consulting",
                    description:
                      "Advisory services on digital transformation, modernization, and optimization.",
                  },
                  {
                    title: "Risk & Security Assessment",
                    description:
                      "Identify architectural risks, security vulnerabilities, and mitigation strategies.",
                  },
                  {
                    title: "Scalability & Performance",
                    description:
                      "Design for scale, performance, and reliability as business grows.",
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
                Architecture Domains
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Enterprise Architecture",
                  "Microservices",
                  "Cloud-Native",
                  "API Architecture",
                  "Data Architecture",
                  "Security Architecture",
                ].map((domain) => (
                  <div
                    key={domain}
                    className="rounded-xl border border-line bg-cream p-4 text-center transition hover:border-brand/40 hover:bg-soft"
                  >
                    <p className="font-semibold text-ink">{domain}</p>
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
                  "Align technology with business objectives",
                  "Reduce risk and technical debt",
                  "Improve system scalability and performance",
                  "Faster time to value for initiatives",
                  "Better ROI on technology investments",
                  "Strategic competitive advantage",
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
                Design Your Solution
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Bring us a system problem and we&apos;ll scope an architecture review.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
              >
                Schedule Architecture Review
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
