import Container from "@/components/Container";

export default function Partners() {
  const partners = [
    { name: "AWS", category: "Cloud Platform" },
    { name: "Microsoft Azure", category: "Cloud Platform" },
    { name: "Google Cloud", category: "Cloud Platform" },
    { name: "Kubernetes", category: "Container Orchestration" },
    { name: "Databricks", category: "Data & AI Platform" },
    { name: "Snowflake", category: "Data Warehouse" },
    { name: "React & Next.js", category: "Web Engineering" },
    { name: "Salesforce", category: "Enterprise CRM" },
    { name: "ServiceNow", category: "Enterprise Workflow" },
    { name: "Terraform", category: "Infrastructure as Code" },
    { name: "OpenAI & Claude", category: "AI / LLM" },
    { name: "Jenkins & GitHub", category: "CI/CD" },
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <Container size="wide">
        <div className="max-w-2xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            Technology ecosystem
          </div>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
            The platforms we work with.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mute">
            Our consultants and placed specialists work with these platforms
            daily. Engagements start with working knowledge of your stack,
            not a ramp-up period.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center rounded-xl border border-line bg-cream p-5 text-center transition hover:border-brand/40 hover:bg-soft"
            >
              <p className="font-semibold text-ink">{partner.name}</p>
              <p className="mt-1 text-xs text-mute">{partner.category}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
