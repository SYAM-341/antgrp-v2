import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";
import { getStore } from "@/lib/store";
import Container from "@/components/Container";
import AdminHeader from "@/components/AdminHeader";
import AdminJobRow from "@/components/AdminJobRow";

export const dynamic = "force-dynamic";

export const metadata = { title: "Jobs — AntGRP Admin", robots: { index: false } };

export default async function AdminJobsPage() {
  const sessionEmail = await getSessionEmail();
  if (!sessionEmail) redirect("/admin/login");
  const store = await getStore();
  const jobs = await store.listAllJobs();
  const applications = await store.listApplications();
  const countByJob = new Map<string, number>();
  for (const a of applications) countByJob.set(a.jobId, (countByJob.get(a.jobId) ?? 0) + 1);

  return (
    <>
    <AdminHeader email={sessionEmail} />
    <section className="py-14 md:py-20">
      <Container size="wide">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl text-ink md:text-3xl">Job postings</h1>
            <p className="mt-1 text-sm text-mute">
              {jobs.length} total · {jobs.filter((j) => j.status === "published").length} published
            </p>
          </div>
          <Link
            href="/admin/jobs/new"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-3"
          >
            New job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-line bg-cream p-10 text-center text-mute">
            No jobs yet. Create your first posting.
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-cream text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Applications</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <AdminJobRow key={job.id} job={job} applicationCount={countByJob.get(job.id) ?? 0} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </section>
    </>
  );
}
