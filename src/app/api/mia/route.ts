import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import type { MiaAction } from "@/lib/miaTimer";
import { miaAct, miaDay, miaReminderIgnored, PortalError } from "@/lib/store";

const ACTIONS: MiaAction[] = ["start", "pause", "cancel", "help", "break", "breakDone", "late", "helpResume", "finish", "missedCheckin"];

/**
 * The Miacademy timer strip: { subject, action, pin?, demo? } changes one
 * subject's timer; { action: "remindIgnored" } says Miacademy has been open
 * a while with no timer. Answers with today's timers and the server's clock.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { subject?: string; action?: string; pin?: string; demo?: boolean };
  try {
    if (body.action === "remindIgnored") miaReminderIgnored(kid.id);
    else {
      if (typeof body.subject !== "string" || !ACTIONS.includes(body.action as MiaAction))
        return NextResponse.json({ error: "Bad request." }, { status: 400 });
      miaAct(kid.id, body.subject, body.action as MiaAction, {
        pin: typeof body.pin === "string" ? body.pin : undefined,
        // Demo speed is for checking it in the preview, never on the live site.
        demo: body.demo === true && process.env.NODE_ENV !== "production",
      });
    }
    return NextResponse.json({ timers: miaDay(kid.id), serverNow: Date.now() });
  } catch (e) {
    if (e instanceof PortalError) return NextResponse.json({ error: e.message, timers: miaDay(kid.id), serverNow: Date.now() }, { status: 400 });
    throw e;
  }
}
