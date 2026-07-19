"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Job } from "@/lib/store/types";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-ink";

export default function JobForm({ job }: { job?: Job }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch(job ? `/api/admin/jobs/${job.id}` : "/api/admin/jobs", {
      method: job ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      router.push("/admin/jobs");
      router.refresh();
      return;
    }
    const body = await res?.json().catch(() => null);
    if (res?.status === 422 && body?.errors) setErrors(body.errors);
    else setServerError(body?.error ?? "Save failed. Try again.");
  }

  function err(field: string) {
    return errors[field] ? (
      <p className="mt-1 text-xs text-red-700">{errors[field]}</p>
    ) : null;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      <div className="md:col-span-2">
        <label htmlFor="jf-title" className={labelClass}>Job title *</label>
        <input id="jf-title" name="title" defaultValue={job?.title} maxLength={120} required className={inputClass} />
        {err("title")}
      </div>
      <div>
        <label htmlFor="jf-location" className={labelClass}>Location *</label>
        <input id="jf-location" name="location" defaultValue={job?.location ?? "Remote"} maxLength={120} required className={inputClass} />
        {err("location")}
      </div>
      <div>
        <label htmlFor="jf-salary" className={labelClass}>Salary range (optional)</label>
        <input id="jf-salary" name="salaryRange" defaultValue={job?.salaryRange ?? ""} maxLength={100} placeholder="$120k–$150k" className={inputClass} />
        {err("salaryRange")}
      </div>
      <div>
        <label htmlFor="jf-type" className={labelClass}>Employment type *</label>
        <select id="jf-type" name="employmentType" defaultValue={job?.employmentType ?? "Full-time"} className={inputClass}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Contract-to-hire</option>
        </select>
        {err("employmentType")}
      </div>
      <div>
        <label htmlFor="jf-level" className={labelClass}>Experience level *</label>
        <select id="jf-level" name="experienceLevel" defaultValue={job?.experienceLevel ?? "Senior"} className={inputClass}>
          <option>Junior</option>
          <option>Mid-Level</option>
          <option>Senior</option>
          <option>Lead</option>
        </select>
        {err("experienceLevel")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="jf-desc" className={labelClass}>Description *</label>
        <textarea id="jf-desc" name="description" defaultValue={job?.description} rows={6} required className={inputClass} />
        {err("description")}
      </div>
      <div className="md:col-span-2">
        <label htmlFor="jf-req" className={labelClass}>Requirements *</label>
        <textarea id="jf-req" name="requirements" defaultValue={job?.requirements} rows={5} required className={inputClass} placeholder="One requirement per line" />
        {err("requirements")}
      </div>
      <div>
        <label htmlFor="jf-status" className={labelClass}>Status *</label>
        <select id="jf-status" name="status" defaultValue={job?.status ?? "draft"} className={inputClass}>
          <option value="draft">Draft (hidden)</option>
          <option value="published">Published (visible)</option>
          <option value="closed">Closed</option>
        </select>
        {err("status")}
      </div>

      {serverError && (
        <p role="alert" className="md:col-span-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {serverError}
        </p>
      )}

      <div className="md:col-span-2 flex gap-3">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-3 disabled:opacity-60"
        >
          {busy ? "Saving…" : job ? "Save changes" : "Create job"}
        </button>
      </div>
    </form>
  );
}
