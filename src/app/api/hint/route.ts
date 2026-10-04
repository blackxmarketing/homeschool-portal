import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { tutorHint } from "@/lib/ai";
import { PortalError, takeHint } from "@/lib/store";

export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { questionId?: string };
  if (!body.questionId) return NextResponse.json({ error: "Missing question." }, { status: 400 });
  try {
    const { question, skillTitle, grade } = takeHint(kid.id, body.questionId);
    return NextResponse.json({ hint: await tutorHint(question, skillTitle, grade) });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
