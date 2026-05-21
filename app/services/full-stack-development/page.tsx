import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function FullStackDevelopmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Full-Stack Development"
        accent="Services"
        description="End-to-end application development with modern web technologies, APIs, and cloud-native architectures for scalable solutions."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Modern Full-Stack Development
              </h2>
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                We build robust, scalable web applications from frontend to
                backend. Our full-stack expertise spans modern frameworks and
                cloud-native architectures.
              </p>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
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
                  "Complete control over entire application stack",
                  "Consistent technology choices across frontend and backend",
                  "Faster development with unified team",
                  "Better performance optimization",
                  "Seamless integration and communication",
                  "Lower costs with single development team",
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
                Build Your Next Application
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Let's create a scalable, modern web application for your
                business.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
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
