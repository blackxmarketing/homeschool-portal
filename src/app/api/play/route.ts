import { NextResponse } from "next/server";
import { kidFromRequest } from "@/lib/auth";
import { gameById, levelsKidMayPlay } from "@/lib/minigames";
import { recordMiniGame } from "@/lib/gameState";

/**
 * A finished mini-game: POST { game, level, moves }. The server replays the
 * moves to score it, saves the best result and awards XP for new stars.
 * Only levels for the kid's own grade (or grade band) count.
 */
export async function POST(req: Request) {
  const kid = await kidFromRequest();
  if (!kid) return NextResponse.json({ error: "Please log in again." }, { status: 401 });
  const b = (await req.json().catch(() => ({}))) as { game?: string; level?: string; moves?: unknown };
  const game = gameById(String(b.game ?? ""));
  if (!game) return NextResponse.json({ error: "Unknown game." }, { status: 400 });
  const level = String(b.level ?? "");
  if (!levelsKidMayPlay(game, kid.grade).some((l) => l.id === level)) return NextResponse.json({ error: "Unknown level." }, { status: 400 });
  const scored = game.score(level, b.moves);
  if (!scored) return NextResponse.json({ error: "Unknown level." }, { status: 400 });
  return NextResponse.json({ ...recordMiniGame(kid.id, game.id, level, scored.stars, scored.best), earned: scored.stars, score: scored.best });
}
