import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { PortalError, saveDrill } from "@/lib/store";

/** Saves a math-fact speed drill: { op, correct, wrong, seconds }. */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as { op?: string; correct?: number; wrong?: number; seconds?: number };
  if (typeof b.op !== "string" || ![b.correct, b.wrong, b.seconds].every((n) => Number.isInteger(n))) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  try {
    saveDrill(kid.id, b.op, b.correct!, b.wrong!, b.seconds!);
    return NextResponse.json({ ok: true });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
