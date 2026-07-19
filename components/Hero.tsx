import Link from "next/link";
import Container from "@/components/Container";
import { LogoMark } from "@/components/Logo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-header-light border-b border-line">
      {/* Subtle brand mark, cropped at the edge */}
      <LogoMark
        color="rgba(15, 118, 110, 0.07)"
        className="pointer-events-none absolute -bottom-24 right-[4%] hidden h-[480px] w-[480px] md:block"
      />

      <Container size="wide">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              IT Consulting &amp; Technology Staffing
            </div>

            <h1 className="font-display text-4xl leading-[1.1] text-ink md:text-5xl lg:text-6xl">
              The right people for
              <br />
              <span className="text-brand">the right problems.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
              AntGRP provides IT consulting and technology staffing across
              cloud, data, AI, and enterprise software. We scope the problem
              first, then bring the specialists and solutions to solve it —
              with clear terms and named accountability on every engagement.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-3"
              >
                Get in Touch
                <span aria-hidden className="ml-2">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-line-dark bg-white px-8 py-3.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                Explore Services
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-8 sm:grid-cols-2">
              {[
                "Engagements scoped and priced before work begins",
                "Specialists vetted for skill and domain experience",
                "Written status reporting on a regular cadence",
                "A named engagement owner, start to finish",
              ].map((s) => (
                <div key={s} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span className="text-sm leading-snug text-mute">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
