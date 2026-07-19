"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-ink";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(fd.get("email") ?? ""),
        password: String(fd.get("password") ?? ""),
      }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      router.push("/admin/jobs");
      router.refresh();
      return;
    }
    const body = await res?.json().catch(() => null);
    setError(body?.error ?? "Sign-in failed. Try again.");
  }

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-sm flex-col justify-center px-6 py-16">
      <h1 className="font-display text-2xl text-ink">Recruiter sign in</h1>
      <p className="mt-2 text-sm text-caption">
        Job postings and applications. AntGRP recruiters only.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="admin-email" className={labelClass}>Work email</label>
          <input
            id="admin-email"
            name="email"
            type="email"
            required
            autoComplete="username"
            placeholder="you@antgrp.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="admin-password" className={labelClass}>Password</label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
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
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-sm text-caption">
        New recruiter?{" "}
        <Link href="/admin/register" className="font-semibold text-brand hover:text-brand-3">
          Create your account
        </Link>
      </p>
    </div>
  );
}
