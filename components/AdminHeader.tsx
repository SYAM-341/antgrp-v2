"use client";

import { useRouter } from "next/navigation";

export default function AdminHeader({ email }: { email: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" }).catch(() => null);
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-cream px-6 py-2.5 text-sm">
      <span className="text-caption">
        Signed in as <span className="font-semibold text-ink">{email}</span>
      </span>
      <button
        type="button"
        onClick={logout}
        className="rounded-full border border-line-dark bg-white px-4 py-1.5 text-xs font-semibold text-ink transition hover:border-brand hover:text-brand"
      >
        Sign out
      </button>
    </div>
  );
}
