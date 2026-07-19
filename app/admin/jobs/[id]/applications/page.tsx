import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";
import { getStore } from "@/lib/store";
import Container from "@/components/Container";
import AdminHeader from "@/components/AdminHeader";
import ApplicationRow from "@/components/ApplicationRow";

export const dynamic = "force-dynamic";
export const metadata = { title: "Applications — AntGRP Admin", robots: { index: false } };

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const sessionEmail = await getSessionEmail();
  if (!sessionEmail) redirect("/admin/login");
  const { id } = await params;
  const store = await getStore();
  const job = await store.getJob(id);
  if (!job) notFound();
  const applications = await store.listApplications(id);

  return (
    <>
    <AdminHeader email={sessionEmail} />
    <section className="py-14 md:py-20">
      <Container size="wide">
        <Link href="/admin/jobs" className="text-sm font-semibold text-brand hover:text-brand-3">
          ← All jobs
        </Link>
        <h1 className="mt-3 font-display text-2xl text-ink md:text-3xl">
          Applications: {job.title}
        </h1>
        <p className="mt-1 text-sm text-mute">{applications.length} received</p>

        {applications.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-line bg-cream p-10 text-center text-mute">
            No applications yet.
          </div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-cream text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
                <tr>
                  <th className="px-4 py-3">Candidate</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Work auth</th>
                  <th className="px-4 py-3">Applied</th>
                  <th className="px-4 py-3">Resume</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <ApplicationRow key={app.id} app={app} />
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
