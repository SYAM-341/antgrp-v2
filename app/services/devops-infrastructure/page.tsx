import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function DevOpsInfrastructurePage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="DevOps & Infrastructure"
        accent="Services"
        description="CI/CD pipelines, infrastructure-as-code, containerization (Docker, Kubernetes), and automated deployment systems."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Enterprise DevOps Solutions
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We build robust DevOps practices, automation pipelines, and
                infrastructure systems that enable faster, safer deployments at
                scale.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                    <span className="text-lg text-slate-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 border border-blue-200 p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Modernize Your DevOps Practice
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's build the infrastructure and automation your team needs.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
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
