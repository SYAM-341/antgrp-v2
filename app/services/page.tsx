import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Link from "next/link";

export const metadata = {
  title: "Services — AntGRP",
  description:
    "IT consulting, technology staffing, and delivery services across cloud, data, AI, software engineering, and enterprise platforms.",
};

const services = [
  {
    title: "Technology Staffing",
    description:
      "Vetted consultants, engineers, and technical leads matched to your stack and culture. Contract, contract-to-hire, and direct placement across every IT discipline.",
    link: "/services/team-augmentation",
  },
  {
    title: "Solutions Architecture",
    description:
      "Enterprise solution design, system integration, and technology strategy consulting for complex business challenges.",
    link: "/services/solutions-architecture",
  },
  {
    title: "Cloud Architecture & Migration",
    description:
      "Design and implement scalable cloud solutions on AWS, Azure, and GCP. Migration, modernization, and multi-cloud strategy for enterprises.",
    link: "/services/cloud-architecture",
  },
  {
    title: "AI/ML Engineering",
    description:
      "Machine learning models, large language models, computer vision, and AI-powered applications — from pilot to production.",
    link: "/services/ai-ml",
  },
  {
    title: "Data Engineering & Analytics",
    description:
      "ETL pipelines, data warehousing, real-time analytics, and big data platforms for data-driven decision making.",
    link: "/services/data-engineering",
  },
  {
    title: "Full-Stack Development",
    description:
      "End-to-end application development with modern web technologies, APIs, and cloud-native architectures.",
    link: "/services/full-stack-development",
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "CI/CD pipelines, infrastructure-as-code, containerization, and automated deployment systems that keep delivery reliable.",
    link: "/services/devops-infrastructure",
  },
  {
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps for iOS and Android, built for performance, security, and user experience.",
    link: "/services/mobile-development",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we"
        accent="actually do."
        description="Eight services across cloud, data, AI, and software delivery. Different work, same discipline: a written scope, people who have done it before, and one name on the outcome."
      />

      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.link}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
              >
                <h3 className="mb-3 text-lg font-bold text-ink transition group-hover:text-brand">
                  {service.title}
                </h3>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-mute">
                  {service.description}
                </p>
                <span className="text-sm font-semibold text-brand">
                  Learn more <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
