"use client";

import { useRef, useState } from "react";

type Status = "idle" | "parsing" | "submitting" | "success" | "error";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-mute/60 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
const inputErrorClass =
  "mt-1.5 w-full rounded-lg border border-red-400 bg-white px-3 py-2.5 text-sm text-ink focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-400";
const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-ink";

const AUTH_OPTIONS = [
  "US Citizen / Green Card",
  "Work visa (H1B, L1, etc.)",
  "Requires sponsorship",
  "Other / prefer to discuss",
];

export default function ApplicationForm({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const [autofillNote, setAutofillNote] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /** Resume-first flow: on file selection, parse server-side and pre-fill fields. */
  async function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setAutofillNote(null);
    setResumeName(file ? file.name : null);
    if (!file) return;
    setStatus("parsing");
    const fd = new FormData();
    fd.append("resume", file);
    const res = await fetch("/api/parse-resume", { method: "POST", body: fd }).catch(() => null);
    setStatus("idle");
    const body = await res?.json().catch(() => null);
    if (!res?.ok || !body?.ok) {
      setAutofillNote("We couldn't read this file — please fill in your details below.");
      return;
    }
    const form = formRef.current;
    if (!form) return;
    const fields = body.fields as Record<string, string | undefined>;
    let filled = 0;
    for (const key of ["name", "email", "phone", "linkedin"] as const) {
      const el = form.elements.namedItem(key) as HTMLInputElement | null;
      if (el && fields[key] && !el.value) {
        el.value = fields[key]!;
        filled++;
      }
    }
    if (filled > 0) {
      setAutofillNote(
        `We pre-filled ${filled} field${filled === 1 ? "" : "s"} from your resume — please review and correct before submitting.`,
      );
    } else if (!body.hasTextLayer) {
      setAutofillNote(
        "This looks like a scanned resume with no readable text — please fill in your details below.",
      );
    } else {
      setAutofillNote("We couldn't confidently extract your details — please fill them in below.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("jobId", jobId);

    const clientErrors: Record<string, string> = {};
    if (!String(fd.get("name") ?? "").trim()) clientErrors.name = "Enter your name.";
    if (!String(fd.get("email") ?? "").trim()) clientErrors.email = "Enter your email.";
    if (!String(fd.get("phone") ?? "").trim()) clientErrors.phone = "Enter your phone number.";
    if (!String(fd.get("workAuthorization") ?? "")) clientErrors.workAuthorization = "Select an option.";
    if (!(fd.get("resume") instanceof File) || (fd.get("resume") as File).size === 0)
      clientErrors.resume = "Attach your resume.";
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});
    setServerError(null);
    const res = await fetch("/api/apply", { method: "POST", body: fd }).catch(() => null);
    if (res?.ok) {
      setStatus("success");
      return;
    }
    const body = await res?.json().catch(() => null);
    if (res?.status === 422 && body?.errors) {
      setErrors(body.errors);
      setStatus("idle");
      return;
    }
    setServerError(
      body?.error ?? "Something went wrong. Please try again or email careers@antgrp.com.",
    );
    setStatus("error");
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-brand/30 bg-brand/5 p-8 text-center">
        <div aria-hidden className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl text-white">
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink">Application received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mute">
          Thanks for applying to {jobTitle}. Our recruiting team reviews every
          application and will reach out if there&apos;s a fit.
        </p>
      </div>
    );
  }

  function err(field: string) {
    return errors[field] ? (
      <p id={`af-${field}-error`} className="mt-1 text-xs text-red-700">{errors[field]}</p>
    ) : null;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-6 shadow-sm md:p-7"
    >
      {/* Step 1: resume upload */}
      <div className="rounded-xl border-2 border-dashed border-line bg-cream p-5 text-center">
        <label htmlFor="af-resume" className="block cursor-pointer">
          <span className="font-semibold text-ink">
            {resumeName ? `Resume: ${resumeName}` : "Step 1 — Upload your resume"}
          </span>
          <span className="mt-1 block text-xs text-mute">
            PDF or DOCX, max 5 MB. We&apos;ll auto-fill your details from it.
          </span>
        </label>
        <input
          ref={fileInput}
          id="af-resume"
          name="resume"
          type="file"
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleResumeChange}
          aria-describedby={errors.resume ? "af-resume-error" : undefined}
          className="mx-auto mt-3 block text-sm text-mute file:mr-3 file:rounded-full file:border-0 file:bg-brand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-3"
        />
        {status === "parsing" && (
          <p role="status" className="mt-2 text-xs font-semibold text-brand">
            Reading your resume…
          </p>
        )}
        {err("resume")}
      </div>

      {autofillNote && (
        <p role="status" className="mt-4 rounded-lg border border-brand/30 bg-brand/5 px-4 py-2.5 text-xs text-brand-3">
          {autofillNote}
        </p>
      )}

      {/* Step 2: review details */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="af-name" className={labelClass}>Full name *</label>
          <input id="af-name" name="name" maxLength={100} autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "af-name-error" : undefined}
            className={errors.name ? inputErrorClass : inputClass} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="af-phone" className={labelClass}>Phone *</label>
          <input id="af-phone" name="phone" maxLength={30} autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "af-phone-error" : undefined}
            className={errors.phone ? inputErrorClass : inputClass} />
          {err("phone")}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="af-email" className={labelClass}>Email *</label>
          <input id="af-email" type="email" name="email" maxLength={254} autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "af-email-error" : undefined}
            className={errors.email ? inputErrorClass : inputClass} />
          {err("email")}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="af-linkedin" className={labelClass}>LinkedIn (optional)</label>
          <input id="af-linkedin" name="linkedin" maxLength={200} placeholder="https://www.linkedin.com/in/yourname"
            aria-invalid={Boolean(errors.linkedin)}
            aria-describedby={errors.linkedin ? "af-linkedin-error" : undefined}
            className={errors.linkedin ? inputErrorClass : inputClass} />
          {err("linkedin")}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="af-auth" className={labelClass}>Work authorization *</label>
          <select id="af-auth" name="workAuthorization" defaultValue=""
            aria-invalid={Boolean(errors.workAuthorization)}
            aria-describedby={errors.workAuthorization ? "af-workAuthorization-error" : undefined}
            className={errors.workAuthorization ? inputErrorClass : inputClass}>
            <option value="" disabled>Select…</option>
            {AUTH_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {err("workAuthorization")}
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="af-website">Website</label>
          <input id="af-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {serverError && (
        <div role="alert" className="mt-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {serverError}
        </div>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <p className="text-xs text-mute">
          Your details and resume are used only for recruiting at AntGRP and
          retained only as long as needed for that purpose.
        </p>
        <button
          type="submit"
          disabled={status === "submitting" || status === "parsing"}
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit application"}
        </button>
      </div>
    </form>
  );
}
