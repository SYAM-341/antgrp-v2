import Link from "next/link";
import Container from "@/components/Container";
import { LogoMark } from "@/components/Logo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-header-light border-b border-line">
      <LogoMark
        color="rgba(15, 118, 110, 0.07)"
        className="pointer-events-none absolute -bottom-24 right-[4%] hidden h-[480px] w-[480px] md:block"
      />

      <Container size="wide">
        <div className="relative z-10 grid grid-cols-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-caption">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              IT Consulting &amp; Technology Staffing
            </div>

            <h1 className="font-display text-5xl leading-[1.08] text-ink md:text-6xl lg:text-7xl">
              Expertise,
              <br />
              <span className="text-brand">delivered.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mute">
              AntGRP is an IT consulting and staffing firm. Companies come to
              us when a project needs a specialist they don&apos;t have — a
              cloud architect, a data engineer, a delivery team — and they
              stay because the person we send understands the work before the
              first meeting ends.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-3"
              >
                Start a Conversation
                <span aria-hidden className="ml-2">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-line-dark bg-white px-8 py-3.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                See What We Do
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-1 gap-x-6 gap-y-3.5 border-t border-line pt-8 sm:grid-cols-2">
              {[
                "Scope and price agreed before work begins",
                "Candidates interviewed by engineers, not scripts",
                "Written status updates you can forward to your board",
                "One accountable owner from first call to final invoice",
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
