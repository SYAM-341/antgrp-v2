import Container from "@/components/Container";
import Section from "@/components/Section";

export default function Principles() {
  const principles = [
    {
      title: "Quality First",
      description: "Delivering the highest quality assurance and testing standards",
    },
    {
      title: "Continuous Improvement",
      description: "Always evolving our processes and methodologies for better results",
    },
    {
      title: "Expertise & Knowledge",
      description: "Deep domain expertise across healthcare, banking, telecom, and eCommerce",
    },
    {
      title: "Client-Centric",
      description: "Your success is our success - we align with your business goals",
    },
  ];

  return (
    <Section title="Our Principles" eyebrow="The foundation of our work">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle) => (
            <div key={principle.title} className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-slate-600 text-sm">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
