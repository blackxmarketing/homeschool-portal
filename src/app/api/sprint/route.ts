import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { recordSprint } from "@/lib/store";

/** Called when a focus sprint's timer runs out. */
export async function POST() {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  recordSprint(kid.id);
  return NextResponse.json({ ok: true });
}
