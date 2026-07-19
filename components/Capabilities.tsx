import Link from "next/link";
import Container from "@/components/Container";

const capabilities = [
  {
    title: "Technology Staffing",
    description:
      "Right-fit consultants, engineers, and technical leads — vetted for skill, domain experience, and team chemistry. Contract, contract-to-hire, and direct placement.",
    href: "/services/team-augmentation",
  },
  {
    title: "Solutions Architecture",
    description:
      "Enterprise solution design, system integration, and technology strategy that aligns platforms and people with business outcomes.",
    href: "/services/solutions-architecture",
  },
  {
    title: "Cloud Architecture & Migration",
    description:
      "Cloud strategy, migration, and modernization on AWS, Azure, and GCP — built for security, cost efficiency, and scale.",
    href: "/services/cloud-architecture",
  },
  {
    title: "AI/ML Engineering",
    description:
      "Machine learning, large language models, and AI-powered applications taken from proof of concept to production.",
    href: "/services/ai-ml",
  },
  {
    title: "Data Engineering & Analytics",
    description:
      "Data pipelines, warehousing, and real-time analytics that turn enterprise data into decisions leadership can trust.",
    href: "/services/data-engineering",
  },
  {
    title: "Full-Stack Development",
    description:
      "End-to-end application development with modern web technologies, APIs, and cloud-native architectures.",
    href: "/services/full-stack-development",
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "CI/CD pipelines, infrastructure-as-code, and container platforms that make delivery fast, repeatable, and reliable.",
    href: "/services/devops-infrastructure",
  },
  {
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications engineered for performance, security, and user experience.",
    href: "/services/mobile-development",
  },
];

export default function Capabilities() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              What we do
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Eight services,{" "}
              <span className="text-brand">one engagement model.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mute">
              Every service below is delivered the same way: a scoped
              proposal, vetted people, and written reporting. Start with a
              single specialist or hand us the whole outcome.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-3"
          >
            All services
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => (
            <Link
              key={cap.title}
              href={cap.href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
            >
              <h3 className="mb-3 text-lg font-semibold text-ink group-hover:text-brand transition">
                {cap.title}
              </h3>
              <p className="flex-grow text-sm leading-relaxed text-mute">
                {cap.description}
              </p>
              <span className="mt-5 text-sm font-semibold text-brand">
                Learn more <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
