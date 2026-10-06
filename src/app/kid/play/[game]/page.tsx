import Link from "next/link";
import { notFound } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { gameById, levelsForKid } from "@/lib/minigames";
import { miniGameProgress } from "@/lib/gameState";
import { bandFor, landById } from "@/lib/pixel/world";
import { canVisit } from "@/lib/explore/state";
import { worldByKey, worldForGrade } from "@/lib/explore/worlds";
import GameHost from "@/components/minigames/GameHost";

export const dynamic = "force-dynamic";

/**
 * A story mini-game: the levels for the kid's grade (or grade band), best
 * stars, and the game itself. Grades K-5 come from a world's arcade
 * (?world=k...) and can replay the levels of earlier worlds.
 */
export default async function PlayPage({ params, searchParams }: { params: Promise<{ game: string }>; searchParams: Promise<{ world?: string }> }) {
  const { kid } = await requireKid();
  const game = gameById((await params).game);
  if (!game) notFound();
  const band = bandFor(kid.grade);
  const k5 = kid.grade <= 5;
  const asked = worldByKey((await searchParams).world ?? "");
  const world = k5 ? (asked && canVisit(kid.grade, asked) ? asked : worldForGrade(kid.grade)) : null;
  const levels = levelsForKid(game, world ? world.grade : kid.grade);
  if (!levels.length) notFound();
  const land = landById(game.land)!;
  return (
    <main className={`wrap game-page band-${band}`} style={{ maxWidth: 1000 }}>
      <div className="game-title-row">
        <Link href={world ? `/kid/explore/${world.key}` : `/kid/land/${land.id}`} className="kbtn ghost small-btn">
          ← {world ? world.name : land.name}
        </Link>
        <div className="game-land-head" style={{ ["--l-hue" as string]: land.hue }}>
          <h1 className="pixel-title">
            {game.icon} {game.title}
          </h1>
          <div className="kmuted small">{game.blurb}</div>
        </div>
      </div>
      <GameHost game={game.id} levels={levels.map(({ id, title, intro }) => ({ id, title, intro }))} progress={miniGameProgress(kid.id, game.id)} />
    </main>
  );
}
