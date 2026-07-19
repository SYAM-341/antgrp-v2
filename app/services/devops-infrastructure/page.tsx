import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function DevOpsInfrastructurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="DevOps &"
        accent="Infrastructure"
        description="CI/CD pipelines, infrastructure-as-code, containerization (Docker, Kubernetes), and automated deployment systems."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                Enterprise DevOps Solutions
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                Deployment should be the most boring part of your week. We build
                the pipelines, infrastructure-as-code, and monitoring that
                make releases routine — and rollbacks a non-event.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "CI/CD Pipeline Design",
                    description:
                      "Design and implement automated pipelines for code integration, testing, and deployment.",
                  },
                  {
                    title: "Infrastructure as Code",
                    description:
                      "Terraform, CloudFormation, Ansible for reproducible, version-controlled infrastructure.",
                  },
                  {
                    title: "Containerization",
                    description:
                      "Docker image creation, optimization, and registry management for efficient deployments.",
                  },
                  {
                    title: "Kubernetes Orchestration",
                    description:
                      "Kubernetes cluster setup, management, and optimization for container orchestration at scale.",
                  },
                  {
                    title: "Monitoring & Observability",
                    description:
                      "Prometheus, ELK, Datadog integration for visibility into system health and performance.",
                  },
                  {
                    title: "Disaster Recovery",
                    description:
                      "Backup strategies, failover systems, and recovery procedures for business continuity.",
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
                Tools & Technologies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "Docker",
                  "Kubernetes",
                  "Jenkins",
                  "GitLab CI",
                  "Terraform",
                  "Ansible",
                  "Prometheus",
                  "ELK Stack",
                  "AWS",
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
                  "Faster, safer, more frequent deployments",
                  "Reduced manual errors and downtime",
                  "Reproducible infrastructure and environments",
                  "Visibility into system health and performance",
                  "Automated scaling and resource optimization",
                  "Disaster recovery and business continuity",
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
                Modernize Your DevOps Practice
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Let&apos;s build the infrastructure and automation your team needs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
              >
                Start DevOps Journey
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
