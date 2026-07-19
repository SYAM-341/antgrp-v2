import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact — AntGRP",
  description:
    "Contact AntGRP about IT consulting, technology staffing, or open roles. We respond to every inquiry within two business days.",
};

const LINKEDIN_COMPANY = "https://www.linkedin.com/company/124884115/";
const LINKEDIN_FOUNDER = "https://www.linkedin.com/in/antgrpmary/";

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
        title="Tell us what"
        accent="you need."
        description="Describe the project, the team, or the role. We respond to every inquiry within two business days."
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
                Prefer email? Pick the inbox closest to your inquiry — anything
                else is routed through HR.
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

              <div className="mt-8 rounded-2xl border border-line bg-cream p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  LinkedIn
                </div>
                <div className="mt-3 space-y-2.5">
                  <a
                    href={LINKEDIN_COMPANY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm font-semibold text-ink transition hover:text-brand"
                  >
                    <LinkedInIcon className="h-4 w-4 text-brand" />
                    AntGRP company page
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  <a
                    href={LINKEDIN_FOUNDER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm font-semibold text-ink transition hover:text-brand"
                  >
                    <LinkedInIcon className="h-4 w-4 text-brand" />
                    Founder &amp; President
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-line bg-cream p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                  Mailing address
                </div>
                <div className="mt-2 text-sm text-mute">
                  Available on request.
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <ContactForm />
              <div className="mt-6 text-xs text-mute">
                Submissions are validated, rate-limited, and delivered to our
                HR team. We keep your details only as long as needed to handle
                your inquiry.
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
