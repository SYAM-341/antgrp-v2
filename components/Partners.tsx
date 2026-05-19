import Container from "@/components/Container";
import Section from "@/components/Section";

export default function Partners() {
  const partners = [
    { name: "Selenium", category: "Automation Framework" },
    { name: "REST Assured", category: "API Testing" },
    { name: "JMeter", category: "Performance Testing" },
    { name: "Jenkins", category: "CI/CD" },
    { name: "AWS", category: "Cloud Platform" },
    { name: "Azure", category: "Cloud Platform" },
  ];

  return (
    <Section title="Technology Partners" eyebrow="Tools and platforms we work with">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition"
            >
              <p className="font-semibold text-slate-900 text-center">
                {partner.name}
              </p>
              <p className="text-xs text-slate-500 mt-1 text-center">
                {partner.category}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
