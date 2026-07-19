import Container from "@/components/Container";

export default function Principles() {
  const principles = [
    {
      title: "Fit over volume",
      description:
        "We present one well-matched candidate or one workable architecture, not a long list of possibilities. Every recommendation is checked against your stack, your domain, and your team.",
    },
    {
      title: "Documented delivery",
      description:
        "Statements of work, written status updates, and recorded decisions on every engagement — so progress is visible and commitments are auditable.",
    },
    {
      title: "Domain experience",
      description:
        "Healthcare, finance, telecom, retail, insurance, and SaaS. The people we place and the consultants we field have worked inside the regulatory and technical constraints of these markets.",
    },
    {
      title: "Repeat relationships",
      description:
        "We measure success by whether clients return for the next hire or the next project, and we structure engagements accordingly.",
    },
  ];

  return (
    <section className="border-t border-line bg-cream py-20 md:py-28">
      <Container size="wide">
        <div className="max-w-2xl">
          <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
            How we work
          </div>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
            Four working principles.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title} className="flex gap-5">
              <div className="flex-shrink-0">
                <div
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white"
                >
                  ✓
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-ink">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-mute">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
