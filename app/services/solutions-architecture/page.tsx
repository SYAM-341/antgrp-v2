import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function SolutionsArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Solutions Architecture"
        accent="Services"
        description="Enterprise solution design, system integration, and technical strategy consulting for complex business challenges."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Enterprise Solutions Design
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We design comprehensive solutions that align technology with
                business objectives. Our architects bring deep expertise across
                industries and domains.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                    className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200"
                  >
                    <p className="font-semibold text-slate-900">{domain}</p>
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
                    <span className="text-lg text-slate-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Design Your Solution
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's create an architecture that powers your business strategy.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
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
