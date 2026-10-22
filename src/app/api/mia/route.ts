import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import type { MiaAction } from "@/lib/miaTimer";
import { getMiaSettings, miaAct, miaDay, miaReminderIgnored, miaVocabDone, PortalError } from "@/lib/store";
import { miaBoard } from "@/lib/miaSync";

const ACTIONS: MiaAction[] = ["start", "pause", "cancel", "help", "break", "breakDone", "late", "helpResume", "finish", "overtime", "missedCheckin", "supplies"];

/** Everything the timer strip needs to draw itself (the Chrome extension loads it this way). */
export async function GET(req: Request) {
  const kid = await kidFromRequest(req);
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  return NextResponse.json({
    kidName: kid.name,
    settings: getMiaSettings(kid.id),
    timers: miaDay(kid.id),
    ...miaBoard(kid.id),
    serverNow: Date.now(),
  });
}

/**
 * The Miacademy timer strip:
 *   { subject, action, pin?, demo? } changes one subject's timer;
 *   { action: "remindIgnored" } says Miacademy has been open a while with no timer;
 *   { action: "vocabDone" } says today's Vocabulary is finished (the core classes can start);
 *   { action: "sync" } just asks for the latest (a parent may have restarted a timer).
 * Answers with today's timers, the settings and the server's clock.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest(req);
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as {
    subject?: string;
    action?: string;
    pin?: string;
    demo?: boolean;
    lessonId?: number;
    itemId?: string;
    skip?: boolean;
  };
  const reply = (extra: object = {}, status = 200) =>
    NextResponse.json(
      { ...extra, timers: miaDay(kid.id), settings: getMiaSettings(kid.id), ...miaBoard(kid.id), serverNow: Date.now() },
      { status },
    );
  try {
    if (body.action === "sync") return reply();
    if (body.action === "vocabDone") {
      miaVocabDone(kid.id);
      return reply();
    }
    if (body.action === "remindIgnored") {
      miaReminderIgnored(kid.id);
      return reply();
    }
    if (typeof body.subject !== "string" || !ACTIONS.includes(body.action as MiaAction))
      return NextResponse.json({ error: "Bad request." }, { status: 400 });
    miaAct(kid.id, body.subject, body.action as MiaAction, {
      pin: typeof body.pin === "string" ? body.pin : undefined,
      lessonId: typeof body.lessonId === "number" ? body.lessonId : undefined,
      itemId: typeof body.itemId === "string" ? body.itemId : undefined,
      skip: body.skip === true,
      // Demo speed is for checking it in the preview, never on the live site.
      demo: body.demo === true && process.env.NODE_ENV !== "production",
    });
    return reply();
  } catch (e) {
    if (e instanceof PortalError) return reply({ error: e.message }, 400);
    throw e;
  }
}
