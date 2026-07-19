"use client";

import { useState } from "react";
import { validateContact, type FieldErrors } from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-mute/60 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
const inputErrorClass =
  "mt-2 w-full rounded-lg border border-red-400 bg-white px-3 py-2.5 text-sm text-ink placeholder:text-mute/60 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-400";
const labelClass =
  "text-xs font-bold uppercase tracking-[0.12em] text-ink";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    // Client-side validation for immediate feedback; the server re-validates.
    const { data, errors: clientErrors } = validateContact(payload);
    if (!data) {
      setErrors(clientErrors);
      setServerError(null);
      return;
    }

    setStatus("submitting");
    setErrors({});
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const body = await res.json().catch(() => null);
      if (res.status === 422 && body?.errors) {
        setErrors(body.errors as FieldErrors);
        setStatus("idle");
        return;
      }
      setServerError(
        body?.error ??
          "Something went wrong on our side. Please try again, or email inquiry@antgrp.com.",
      );
      setStatus("error");
    } catch {
      setServerError(
        "We couldn't reach the server. Check your connection and try again, or email inquiry@antgrp.com.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand/30 bg-brand/5 p-8 text-center"
      >
        <div
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-xl text-white"
        >
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold text-ink">
          Message received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-mute">
          Thanks for reaching out. Your message has been passed to our team,
          and we respond to every inquiry within two business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand hover:text-brand-3"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-7 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name <span aria-hidden className="text-red-600">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            maxLength={100}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            className={errors.name ? inputErrorClass : inputClass}
            placeholder="Your name"
          />
          {errors.name && (
            <p id="cf-name-error" className="mt-1.5 text-xs text-red-700">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="cf-company" className={labelClass}>
            Company
          </label>
          <input
            id="cf-company"
            name="company"
            autoComplete="organization"
            maxLength={150}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "cf-company-error" : undefined}
            className={errors.company ? inputErrorClass : inputClass}
            placeholder="Company name"
          />
          {errors.company && (
            <p id="cf-company-error" className="mt-1.5 text-xs text-red-700">
              {errors.company}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-email" className={labelClass}>
            Work email <span aria-hidden className="text-red-600">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            className={errors.email ? inputErrorClass : inputClass}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p id="cf-email-error" className="mt-1.5 text-xs text-red-700">
              {errors.email}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <label htmlFor="cf-message" className={labelClass}>
            What can we help with?{" "}
            <span aria-hidden className="text-red-600">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            maxLength={5000}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "cf-message-error" : undefined}
            className={errors.message ? inputErrorClass : inputClass}
            placeholder="A few sentences about the project, team, or role."
          />
          {errors.message && (
            <p id="cf-message-error" className="mt-1.5 text-xs text-red-700">
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot — hidden from real users and screen readers. Bots that
            auto-fill every field reveal themselves here. */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="cf-website">Website</label>
          <input
            id="cf-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {serverError}
        </div>
      )}

      <div className="mt-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p className="text-xs text-mute">
          We use your details only to respond to this inquiry. No ad tracking.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
          {status !== "submitting" && (
            <span aria-hidden className="ml-2">→</span>
          )}
        </button>
      </div>
    </form>
  );
}
