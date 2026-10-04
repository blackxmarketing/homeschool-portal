import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { PortalError, submitAnswer } from "@/lib/store";

export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { questionId?: string; answer?: string };
  if (!body.questionId || typeof body.answer !== "string") {
    return NextResponse.json({ error: "Missing answer." }, { status: 400 });
  }
  try {
    return NextResponse.json(submitAnswer(kid.id, body.questionId, body.answer));
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
