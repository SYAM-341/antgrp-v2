import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ApplicationForm from "@/components/ApplicationForm";
import { getStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = await getStore();
  const job = await store.getPublishedJobBySlug(slug);
  if (!job) notFound();

  const requirements = job.requirements
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  return (
    <>
      <PageHeader
        eyebrow={`${job.location} · ${job.employmentType} · ${job.experienceLevel}`}
        title={job.title}
        description={job.salaryRange ? `Salary range: ${job.salaryRange}` : undefined}
      />

      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Link href="/careers" className="text-sm font-semibold text-brand hover:text-brand-3">
                ← All positions
              </Link>
              <h2 className="mt-4 font-display text-xl text-ink md:text-2xl">
                About the role
              </h2>
              <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-mute">
                {job.description}
              </p>
              <h2 className="mt-8 font-display text-xl text-ink md:text-2xl">
                Requirements
              </h2>
              <ul className="mt-3 space-y-2.5">
                {requirements.map((r) => (
                  <li key={r} className="flex gap-3 text-[15px] leading-relaxed text-mute">
                    <span aria-hidden className="mt-0.5 font-bold text-brand">✓</span>
                    {r.replace(/^[-•*]\s*/, "")}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-6">
              <h2 className="font-display text-xl text-ink md:text-2xl">Apply for this position</h2>
              <p className="mt-2 text-sm text-mute">
                Upload your resume first — we&apos;ll fill in your details from
                it automatically so you only review and confirm. Prefer email?
                Send your resume to{" "}
                <a href="mailto:careers@antgrp.com" className="font-semibold text-brand hover:text-brand-3">
                  careers@antgrp.com
                </a>{" "}
                with the role name in the subject line.
              </p>
              <div className="mt-5">
                <ApplicationForm jobId={job.id} jobTitle={job.title} />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
