import Link from "next/link";
import { notFound } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { gameById } from "@/lib/minigames";
import { miniGameProgress } from "@/lib/gameState";
import { bandFor, landById } from "@/lib/pixel/world";
import GameHost from "@/components/minigames/GameHost";

export const dynamic = "force-dynamic";

/** A story mini-game: levels for the kid's grade band, best stars, and the game itself. */
export default async function PlayPage({ params }: { params: Promise<{ game: string }> }) {
  const { kid } = await requireKid();
  const game = gameById((await params).game);
  if (!game) notFound();
  const band = bandFor(kid.grade);
  const land = landById(game.land)!;
  return (
    <main className={`wrap game-page band-${band}`} style={{ maxWidth: 1000 }}>
      <div className="game-title-row">
        <Link href={`/kid/land/${land.id}`} className="kbtn ghost small-btn">
          ← {land.name}
        </Link>
        <div className="game-land-head" style={{ ["--l-hue" as string]: land.hue }}>
          <h1 className="pixel-title">
            {game.icon} {game.title}
          </h1>
          <div className="kmuted small">{game.blurb}</div>
        </div>
      </div>
      <GameHost game={game.id} levels={game.levels(band).map(({ id, title, intro }) => ({ id, title, intro }))} progress={miniGameProgress(kid.id, game.id)} />
    </main>
  );
}
