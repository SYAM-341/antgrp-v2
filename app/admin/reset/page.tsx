"use client";

import Link from "next/link";
import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-ink";

export default function AdminResetRequestPage() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/reset-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: String(fd.get("email") ?? "") }),
    }).catch(() => null);
    setBusy(false);
    const body = await res?.json().catch(() => null);
    if (res?.ok && body?.ok) {
      setMessage(body.message ?? "Check your inbox for the reset link.");
      return;
    }
    setError(body?.error ?? "Something went wrong. Try again.");
  }

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-sm flex-col justify-center px-6 py-16">
      <h1 className="font-display text-2xl text-ink">Reset your password</h1>
      <p className="mt-2 text-sm text-caption">
        Enter your work email and we&rsquo;ll send you a reset link.
      </p>
      {message ? (
        <div className="mt-8 space-y-6">
          <p className="rounded-lg border border-line bg-soft px-4 py-3 text-sm text-ink">
            {message}
          </p>
          <p className="text-sm text-caption">
            <Link href="/admin/login" className="font-semibold text-brand hover:text-brand-3">
              Back to sign in
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="reset-email" className={labelClass}>Work email</label>
            <input
              id="reset-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="you@antgrp.com"
              className={inputClass}
            />
          </div>
          {error && (
            <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-3 disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>
          <p className="text-sm text-caption">
            Remembered it?{" "}
            <Link href="/admin/login" className="font-semibold text-brand hover:text-brand-3">
              Back to sign in
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
