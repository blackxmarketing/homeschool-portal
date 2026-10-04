import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { PortalError, workedExample } from "@/lib/store";

/** A worked example ("watch one first") for a skill. Nothing is recorded. */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { skillId?: string };
  if (!body.skillId) return NextResponse.json({ error: "Missing skill." }, { status: 400 });
  try {
    return NextResponse.json(workedExample(kid.id, body.skillId));
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
