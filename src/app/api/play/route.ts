import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { gameById, levelsKidMayPlay } from "@/lib/minigames";
import { addGameCoins, gameCoins, recordMiniGame } from "@/lib/gameState";
import { logLearningEvent, recordEvidence } from "@/lib/store";

/**
 * A finished mini-game: POST { game, level, moves }. The server replays the
 * moves to score it, saves the best result and awards XP for new stars.
 * Only levels for the kid's own grade (or grade band) count.
 *
 * A game that drills a curriculum skill also reports what it saw, which goes
 * into the same mastery meter the lessons feed - read from the replayed moves
 * here on the server, never from anything the browser claims.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as { game?: string; level?: string; moves?: unknown };
  const game = gameById(String(b.game ?? ""));
  if (!game) return NextResponse.json({ error: "Unknown game." }, { status: 400 });
  const level = String(b.level ?? "");
  if (!levelsKidMayPlay(game, kid.grade).some((l) => l.id === level)) return NextResponse.json({ error: "Unknown level." }, { status: 400 });
  // What they walked in carrying, for the games where that matters. It comes
  // from here, not from the browser, so the monster cannot be paid in coins
  // nobody earned.
  const saved = game.coins ? gameCoins(kid.id, game.id) : 0;
  const scored = game.score(level, b.moves, saved);
  if (!scored) return NextResponse.json({ error: "Unknown level." }, { status: 400 });
  const coins = game.coins ? addGameCoins(kid.id, game.id, game.coins(level, b.moves, saved)) : undefined;
  for (const e of game.evidence?.(level, b.moves) ?? []) {
    // The meter first: it reads past events to fill itself in, so logging
    // before recording would count this answer twice.
    recordEvidence(kid.id, e.subject, e);
    logLearningEvent(kid.id, { subject: e.subject, concept: e.concept, firstTry: e.firstTry, score: e.correct ? 1 : 0, ms: e.ms, expectedMs: e.expectedMs, helped: e.rung > 0, source: "game" });
  }
  return NextResponse.json({ ...recordMiniGame(kid.id, game.id, level, scored.stars, scored.best), earned: scored.stars, score: scored.best, ...(coins !== undefined && { coins }) });
}
