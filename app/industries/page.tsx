import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const industries = [
  {
    name: "Healthcare",
    description:
      "Compliance-driven QA for healthcare systems. HIPAA-compliant testing, patient data security, and regulatory requirements.",
    experience: "8+ years",
  },
  {
    name: "Finance & Banking",
    description:
      "Mission-critical testing for financial systems. Payment processing, trading platforms, and banking infrastructure.",
    experience: "10+ years",
  },
  {
    name: "Telecommunications",
    description:
      "Large-scale system testing for telecom. Billing systems, network infrastructure, and customer platforms.",
    experience: "9+ years",
  },
  {
    name: "E-Commerce",
    description:
      "High-volume transaction testing. Payment gateways, inventory systems, and customer experience optimization.",
    experience: "7+ years",
  },
  {
    name: "Insurance",
    description:
      "Complex policy and claims testing. Regulatory compliance, data accuracy, and integration testing.",
    experience: "8+ years",
  },
  {
    name: "Technology & SaaS",
    description:
      "Agile-driven QA for software companies. Continuous deployment, API testing, and cloud infrastructure.",
    experience: "11+ years",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Expertise across"
        accent="multiple sectors."
        description="We have deep domain knowledge across diverse industries, bringing specialized testing expertise wherever you need it."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="rounded-2xl border border-slate-200 p-8 hover:border-brand hover:shadow-lg transition duration-300 bg-white"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {industry.name}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand bg-brand/10 px-3 py-1 rounded-full">
                    {industry.experience}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-r from-brand to-brand-2 py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Does your industry need specialized QA?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              We have the expertise and experience to handle your domain's unique
              testing challenges.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-brand font-semibold hover:bg-slate-50 transition"
            >
              Let's discuss →
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
