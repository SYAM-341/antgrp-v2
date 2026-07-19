import { notFound, redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";
import { getStore } from "@/lib/store";
import Container from "@/components/Container";
import AdminHeader from "@/components/AdminHeader";
import JobForm from "@/components/JobForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit job — AntGRP Admin", robots: { index: false } };

export default async function EditJobPage({
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
  return (
    <>
    <AdminHeader email={sessionEmail} />
    <section className="py-14 md:py-20">
      <Container>
        <h1 className="font-display text-2xl text-ink md:text-3xl">Edit: {job.title}</h1>
        <p className="mt-1 text-sm text-mute">Public URL: /careers/{job.slug}</p>
        <div className="mt-8 max-w-3xl">
          <JobForm job={job} />
        </div>
      </Container>
    </section>
    </>
  );
}
