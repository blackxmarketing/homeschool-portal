import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { saveGamePlacement } from "@/lib/gameState";
import { gameById } from "@/lib/minigames";
import { placeFor } from "@/lib/minigames/placement";

/**
 * A finished placement assessment: POST { game, seed, picks }.
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
  const b = (await req.json().catch(() => ({}))) as { game?: unknown; seed?: unknown; picks?: unknown };
  // Older saves did not name the game, and the only one that had a check was
  // the chompers ladder.
  const game = gameById(String(b.game ?? "chompers"));
  if (!game || game.placement !== true) return NextResponse.json({ error: "That game has no placement check." }, { status: 400 });

  const n = Number(b.seed);
  const seed = Number.isFinite(n) ? Math.abs(Math.trunc(n)) % 2147483647 : 0;
  // Every answer is marked on this side: the browser sends what was tapped
  // or typed and nothing else.
  const result = placeFor(game.id, seed, b.picks);
  if (!result) return NextResponse.json({ error: "That game has no placement check." }, { status: 400 });
  saveGamePlacement(kid.id, game.id, result.rung);
  return NextResponse.json(result);
}
