import Link from "next/link";
import Container from "./Container";

const sectors = [
  {
    number: "01",
    title: "IT Consulting & Staffing",
    blurb:
      "A potential future focus area for technology consulting and talent solutions, subject to readiness and applicable requirements.",
    image: "/sectors/it.jpg",
    anchor: "it",
  },
  {
    number: "02",
    title: "Real Estate",
    blurb:
      "Future real estate-related activities may include acquisition, management, or services where permitted and appropriate.",
    image: "/sectors/real-estate.jpg",
    anchor: "realestate",
  },
  {
    number: "03",
    title: "Agriculture",
    blurb:
      "Exploring agricultural opportunities and operational models for sustainable and compliant growth.",
    image: "/sectors/agriculture.jpg",
    anchor: "agriculture",
  },
  {
    number: "04",
    title: "Automotive",
    blurb:
      "Evaluating automotive-related ventures and partnerships aligned with long-term plans.",
    image: "/sectors/automotive.jpg",
    anchor: "automotive",
  },
];

function SectorCard({
  number,
  title,
  blurb,
  image,
  anchor,
}: (typeof sectors)[number]) {
  return (
    <Link
      href={`/industries#${anchor}`}
      className="group relative flex h-[420px] min-w-[280px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-ink text-white shadow-sm transition hover:shadow-xl"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      <div className="relative flex items-start justify-between p-6">
        <span className="text-sm font-bold tracking-wider text-white/90">
          {number}
        </span>
        <span
          aria-hidden
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm transition group-hover:bg-white group-hover:text-brand-2"
        >
          →
        </span>
      </div>

      <div className="relative p-6">
        <div className="text-2xl font-semibold tracking-tight md:text-[26px]">
          {title}
        </div>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
          {blurb}
        </p>
      </div>
    </Link>
  );
}

export default function Sectors() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
              Sectors of interest
            </div>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
              Industries we{" "}
              <span className="font-serif-italic text-brand-2">support.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600">
              AntGRP is structured to support lawful business activities. The
              sectors below reflect current areas of interest and may evolve over
              time.
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

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <SectorCard key={s.title} {...s} />
          ))}
        </div>

        <div className="mt-8 max-w-3xl text-sm text-zinc-500">
          Note: The presence of a sector on this page does not constitute an
          offer of services, solicitation, or hiring activity.
        </div>
      </Container>
    </section>
  );
}
