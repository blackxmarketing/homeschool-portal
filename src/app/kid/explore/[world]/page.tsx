import { notFound, redirect } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { coinsOf, heroOf } from "@/lib/gameState";
import { canVisit, worldView } from "@/lib/explore/state";
import { WORLDS } from "@/lib/explore/worlds";
import ExploreWorld from "@/components/explore/ExploreWorld";

export const dynamic = "force-dynamic";

/** One K-5 world to explore (docs/WORLDS.md). */
export default async function WorldPage({ params }: { params: Promise<{ world: string }> }) {
  const { kid } = await requireKid();
  if (kid.grade > 5) redirect("/kid");
  const hero = heroOf(kid.id);
  if (!hero) redirect("/kid/hero?first=1");
  const v = worldView(kid.id, kid.grade, (await params).world);
  if (!v) notFound();
  return (
    <main className="wrap game-page explore-page" style={{ maxWidth: 1200 }}>
      <ExploreWorld
        world={v.world}
        zones={v.zones}
        map={v.map}
        state={v.state}
        hero={hero}
        coins={coinsOf(kid.id)}
        justUnlocked={v.justUnlocked}
        lanternsLit={v.lanternsLit}
        lanternsTotal={v.lanternsTotal}
        lessonsDone={v.lessonsDone}
        worlds={WORLDS.map((w) => ({ key: w.key, name: w.name, grade: w.grade, open: canVisit(kid.grade, w) }))}
      />
    </main>
  );
}
