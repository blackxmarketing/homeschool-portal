import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { finishBlock, PortalError } from "@/lib/store";

/** A kid finished a guided block of the 2-hour day: { blockId, minutes, note }. */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { blockId?: string; minutes?: number; note?: string };
  if (!body.blockId || typeof body.minutes !== "number") return NextResponse.json({ error: "Bad request." }, { status: 400 });
  try {
    finishBlock(kid.id, body.blockId, body.minutes, typeof body.note === "string" ? body.note : "");
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
