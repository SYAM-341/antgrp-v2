import Container from "@/components/Container";
import Section from "@/components/Section";

const capabilities = [
  {
    title: "AI/ML Engineering",
    description:
      "Machine learning models, large language models, computer vision solutions, and AI-powered applications for modern enterprises.",
  },
  {
    title: "Full-Stack Development",
    description:
      "End-to-end application development with modern web technologies, APIs, and cloud-native architectures for scalable solutions.",
  },
  {
    title: "Cloud Architecture & Migration",
    description:
      "Design and implement scalable cloud solutions on AWS, Azure, and GCP. Multi-cloud strategies for enterprises.",
  },
  {
    title: "DevOps & Infrastructure",
    description:
      "CI/CD pipelines, infrastructure-as-code, containerization (Docker, Kubernetes), and automated deployment systems.",
  },
  {
    title: "Data Engineering & Analytics",
    description:
      "ETL pipelines, data warehousing, real-time analytics, and big data solutions for data-driven decision making.",
  },
  {
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps (iOS, Android, React Native) built for performance and user experience.",
  },
  {
    title: "Solutions Architecture",
    description:
      "Enterprise solution design, system integration, and technical strategy consulting for complex business challenges.",
  },
  {
    title: "Team Augmentation",
    description:
      "Flexible engineering teams for projects of any scale. Dedicated developers, architects, and technical leads.",
  },
];

export default function Capabilities() {
  return (
    <Section title="Our Capabilities" eyebrow="WHAT WE OFFER">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="rounded-lg border border-slate-200 p-6 hover:border-brand-2 hover:shadow-md transition duration-300 bg-white"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {cap.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
