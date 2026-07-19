import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — AntGRP",
  description:
    "Contact AntGRP about IT consulting, technology staffing, or open roles. We respond to every inquiry within two business days.",
};

const LINKEDIN_COMPANY = "https://www.linkedin.com/company/124884115/";

const channels = [
  {
    label: "Careers & Applications",
    value: "careers@antgrp.com",
    href: "mailto:careers@antgrp.com",
  },
  {
    label: "Business Inquiries",
    value: "inquiry@antgrp.com",
    href: "mailto:inquiry@antgrp.com",
  },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start the"
        accent="conversation."
        description="A few sentences about the project or the role is enough. Every message is read by a person and answered within two business days."
      />

      <section className="bg-white py-20 md:py-24">
        <Container size="wide">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Reach out
              </div>
              <h2 className="mt-3 font-display text-2xl text-ink md:text-3xl">
                Direct channels.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                Prefer email? Two inboxes cover everything: careers for
                candidates and resumes, inquiries for everything else.
              </p>

              <div className="mt-8 space-y-4">
                {channels.map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-line bg-white p-5 transition hover:border-brand/40 hover:shadow-sm"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                      {c.label}
                    </div>
                    <a
                      href={c.href}
                      className="mt-2 inline-block text-base font-semibold text-ink underline underline-offset-4 decoration-brand/40 hover:decoration-brand"
                    >
                      {c.value}
                    </a>
                  </div>
                ))}
              </div>

              <a
                href={LINKEDIN_COMPANY}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AntGRP on LinkedIn (opens in a new tab)"
                className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-brand transition hover:border-brand hover:bg-brand hover:text-white"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </div>

            <div className="md:col-span-7">
              <ContactForm />
              <div className="mt-6 text-xs text-mute">
                Submissions are validated, rate-limited, and delivered to our
                team. We keep your details only as long as needed to handle
                your inquiry.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
