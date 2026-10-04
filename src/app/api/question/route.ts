import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { CapReachedError, issueQuestion, masteredPrereqs, PortalError, skillProgress, placementStatus, type Mode } from "@/lib/store";

const MODES: Mode[] = ["learn", "review", "placement"];

export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { mode?: Mode; skillId?: string };
  if (!body.mode || !MODES.includes(body.mode)) return NextResponse.json({ error: "Bad mode." }, { status: 400 });
  try {
    const q = issueQuestion(kid.id, body.mode, body.skillId);
    const progress =
      body.mode === "placement"
        ? placementStatus(kid.id)
        : { ...skillProgress(kid.id, q.skillId), backTo: body.mode === "learn" ? masteredPrereqs(kid.id, q.skillId) : [] };
    return NextResponse.json({ question: q, progress });
  } catch (e) {
    if (e instanceof CapReachedError) return NextResponse.json({ error: e.message, capReached: true }, { status: 400 });
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
