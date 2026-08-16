"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const IDLE_LIMIT_MS = 15 * 60 * 1000; // signed out after 15 min of inactivity
const WARN_AT_MS = 13 * 60 * 1000; // warning appears with 2 min remaining
const HEARTBEAT_MS = 5 * 60 * 1000; // slide the server cookie at most this often

/**
 * Client-side idle watcher for the admin area.
 *
 * - Mouse/keyboard/scroll/touch activity resets the idle clock; while the
 *   recruiter is active, a heartbeat request slides the server-side
 *   15-minute session cookie forward (via the middleware).
 * - After 13 idle minutes a modal warns with a live countdown; only the
 *   "Stay signed in" button dismisses it (passive mouse movement doesn't).
 * - At 15 idle minutes the session is ended and the recruiter is returned
 *   to the sign-in page.
 */
export default function IdleTimeout() {
  const router = useRouter();
  const lastActivity = useRef(0);
  const lastHeartbeat = useRef(0);
  const warningActive = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    let stopped = false;
    lastActivity.current = Date.now();
    lastHeartbeat.current = Date.now();

    function heartbeat() {
      lastHeartbeat.current = Date.now();
      fetch("/api/admin/session").catch(() => undefined);
    }

    function onActivity() {
      if (warningActive.current) return; // modal requires an explicit click
      lastActivity.current = Date.now();
      if (Date.now() - lastHeartbeat.current > HEARTBEAT_MS) heartbeat();
    }

    async function signOut() {
      if (stopped) return;
      stopped = true;
      await fetch("/api/admin/login", { method: "DELETE" }).catch(() => undefined);
      router.push("/admin/login?timeout=1");
      router.refresh();
    }

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
    ];
    for (const ev of events) window.addEventListener(ev, onActivity, { passive: true });

    const timer = window.setInterval(() => {
      const idle = Date.now() - lastActivity.current;
      if (idle >= IDLE_LIMIT_MS) {
        window.clearInterval(timer);
        void signOut();
        return;
      }
      if (idle >= WARN_AT_MS) {
        warningActive.current = true;
        setSecondsLeft(Math.max(0, Math.ceil((IDLE_LIMIT_MS - idle) / 1000)));
      } else if (warningActive.current === false) {
        setSecondsLeft(null);
      }
    }, 1000);

    return () => {
      window.clearInterval(timer);
      for (const ev of events) window.removeEventListener(ev, onActivity);
    };
  }, [router]);

  function staySignedIn() {
    warningActive.current = false;
    lastActivity.current = Date.now();
    lastHeartbeat.current = Date.now();
    fetch("/api/admin/session").catch(() => undefined);
    setSecondsLeft(null);
  }

  if (secondsLeft === null) return null;

  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="idle-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/50 px-6"
    >
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-7 shadow-xl">
        <h2 id="idle-title" className="font-display text-xl text-ink">
          Still there?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-caption">
          For security, you&rsquo;ll be signed out after 15 minutes of
          inactivity. Time remaining:{" "}
          <span className="font-semibold tabular-nums text-ink">
            {mm}:{ss}
          </span>
        </p>
        <button
          type="button"
          onClick={staySignedIn}
          className="mt-6 w-full rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-3"
        >
          Stay signed in
        </button>
      </div>
    </div>
  );
}
