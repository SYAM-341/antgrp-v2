import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";

export default function LegalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Disclaimers &"
        accent="privacy."
        description="Plain-language statements about how this website is used and what information we collect."
      />

      <section className="bg-white py-20 md:py-24">
        <Container size="narrow">
          <div className="space-y-12">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Disclaimer
              </div>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                Informational only.
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-700">
                <p>
                  This website is provided for general informational purposes
                  only. It does not constitute legal, tax, financial, or
                  professional advice.
                </p>
                <p>
                  AntGRP may update its activities, policies, and
                  information over time. Any references to future plans are
                  non-binding and subject to change.
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-12">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Privacy
              </div>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                Privacy note.
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-zinc-700">
                <p>
                  This site does not intentionally collect sensitive personal
                  information. If you email us, we will use your message only
                  to respond and for routine record-keeping.
                </p>
                <p>
                  We do not sell personal data. We do not run ad tracking by
                  default.
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-200 pt-12 text-sm text-zinc-500">
              For questions about this notice, email{" "}
              <a
                className="font-semibold text-ink underline"
                href="mailto:hradmin@antgrp.com"
              >
                hradmin@antgrp.com
              </a>
              .
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
