import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireKid } from "@/lib/auth";
import { heroOf, saveHero, unlocksOf } from "@/lib/gameState";
import { DEFAULT_HERO, type Hero } from "@/lib/pixel/hero";
import { worldByKey, worldForGrade } from "@/lib/explore/worlds";
import HeroCreator from "@/components/pixel/HeroCreator";

export const dynamic = "force-dynamic";

/** Design (or redesign) your hero. First visit: this is where the adventure starts. */
export default async function HeroPage({ searchParams }: { searchParams: Promise<{ first?: string; world?: string }> }) {
  const { kid } = await requireKid();
  const current = heroOf(kid.id);
  const sp = await searchParams;
  const first = !current || !!sp.first;
  const k5 = kid.grade <= 5;
  // Back to the world they came from (K-5) or to Lumina.
  const back = k5 ? `/kid/explore/${(worldByKey(sp.world ?? "") ?? worldForGrade(kid.grade)).key}` : "/kid";

  async function save(hero: Hero) {
    "use server";
    const { kid } = await requireKid();
    saveHero(kid.id, hero);
    revalidatePath("/kid", "layout");
    redirect(back);
  }

  const unlocks = [...unlocksOf(kid.id)];
  return (
    <main className="wrap game-page" style={{ maxWidth: 1100 }}>
      <div className="game-title-row">
        <h1 className="pixel-title">{first ? "Create your Lightkeeper" : "Your hero"}</h1>
        {!first && (
          <Link href={back} className="kbtn ghost small-btn">
            ← World
          </Link>
        )}
      </div>
      {first && (
        <p className="game-intro">
          {k5
            ? "A little firefly named Pip needs a helper. The lanterns of the worlds are going dark, and you can light them again by learning. First, who are you?"
            : "The world of Lumina has gone dark. Every land lost its light. You are a Lightkeeper: master quests to relight the beacons and bring each land back to life. First, who are you?"}
        </p>
      )}
      {!first && k5 && <p className="kmuted">New colors, hair, hats and pets unlock as you explore. Find treasure chests, sparks and side quests, and light lanterns!</p>}
      <HeroCreator initial={current ?? DEFAULT_HERO} unlocks={unlocks} worldItems={k5 || unlocks.length > 0} save={save} first={first} />
    </main>
  );
}
