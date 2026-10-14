import Link from "next/link";
import { notFound } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { gameById, levelsForKid } from "@/lib/minigames";
import { gamePlacement, heroOf, miniGameProgress } from "@/lib/gameState";
import { placementQuestions, publicPlacement } from "@/lib/minigames/chompers";
import { bandFor, landById } from "@/lib/pixel/world";
import { canVisit } from "@/lib/explore/state";
import { worldByKey, worldForGrade } from "@/lib/explore/worlds";
import PlayArea from "@/components/minigames/PlayArea";

export const dynamic = "force-dynamic";

/**
 * A story mini-game: the levels for the kid's grade (or grade band), best
 * stars, and the game itself. Grades K-5 come from a world's arcade
 * (?world=k...) and can replay the levels of earlier worlds.
 *
 * A drill game's ladder starts at the very bottom for everyone. Grades K-5
 * belong there; grade 6 and up answer a handful of questions first so they
 * start where their facts run out instead of counting dots.
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
  // Only the drill ladder has an assessment, and only for the older kids.
  const sits = game.unlockAt === 3 && kid.grade >= 6;
  const placedAt = sits ? gamePlacement(kid.id, game.id) : 0;
  const seed = Math.floor(Math.random() * 2147483647);
  const placement = sits && placedAt === null ? { seed, questions: publicPlacement(placementQuestions(seed)) } : null;
  // The kid steers their own pet, so changing it in the hero creator changes
  // what they are playing as here.
  const pet = heroOf(kid.id)?.pet ?? "none";
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
      <PlayArea
        game={game.id}
        levels={levels.map(({ id, title, intro }) => ({ id, title, intro }))}
        progress={miniGameProgress(kid.id, game.id)}
        unlockAt={game.unlockAt}
        placedAt={placedAt}
        placement={placement}
        pet={pet}
      />
    </main>
  );
}
