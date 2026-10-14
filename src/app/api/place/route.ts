import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { saveGamePlacement } from "@/lib/gameState";
import { placeFrom } from "@/lib/minigames/chompers";

/**
 * A finished placement assessment: POST { seed, picks }.
 *
 * The browser is sent the questions with the answers stripped out, so it
 * cannot know which squares fit; it sends back which ones were tapped, and
 * the server rebuilds the same questions from the seed and marks them. The
 * seed travelling both ways gives nothing away - the answers are never in it,
 * only in the rules, which live here.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as { seed?: unknown; picks?: unknown };

  const n = Number(b.seed);
  const seed = Number.isFinite(n) ? Math.abs(Math.trunc(n)) % 2147483647 : 0;
  const picks = Array.isArray(b.picks)
    ? b.picks.slice(0, 20).map((row) => (Array.isArray(row) ? row.slice(0, 12).map((v) => Math.trunc(Number(v))).filter((v) => Number.isFinite(v)) : []))
    : [];

  const result = placeFrom(seed, picks);
  saveGamePlacement(kid.id, "chompers", result.rung);
  return NextResponse.json(result);
}
