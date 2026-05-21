import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const services = [
  {
    title: "AI/ML Engineering",
    description:
      "Machine learning models, large language models, computer vision solutions, and AI-powered applications for modern enterprises.",
    icon: "🤖",
    link: "/services/ai-ml",
  },
  {
    title: "Full-Stack Development",
    description:
      "End-to-end application development with modern web technologies, APIs, and cloud-native architectures for scalable solutions.",
    icon: "💻",
    link: "/services/full-stack-development",
  },
  {
    title: "Cloud Architecture & Migration",
    description:
      "Design and implement scalable cloud solutions on AWS, Azure, and GCP. Multi-cloud strategies for enterprises.",
    icon: "☁️",
    link: "/services/cloud-architecture",
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "CI/CD pipelines, infrastructure-as-code, containerization (Docker, Kubernetes), and automated deployment systems.",
    icon: "🔧",
    link: "/services/devops-infrastructure",
  },
  {
    title: "Data Engineering & Analytics",
    description:
      "ETL pipelines, data warehousing, real-time analytics, and big data solutions for data-driven decision making.",
    icon: "📊",
    link: "/services/data-engineering",
  },
  {
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps (iOS, Android, React Native) built for performance and user experience.",
    icon: "📱",
    link: "/services/mobile-development",
  },
  {
    title: "Solutions Architecture",
    description:
      "Enterprise solution design, system integration, and technical strategy consulting for complex business challenges.",
    icon: "🏗️",
    link: "/services/solutions-architecture",
  },
  {
    title: "Team Augmentation",
    description:
      "Flexible engineering teams for projects of any scale. Dedicated developers, architects, and technical leads.",
    icon: "👥",
    link: "/services/team-augmentation",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we"
        accent="offer."
        description="Comprehensive engineering services tailored to your needs. From AI/ML to team augmentation, we have expertise across all modern tech stacks."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link key={service.title} href={service.link}>
                <div className="rounded-lg border border-slate-200 p-6 hover:border-brand-2 hover:shadow-lg transition duration-300 bg-white cursor-pointer h-full flex flex-col">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  <span className="text-brand font-semibold hover:text-brand-2 transition text-sm">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
