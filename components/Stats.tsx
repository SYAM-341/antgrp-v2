import Container from "@/components/Container";

/**
 * Optional qualitative highlights strip. Not currently used on any page —
 * kept available for pages that want a lightweight differentiators band
 * without resorting to unverifiable numeric claims (years in business,
 * headcount, engagement counts, etc.), which this site intentionally
 * does not publish.
 */
export default function Highlights() {
  const highlights = [
    {
      label: "Consulting-led delivery",
      description: "Every placement and build starts with a scoped technical understanding of the problem.",
    },
    {
      label: "Enterprise governance",
      description: "Documented process, clear ownership, and predictable communication on every engagement.",
    },
    {
      label: "Cross-industry fluency",
      description: "Consultants who already understand the regulatory and technical realities of your sector.",
    },
    {
      label: "Long-term partnership",
      description: "We measure success by whether clients return for the next initiative.",
    },
  ];

  return (
    <section className="border-b border-line bg-cream py-16">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.label}>
              <div className="mb-2 text-sm font-bold uppercase tracking-[0.08em] text-brand">
                {h.label}
              </div>
              <p className="max-w-[220px] text-sm leading-snug text-mute">
                {h.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
