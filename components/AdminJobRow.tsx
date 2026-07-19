"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Job } from "@/lib/store/types";

const statusStyle: Record<Job["status"], string> = {
  draft: "bg-soft text-mute",
  published: "bg-brand/10 text-brand-3",
  closed: "bg-red-50 text-red-700",
};

export default function AdminJobRow({
  job,
  applicationCount,
}: {
  job: Job;
  applicationCount: number;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(status: Job["status"]) {
    setBusy(true);
    await fetch(`/api/admin/jobs/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    setBusy(false);
    router.refresh();
  }

  return (
    <tr className="border-t border-line">
      <td className="px-4 py-3">
        <div className="font-semibold text-ink">{job.title}</div>
        {job.postedBy && (
          <div className="text-xs text-caption">posted by {job.postedBy}</div>
        )}
      </td>
      <td className="px-4 py-3 text-mute">{job.location}</td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[job.status]}`}>
          {job.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <Link href={`/admin/jobs/${job.id}/applications`} className="font-semibold text-brand hover:text-brand-3">
          {applicationCount} application{applicationCount === 1 ? "" : "s"}
        </Link>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/jobs/${job.id}`}
            className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink hover:border-brand hover:text-brand"
          >
            Edit
          </Link>
          {job.status !== "published" ? (
            <button
              type="button"
              disabled={busy}
              onClick={() => setStatus("published")}
              className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink hover:border-brand hover:text-brand disabled:opacity-50"
            >
              Publish
            </button>
          ) : (
            <button
              type="button"
              disabled={busy}
              onClick={() => setStatus("draft")}
              className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink hover:border-brand hover:text-brand disabled:opacity-50"
            >
              Unpublish
            </button>
          )}
          {job.status !== "closed" && (
            <button
              type="button"
              disabled={busy}
              onClick={() => setStatus("closed")}
              className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-red-700 hover:border-red-400 disabled:opacity-50"
            >
              Close
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
