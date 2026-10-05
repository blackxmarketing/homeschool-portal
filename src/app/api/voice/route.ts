import { NextResponse } from "next/server";
import { currentSession } from "@/lib/auth";
import { features } from "@/lib/content";
import { speakText, ttsEnabled } from "@/lib/tts";

/**
 * The teacher's natural voice for one piece of text:
 *   POST { text, kind: "male" | "female" } -> { id, starts } or { off: true }
 * The audio itself comes from GET /api/voice/<id>.
 */
export async function POST(req: Request) {
  if (!(await currentSession())) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  if (!ttsEnabled() || !features().readAloud) return NextResponse.json({ off: true });
  const b = (await req.json().catch(() => ({}))) as { text?: unknown; kind?: unknown };
  const text = typeof b.text === "string" ? b.text : "";
  const kind = b.kind === "male" ? "male" : "female";
  const spoken = await speakText(text, kind);
  return NextResponse.json(spoken ?? { off: true });
}

/** Lets the browser know whether natural voices are on (without making any audio). */
export async function GET() {
  return NextResponse.json({ on: ttsEnabled() });
}
