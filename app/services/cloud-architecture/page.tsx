import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function CloudArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Cloud Architecture &"
        accent="Migration"
        description="Design and implement scalable cloud solutions on AWS, Azure, and GCP. Multi-cloud strategies for enterprises."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                Enterprise Cloud Solutions
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                Cloud bills grow quietly and outages arrive loudly. We design
                and run migrations with both in mind — landing zones with
                guardrails, workloads sized to what they actually use, and
                documentation the next engineer can follow.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
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
                      "Design workloads across multiple cloud providers where cost or resilience justifies it.",
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
                    className="rounded-xl border border-line bg-cream p-4 text-center transition hover:border-brand/40 hover:bg-soft"
                  >
                    <p className="font-semibold text-ink">{tech}</p>
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
                  "Elastic scalability that grows with application demand",
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
                    <span className="text-lg text-mute">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-3 to-brand p-12 text-center md:p-16">
              <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                Modernize Your Infrastructure
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Let&apos;s design and implement your cloud strategy.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
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
