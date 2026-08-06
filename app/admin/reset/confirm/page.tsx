"use client";

import Link from "next/link";
import { Suspense, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
const labelClass = "text-xs font-bold uppercase tracking-[0.12em] text-ink";

/**
 * The URL fragment (#...) never reaches the server, so we read it with
 * useSyncExternalStore: a sentinel during SSR (render nothing), the real
 * hash after hydration. The hash never changes during the page's life, so
 * the subscribe function is a no-op.
 */
const noopSubscribe = () => () => {};
const SSR = " ssr";
function useUrlHash(): string {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.location.hash,
    () => SSR,
  );
}

/**
 * Handles both Supabase recovery-link styles:
 *  - ?token_hash=...&type=recovery   (custom email template)
 *  - #access_token=...&type=recovery (default template redirect)
 *  - #error=...&error_description=... (expired/used link)
 */
function ResetConfirmForm() {
  const router = useRouter();
  const params = useSearchParams();
  const hash = useUrlHash();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  if (hash === SSR) return null;

  const hashParams = new URLSearchParams(hash.replace(/^#/, ""));
  const tokenHash = params.get("token_hash") ?? "";
  const accessToken = hashParams.get("access_token") ?? "";
  const linkError = (
    hashParams.get("error_description") ?? hashParams.get("error") ?? ""
  ).replace(/\+/g, " ");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const password = String(fd.get("password") ?? "");
    const confirm = String(fd.get("confirm") ?? "");
    if (password !== confirm) {
      setBusy(false);
      setError("Passwords do not match.");
      return;
    }
    const res = await fetch("/api/admin/reset-confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token_hash: tokenHash || undefined,
        access_token: accessToken || undefined,
        password,
      }),
    }).catch(() => null);
    setBusy(false);
    const body = await res?.json().catch(() => null);
    if (res?.ok && body?.ok) {
      setDone(true);
      setTimeout(() => router.push("/admin/login"), 2500);
      return;
    }
    setError(body?.error ?? "Something went wrong. Try again.");
  }

  if (linkError || (!tokenHash && !accessToken)) {
    return (
      <div className="mt-8 space-y-6">
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {linkError || "This reset link is invalid or has expired."}
        </p>
        <p className="text-sm text-caption">
          <Link href="/admin/reset" className="font-semibold text-brand hover:text-brand-3">
            Request a new reset link
          </Link>
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mt-8 space-y-6">
        <p className="rounded-lg border border-line bg-soft px-4 py-3 text-sm text-ink">
          Password updated. Redirecting you to sign in…
        </p>
        <p className="text-sm text-caption">
          <Link href="/admin/login" className="font-semibold text-brand hover:text-brand-3">
            Go to sign in now
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="new-password" className={labelClass}>New password</label>
        <input
          id="new-password"
          name="password"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-caption">At least 12 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm-password" className={labelClass}>Confirm new password</label>
        <input
          id="confirm-password"
          name="confirm"
          type="password"
          required
          minLength={12}
          autoComplete="new-password"
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
        {busy ? "Updating…" : "Set new password"}
      </button>
    </form>
  );
}

export default function AdminResetConfirmPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-sm flex-col justify-center px-6 py-16">
      <h1 className="font-display text-2xl text-ink">Set a new password</h1>
      <p className="mt-2 text-sm text-caption">
        Choose a new password for your recruiter account.
      </p>
      <Suspense fallback={null}>
        <ResetConfirmForm />
      </Suspense>
    </div>
  );
}
