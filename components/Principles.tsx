import Container from "@/components/Container";

export default function Principles() {
  const principles = [
    {
      title: "One good answer beats ten options",
      description:
        "When you ask for a candidate or an architecture, you get our best recommendation and the reasoning behind it — not a stack of possibilities to sort through yourself.",
    },
    {
      title: "Everything in writing",
      description:
        "Scopes, status updates, and decisions are documented as we go. Six months from now, you will be able to reconstruct exactly what was agreed and why.",
    },
    {
      title: "Industry context comes standard",
      description:
        "Healthcare, finance, telecom, retail, insurance, software. The people we send have worked under the regulations and legacy constraints your team lives with.",
    },
    {
      title: "Judged by the second project",
      description:
        "The real test of a staffing partner is whether you call again. We structure pricing, placements, and communication so that you do.",
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
            Four commitments we can be held to.
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
