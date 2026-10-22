import { NextResponse } from "next/server";
import { bearerToken } from "@/lib/auth";
import { parsePlanWeek } from "@/lib/miaPlan";
import { familyFromParentToken, miaSavePlan } from "@/lib/store";

/**
 * Focus Buddy's parent mode sends a child's Miacademy calendar:
 *   { child: { id, name }, weeks: [ <CalendarController/GetInitialWeeklyData answer>, ... ] }
 * Only a connected parent computer can send it.
 */
export async function POST(req: Request) {
  const family = familyFromParentToken(bearerToken(req) ?? "");
  if (family === null) return NextResponse.json({ error: "Connect this computer as a parent first." }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { child?: { id?: unknown; name?: unknown }; weeks?: unknown };
  const id = typeof body.child?.id === "string" && /^[0-9a-f-]{36}$/i.test(body.child.id) ? body.child.id : null;
  const name = typeof body.child?.name === "string" ? body.child.name.trim() : "";
  if (!id || !name || !Array.isArray(body.weeks) || body.weeks.length > 6) return NextResponse.json({ error: "Bad request." }, { status: 400 });
  const r = miaSavePlan(family, { id, name }, body.weeks.map(parsePlanWeek));
  return NextResponse.json({ ok: true, matched: r.kidId !== null, tasks: r.tasks });
}
