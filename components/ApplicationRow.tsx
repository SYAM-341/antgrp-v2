"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Application, ApplicationStatus } from "@/lib/store/types";

export default function ApplicationRow({ app }: { app: Application }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(status: ApplicationStatus) {
    setBusy(true);
    await fetch(`/api/admin/applications/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    setBusy(false);
    router.refresh();
  }

  return (
    <tr className="border-t border-line align-top">
      <td className="px-4 py-3">
        <div className="font-semibold text-ink">{app.name}</div>
        {app.linkedin && (
          <a
            href={app.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand hover:text-brand-3"
          >
            LinkedIn profile
          </a>
        )}
      </td>
      <td className="px-4 py-3 text-mute">
        <div>{app.email}</div>
        <div>{app.phone}</div>
      </td>
      <td className="px-4 py-3 text-mute">{app.workAuthorization}</td>
      <td className="px-4 py-3 text-mute">{new Date(app.createdAt).toLocaleDateString()}</td>
      <td className="px-4 py-3">
        <a
          href={`/api/admin/resume/${app.id}`}
          className="font-semibold text-brand hover:text-brand-3"
        >
          Download
        </a>
      </td>
      <td className="px-4 py-3">
        <select
          value={app.status}
          disabled={busy}
          onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
          aria-label={`Status for ${app.name}`}
          className="rounded-lg border border-line bg-white px-2 py-1.5 text-xs font-semibold text-ink focus:border-brand focus:outline-none"
        >
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="contacted">Contacted</option>
          <option value="rejected">Rejected</option>
        </select>
      </td>
    </tr>
  );
}
