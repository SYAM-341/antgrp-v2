import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function FullStackDevelopmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Full-Stack"
        accent="Development"
        description="End-to-end application development with modern web technologies, APIs, and cloud-native architectures for scalable solutions."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="font-display text-3xl text-ink md:text-4xl mb-6">
                Modern Full-Stack Development
              </h2>
              <p className="text-lg text-mute mb-4 leading-relaxed">
                We build web applications end to end — the interface users see,
                the APIs behind it, and the infrastructure underneath — with
                the tests and documentation that let your own team take over
                without a handover crisis.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="font-display text-2xl text-ink md:text-3xl mb-8">
                What We Deliver
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Frontend Development",
                    description:
                      "React, Vue, Angular, Next.js applications with responsive design, performance optimization, and accessibility.",
                  },
                  {
                    title: "Backend Development",
                    description:
                      "Node.js, Python, Java APIs with scalable architectures, database design, and business logic implementation.",
                  },
                  {
                    title: "Real-time Applications",
                    description:
                      "WebSocket implementations, real-time data synchronization, and live collaboration features.",
                  },
                  {
                    title: "API Development",
                    description:
                      "RESTful and GraphQL APIs with proper authentication, rate limiting, and comprehensive documentation.",
                  },
                  {
                    title: "Database Design",
                    description:
                      "SQL and NoSQL database architecture, optimization, migration strategies, and backup solutions.",
                  },
                  {
                    title: "Cloud-Native Apps",
                    description:
                      "Microservices architecture, containerization, and deployment on AWS, Azure, or GCP.",
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
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "React",
                  "Vue.js",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "Python",
                  "PostgreSQL",
                  "MongoDB",
                  "GraphQL",
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
                  "Complete control over entire application stack",
                  "Consistent technology choices across frontend and backend",
                  "Faster development with unified team",
                  "Better performance optimization",
                  "Fewer handoffs between frontend and backend work",
                  "Lower costs with single development team",
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
                Build Your Next Application
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-white/90">
                Let&apos;s create a scalable, modern web application for your
                business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
