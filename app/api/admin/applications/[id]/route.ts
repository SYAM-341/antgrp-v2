import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getStore } from "@/lib/store";

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
  let raw: { status?: string };
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const status = String(raw.status ?? "");
  if (!["new", "reviewed", "contacted", "rejected"].includes(status)) {
    return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 422 });
  }
  const store = await getStore();
  const app = await store.updateApplicationStatus(
    id,
    status as "new" | "reviewed" | "contacted" | "rejected",
  );
  if (!app) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, application: app });
}
