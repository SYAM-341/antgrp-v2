import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export const metadata = {
  title: "Industries — AntGRP",
  description:
    "IT consulting and technology staffing with deep domain knowledge across healthcare, finance, telecom, retail, insurance, and technology.",
};

const industries = [
  {
    id: "healthcare",
    number: "01",
    name: "Healthcare",
    description:
      "HIPAA-aware engineers, architects, and analysts for health systems, payers, and health-tech companies. From EHR integrations and interoperability (HL7/FHIR) to patient-facing platforms, we deliver talent and solutions that respect both compliance and care.",
  },
  {
    id: "finance",
    number: "02",
    name: "Finance & Banking",
    description:
      "Technology partners for mission-critical financial platforms — payments, trading, core banking, and risk systems. Our consultants combine engineering depth with an understanding of uptime, auditability, and regulatory expectations.",
  },
  {
    id: "telecom",
    number: "03",
    name: "Telecommunications",
    description:
      "Large-scale systems expertise for carriers and network providers: billing and OSS/BSS platforms, network infrastructure automation, and customer experience systems built for high-volume subscriber bases.",
  },
  {
    id: "ecommerce",
    number: "04",
    name: "Retail & E-Commerce",
    description:
      "High-volume commerce engineering — payment gateways, inventory and order management, personalization, and peak-season scalability built to hold up under seasonal demand spikes.",
  },
  {
    id: "insurance",
    number: "05",
    name: "Insurance",
    description:
      "Modernization specialists for policy administration, claims processing, and underwriting platforms. We help insurers integrate legacy cores with modern digital experiences while keeping compliance front and center.",
  },
  {
    id: "technology",
    number: "06",
    name: "Technology & SaaS",
    description:
      "Product engineering and on-demand specialists for software companies moving fast — platform scaling, cloud cost optimization, AI feature delivery, and senior engineers who integrate into agile teams from day one.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Industry context,"
        accent="built in."
        description="A billing migration at a carrier is nothing like one at a bank. The people we field have lived those differences, so projects start with context instead of a ramp-up."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {industries.map((industry) => (
              <div
                key={industry.name}
                id={industry.id}
                className="scroll-mt-24 rounded-2xl border border-line bg-white p-8 transition duration-300 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl text-ink">
                    {industry.name}
                  </h3>
                  <span className="shrink-0 text-sm font-bold tracking-wider text-brand">
                    {industry.number}
                  </span>
                </div>
                <p className="leading-relaxed text-mute">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-r from-brand-3 to-brand py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Operating in a different industry?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Domain fluency transfers. If your business runs on technology, we
              can find the talent and shape the solution — tell us what
              you&apos;re building.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
            >
              Let&apos;s discuss <span aria-hidden className="ml-2">→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
