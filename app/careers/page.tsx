import Link from "next/link";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Careers — AntGRP",
  description:
    "Open roles at AntGRP across engineering, cloud, data, and AI. Apply online with resume autofill.",
};

export default async function CareersPage() {
  const store = await getStore();
  const jobs = await store.listPublishedJobs();

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Do the work"
        accent="you're best at."
        description="AntGRP places technologists with client teams and hires for its own consulting practice. Open roles are below — upload a resume and the form fills itself in."
      />

      <section className="py-16 md:py-24">
        <Container>
          <h2 className="font-display text-2xl text-ink md:text-3xl">Open positions</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
            Prefer email? Send your resume directly to our recruiting team at{" "}
            <a href="mailto:careers@antgrp.com" className="font-semibold text-brand hover:text-brand-3">
              careers@antgrp.com
            </a>{" "}
            — with or without an open role in mind.
          </p>

          {jobs.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-line bg-cream p-10 text-center">
              <p className="font-semibold text-ink">No open positions right now.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-mute">
                We add roles as client engagements are confirmed. Send your
                resume to{" "}
                <a href="mailto:careers@antgrp.com" className="font-semibold text-brand">
                  careers@antgrp.com
                </a>{" "}
                and we&apos;ll keep it on file.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.slug}`}
                  className="group rounded-2xl border border-line bg-white p-6 transition duration-300 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 md:p-7"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-ink transition group-hover:text-brand">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand-3">
                          {job.location}
                        </span>
                        <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-mute">
                          {job.experienceLevel}
                        </span>
                        <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-mute">
                          {job.employmentType}
                        </span>
                        {job.salaryRange && (
                          <span className="rounded-full bg-soft px-3 py-1 text-xs font-semibold text-mute">
                            {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-brand">
                      View &amp; apply →
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-mute">
                    {job.description}
                  </p>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-14 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-3 to-brand p-10 text-center md:p-14">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
              Don&apos;t see a fitting role?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-white/90">
              We&apos;re always interested in hearing from strong engineers.
              Send your resume and we&apos;ll keep it on file for future openings.
            </p>
            <a
              href="mailto:careers@antgrp.com"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 font-semibold text-brand-3 transition hover:bg-cream"
            >
              Email your resume
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
