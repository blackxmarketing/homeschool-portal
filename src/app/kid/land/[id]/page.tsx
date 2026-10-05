import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { coinsOf, heroOf, landQuests, worldProgress } from "@/lib/gameState";
import { bandFor, landById, type LandId } from "@/lib/pixel/world";
import LandScreen from "@/components/pixel/LandScreen";

export const dynamic = "force-dynamic";

export default async function LandPage({ params }: { params: Promise<{ id: string }> }) {
  const { kid } = await requireKid();
  const { id } = await params;
  const L = landById(id);
  if (!L || L.id === "village") notFound();
  const hero = heroOf(kid.id);
  if (!hero) redirect("/kid/hero?first=1");
  const quests = landQuests(kid.id, L.id as LandId);
  const pct = Math.round((worldProgress(kid.id)[L.id] ?? 0) * 100);

  return (
    <main className="wrap game-page" style={{ maxWidth: 1240 }}>
      <div className="game-title-row">
        <Link href="/kid" className="kbtn ghost small-btn">
          ← World map
        </Link>
        <div className="game-land-head" style={{ ["--l-hue" as string]: L.hue }}>
          <h1 className="pixel-title">{L.name}</h1>
          <div className="kmuted small">{L.blurb}</div>
        </div>
        <div className="game-chips">
          <span className="chip">✦ {pct}% restored</span>
          <span className="chip">🪙 {coinsOf(kid.id)}</span>
        </div>
      </div>
      <LandScreen band={bandFor(kid.grade)} landId={L.id as LandId} quests={quests} hero={hero} />
    </main>
  );
}
