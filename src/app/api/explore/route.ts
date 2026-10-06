import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { exploreAction, type ExploreAction } from "@/lib/explore/state";

/**
 * Something a kid did in a K-5 world: POST { world, action, ... }.
 * The server checks it against the map and the kid's progress before saving
 * it or giving any reward.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const world = String(b.world ?? "");
  let a: ExploreAction;
  switch (b.action) {
    case "move":
      a = { action: "move", x: Number(b.x), y: Number(b.y) };
      break;
    case "pick":
    case "open":
      a = { action: b.action, id: String(b.id ?? "") };
      break;
    case "quest":
    case "intro":
    case "outro":
      a = { action: b.action };
      break;
    default:
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  }
  const r = exploreAction(kid.id, kid.grade, world, a);
  return NextResponse.json(r, { status: r.ok ? 200 : 400 });
}
