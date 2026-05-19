import Link from "next/link";
import Container from "@/components/Container";
import Badge from "@/components/Badge";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 left-20 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          {/* Left Content */}
          <div className="z-10">
            <div className="mb-8">
              <Badge label="ACTIVELY HIRING" variant="accent" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 leading-tight">
              Engineering
              <br />
              Teams.
              <span className="block text-brand italic font-serif text-5xl md:text-6xl">
                Delivered.
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              AntGRP builds high-performing engineering squads and delivers
              cloud, data, and platform programs for organizations that move
              fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-3 transition shadow-sm"
              >
                Start a project
                <span aria-hidden className="ml-2">
                  →
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-900 hover:border-slate-400 hover:bg-slate-50 transition"
              >
                Explore services
              </Link>
            </div>
          </div>

          {/* Right Orb */}
          <div className="relative h-96 lg:h-full flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-brand/20 to-blue-300/10 rounded-full blur-2xl" />
            </div>
            <div className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shadow-xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand mb-2">A</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">
                  AntGRP
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
