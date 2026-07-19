import Link from "next/link";
import Container from "@/components/Container";
import { LogoMark } from "@/components/Logo";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand py-20 md:py-24">
      <LogoMark
        color="rgba(255,255,255,0.08)"
        className="pointer-events-none absolute -bottom-16 -right-10 h-80 w-80"
      />
      <Container>
        <div className="relative z-10 text-center">
          <h2 className="mb-4 font-display text-3xl text-white md:text-4xl">
            Tell us what you&apos;re trying to build.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Describe the project or the role in a few sentences. Within two
            business days you&apos;ll have a reply from someone who read it —
            with a concrete next step, or an honest &quot;we&apos;re not the
            fit.&quot;
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
            >
              Get in Touch <span aria-hidden className="ml-2">→</span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/70 px-8 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              About AntGRP
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
