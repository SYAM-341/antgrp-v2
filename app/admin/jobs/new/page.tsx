import { redirect } from "next/navigation";
import { getSessionEmail } from "@/lib/auth";
import Container from "@/components/Container";
import AdminHeader from "@/components/AdminHeader";
import JobForm from "@/components/JobForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "New job — AntGRP Admin", robots: { index: false } };

export default async function NewJobPage() {
  const sessionEmail = await getSessionEmail();
  if (!sessionEmail) redirect("/admin/login");
  return (
    <>
    <AdminHeader email={sessionEmail} />
    <section className="py-14 md:py-20">
      <Container>
        <h1 className="font-display text-2xl text-ink md:text-3xl">New job posting</h1>
        <div className="mt-8 max-w-3xl">
          <JobForm />
        </div>
      </Container>
    </section>
    </>
  );
}
