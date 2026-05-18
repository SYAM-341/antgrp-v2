import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";

const channels = [
  {
    label: "HR & Administration",
    value: "hradmin@antgrp.com",
    href: "mailto:hradmin@antgrp.com",
  },
  {
    label: "Finance",
    value: "finance@antgrp.com",
    href: "mailto:finance@antgrp.com",
  },
  {
    label: "Timesheets",
    value: "timesheets@antgrp.com",
    href: "mailto:timesheets@antgrp.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about"
        accent="what's next."
        description="Tell us about the project, the team, or the role. We respond to every legitimate inquiry within two business days."
      />

      <section className="bg-white py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Reach out
              </div>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                Direct channels.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                Email is the fastest way to reach us. Pick the inbox closest to
                your inquiry — we route everything else through HR.
              </p>

              <div className="mt-8 space-y-4">
                {channels.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-line bg-white p-5 transition hover:border-brand-2/40 hover:shadow-sm"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                      {c.label}
                    </div>
                    <a
                      href={c.href}
                      className="mt-2 inline-block text-base font-semibold text-ink underline underline-offset-4 decoration-brand-2/40 hover:decoration-brand-2"
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-line bg-cream p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  Mailing address
                </div>
                <div className="mt-2 text-sm text-zinc-700">
                  Available upon request, where appropriate.
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <form
                action="mailto:hradmin@antgrp.com"
                method="post"
                encType="text/plain"
                className="rounded-2xl border border-line bg-white p-7 shadow-sm"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.12em] text-brand">
                      Name
                    </label>
                    <input
                      name="name"
                      required
                      className="mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-2 focus:outline-none focus:ring-1 focus:ring-brand-2"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-[0.12em] text-brand">
                      Company
                    </label>
                    <input
                      name="company"
                      className="mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-2 focus:outline-none focus:ring-1 focus:ring-brand-2"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-[0.12em] text-brand">
                      Work email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-2 focus:outline-none focus:ring-1 focus:ring-brand-2"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-[0.12em] text-brand">
                      What can we help with?
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="mt-2 w-full rounded-lg border border-line px-3 py-2.5 text-sm focus:border-brand-2 focus:outline-none focus:ring-1 focus:ring-brand-2"
                      placeholder="A few sentences about the project, team, or role."
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                  <p className="text-xs text-zinc-500">
                    Submitting opens your email client. We do not run ad
                    tracking on this site.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-3 transition shadow-sm"
                  >
                    Send message
                    <span aria-hidden className="ml-2">→</span>
                  </button>
                </div>
              </form>

              <div className="mt-6 text-xs text-zinc-500">
                Note: This site does not provide automated public service
                offerings. Inquiries are reviewed by our team.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
