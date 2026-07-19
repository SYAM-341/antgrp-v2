import Link from "next/link";
import Container from "./Container";

const sectors = [
  {
    number: "01",
    title: "Healthcare",
    blurb:
      "Secure, compliant technology delivery and specialized talent for health systems, payers, and health-tech innovators.",
    anchor: "healthcare",
  },
  {
    number: "02",
    title: "Finance & Banking",
    blurb:
      "Engineers and architects who understand mission-critical platforms — payments, trading, core banking, and risk.",
    anchor: "finance",
  },
  {
    number: "03",
    title: "Telecommunications",
    blurb:
      "Large-scale systems expertise for billing, network infrastructure, and customer experience platforms.",
    anchor: "telecom",
  },
  {
    number: "04",
    title: "Retail & E-Commerce",
    blurb:
      "High-volume commerce engineering — payment gateways, inventory systems, and conversion-focused experiences.",
    anchor: "ecommerce",
  },
  {
    number: "05",
    title: "Insurance",
    blurb:
      "Modernization and integration talent for policy administration, claims, and regulatory compliance systems.",
    anchor: "insurance",
  },
  {
    number: "06",
    title: "Technology & SaaS",
    blurb:
      "Product engineering, platform scaling, and on-demand specialists for software companies moving fast.",
    anchor: "technology",
  },
];

function SectorCard({ number, title, blurb, anchor }: (typeof sectors)[number]) {
  return (
    <Link
      href={`/industries#${anchor}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="flex items-start justify-between">
        <span className="text-sm font-bold tracking-wider text-brand">
          {number}
        </span>
        <span
          aria-hidden
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-soft text-sm text-ink transition group-hover:border-brand group-hover:bg-brand group-hover:text-white"
        >
          →
        </span>
      </div>

      <div className="mt-10">
        <div className="text-xl font-semibold tracking-tight text-ink md:text-2xl">
          {title}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-mute">{blurb}</p>
      </div>
    </Link>
  );
}

export default function Sectors() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Industries we serve
            </div>
            <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
              Six industries we{" "}
              <span className="text-brand">know from the inside.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mute">
              A payments platform and a hospital records system fail in
              different ways. The consultants we field have worked inside
              these industries, so the first week is spent solving your
              problem — not learning your acronyms.
            </p>
          </div>
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-3"
          >
            All industries
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s) => (
            <SectorCard key={s.title} {...s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
