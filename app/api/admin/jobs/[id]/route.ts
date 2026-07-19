import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getStore } from "@/lib/store";
import { validateJobInput } from "@/lib/jobs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  // Status-only updates (publish/unpublish/close) skip full validation.
  const keys = Object.keys(raw);
  if (keys.length === 1 && keys[0] === "status") {
    const status = String(raw.status);
    if (!["draft", "published", "closed"].includes(status)) {
      return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 422 });
    }
    const store = await getStore();
    const job = await store.updateJob(id, { status: status as "draft" | "published" | "closed" });
    if (!job) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true, job });
  }

  const { data, errors } = validateJobInput(raw);
  if (!data) return NextResponse.json({ ok: false, errors }, { status: 422 });
  const store = await getStore();
  const job = await store.updateJob(id, data);
  if (!job) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, job });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const store = await getStore();
  const job = await store.getJob(id);
  if (!job) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, job });
}
