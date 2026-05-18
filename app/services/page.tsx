import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const services = [
  {
    title: "Test Automation",
    description:
      "End-to-end automated testing solutions for web and mobile applications using Selenium, Playwright, and Appium.",
    icon: "🤖",
  },
  {
    title: "Performance Testing",
    description:
      "Load, stress, spike, and soak testing with JMeter. We ensure your applications handle real-world traffic.",
    icon: "⚡",
  },
  {
    title: "API Testing",
    description:
      "Comprehensive REST API testing with REST Assured, Postman, and custom automation frameworks.",
    icon: "🔌",
  },
  {
    title: "CI/CD Integration",
    description:
      "Seamless integration with Jenkins, Azure DevOps, GitHub Actions, and cloud platforms.",
    icon: "🔄",
  },
  {
    title: "QA Strategy & Consulting",
    description:
      "Strategic guidance on test planning, coverage, frameworks, and quality metrics for your team.",
    icon: "📊",
  },
  {
    title: "Cloud Testing",
    description:
      "Testing infrastructure on AWS, Azure, and Google Cloud with scalable, secure environments.",
    icon: "☁️",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="What we"
        accent="offer."
        description="Comprehensive QA and testing services tailored to your needs. From automation to performance testing, we have expertise across all domains."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-slate-200 p-8 hover:border-brand hover:shadow-lg transition duration-300 bg-white"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-brand hover:text-brand-2 transition inline-flex items-center"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to improve your QA?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Let's discuss how our services can enhance your testing and quality
              assurance processes.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand text-white font-semibold hover:bg-brand-3 transition"
            >
              Get in touch →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
