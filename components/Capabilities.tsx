import Container from "@/components/Container";
import Section from "@/components/Section";

export default function Capabilities() {
  const capabilities = [
    {
      title: "Test Automation",
      description: "End-to-end automated testing solutions for web and mobile applications",
    },
    {
      title: "Performance Testing",
      description: "Load, stress, and spike testing to ensure optimal application performance",
    },
    {
      title: "API Testing",
      description: "Comprehensive REST API testing with automation and performance analysis",
    },
    {
      title: "CI/CD Integration",
      description: "Seamless integration with Jenkins, Azure DevOps, and cloud platforms",
    },
    {
      title: "Quality Assurance",
      description: "Manual and automated QA across multiple domains and tech stacks",
    },
    {
      title: "Cloud Testing",
      description: "AWS and Azure cloud-based testing infrastructure and solutions",
    },
  ];

  return (
    <Section title="Our Capabilities" subtitle="What we offer">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 rounded-lg border border-slate-200 hover:border-brand hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold mb-3 text-slate-900">
                {cap.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
