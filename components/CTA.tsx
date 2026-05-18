import Link from "next/link";
import Container from "@/components/Container";

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-brand to-brand/90">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Elevate Your QA?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how our expertise can improve your testing and QA processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-brand font-semibold hover:bg-slate-50 transition"
            >
              Get Started →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
