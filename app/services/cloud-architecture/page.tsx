import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function CloudArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Cloud Architecture & Migration"
        accent="Services"
        description="Design and implement scalable cloud solutions on AWS, Azure, and GCP. Multi-cloud strategies for enterprises."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Enterprise Cloud Solutions
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We design and implement cloud architectures that are scalable,
                secure, and cost-effective. From migrations to greenfield
                architectures, we deliver cloud excellence.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Cloud Architecture Design",
                    description:
                      "Design scalable, secure, and cost-effective architectures on AWS, Azure, or GCP aligned with your business needs.",
                  },
                  {
                    title: "Cloud Migration",
                    description:
                      "Plan and execute migrations from on-premises to cloud with minimal downtime and risk.",
                  },
                  {
                    title: "Multi-Cloud Strategy",
                    description:
                      "Implement strategies to leverage multiple cloud providers for optimal cost and performance.",
                  },
                  {
                    title: "Infrastructure as Code",
                    description:
                      "Terraform and CloudFormation implementations for reproducible, version-controlled infrastructure.",
                  },
                  {
                    title: "Security & Compliance",
                    description:
                      "Implement security best practices, compliance frameworks, and identity management.",
                  },
                  {
                    title: "Cost Optimization",
                    description:
                      "Optimize cloud spending through resource right-sizing, reserved instances, and spot pricing strategies.",
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
                Cloud Platforms & Services
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "AWS",
                  "Microsoft Azure",
                  "Google Cloud",
                  "Kubernetes",
                  "Terraform",
                  "CloudFormation",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200"
                  >
                    <p className="font-semibold text-slate-900">{tech}</p>
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
                  "Unlimited scalability for growing applications",
                  "High availability and disaster recovery",
                  "Reduced infrastructure management overhead",
                  "Cost optimization through cloud pricing models",
                  "Global presence with edge locations",
                  "Enterprise-grade security and compliance",
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
                Modernize Your Infrastructure
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's design and implement your cloud strategy.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
              >
                Discuss Cloud Strategy
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
