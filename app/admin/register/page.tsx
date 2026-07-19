"use client";

import Link from "next/link";
import { useState } from "react";

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-ink";

export default function AdminRegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(fd.get("email") ?? ""),
        password: String(fd.get("password") ?? ""),
      }),
    }).catch(() => null);
    setBusy(false);
    const body = await res?.json().catch(() => null);
    if (res?.ok && body?.ok) {
      setMessage(body.message ?? "Check your inbox for the verification link.");
      return;
    }
    setError(body?.error ?? "Registration failed. Try again.");
  }

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-sm flex-col justify-center px-6 py-16">
      <h1 className="font-display text-2xl text-ink">Create recruiter account</h1>
      <p className="mt-2 text-sm text-caption">
        Registration is limited to @antgrp.com email addresses. You&apos;ll
        receive a verification link before you can sign in.
      </p>
      {message ? (
        <div role="status" className="mt-8 rounded-2xl border border-brand/30 bg-brand/5 p-6 text-sm text-ink">
          {message}
          <div className="mt-4">
            <Link href="/admin/login" className="font-semibold text-brand hover:text-brand-3">
              Go to sign in →
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="reg-email" className={labelClass}>Work email</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              required
              autoComplete="username"
              placeholder="you@antgrp.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="reg-password" className={labelClass}>Password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              required
              minLength={12}
              autoComplete="new-password"
              className={inputClass}
            />
            <p className="mt-1.5 text-xs text-caption">At least 12 characters.</p>
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
            {busy ? "Creating account…" : "Create account"}
          </button>
        </form>
      )}
      {!message && (
        <p className="mt-6 text-sm text-caption">
          Already registered?{" "}
          <Link href="/admin/login" className="font-semibold text-brand hover:text-brand-3">
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}
