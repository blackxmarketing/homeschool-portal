import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireKid } from "@/lib/auth";
import { heroOf, saveHero } from "@/lib/gameState";
import { DEFAULT_HERO, type Hero } from "@/lib/pixel/hero";
import HeroCreator from "@/components/pixel/HeroCreator";

export const dynamic = "force-dynamic";

/** Design (or redesign) your hero. First visit: this is where the adventure starts. */
export default async function HeroPage({ searchParams }: { searchParams: Promise<{ first?: string }> }) {
  const { kid } = await requireKid();
  const current = heroOf(kid.id);
  const first = !current || !!(await searchParams).first;

  async function save(hero: Hero) {
    "use server";
    const { kid } = await requireKid();
    saveHero(kid.id, hero);
    revalidatePath("/kid", "layout");
    redirect("/kid");
  }

  return (
    <main className="wrap game-page" style={{ maxWidth: 1100 }}>
      <div className="game-title-row">
        <h1 className="pixel-title">{first ? "Create your Lightkeeper" : "Your hero"}</h1>
        {!first && (
          <Link href="/kid" className="kbtn ghost small-btn">
            ← World
          </Link>
        )}
      </div>
      {first && (
        <p className="game-intro">
          The world of Lumina has gone dark. Every land lost its light. You are a Lightkeeper: master quests to relight the beacons and bring
          each land back to life. First, who are you?
        </p>
      )}
      <HeroCreator initial={current ?? DEFAULT_HERO} owned={{ hats: [], pets: [] }} save={save} first={first} />
    </main>
  );
}
