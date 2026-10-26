import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { miaBoard } from "@/lib/miaSync";
import { miaAskGrownUp, miaFinishItem, miaSaveForLater, PortalError } from "@/lib/store";

/**
 * The kid finished an activity (after fixing mistakes from the photo check): { lessonId, itemId };
 * or { ..., grownUp: true } when stuck; or { ..., later: true } to save a hands-on activity for later.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest(req);
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { lessonId?: unknown; itemId?: unknown; grownUp?: unknown; later?: unknown };
  if (typeof body.lessonId !== "number" || typeof body.itemId !== "string") return NextResponse.json({ error: "Bad request." }, { status: 400 });
  try {
    if (body.grownUp === true) miaAskGrownUp(kid.id, body.lessonId, body.itemId);
    else if (body.later === true) miaSaveForLater(kid.id, body.lessonId, body.itemId);
    else miaFinishItem(kid.id, body.lessonId, body.itemId);
    return NextResponse.json({ ...miaBoard(kid.id) });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message, ...miaBoard(kid.id) }, { status: 400 });
    throw e;
  }
}
