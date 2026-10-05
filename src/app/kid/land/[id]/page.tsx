import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireKid } from "@/lib/auth";
import { coinsOf, heroOf, landQuests, miniGameProgress, worldProgress } from "@/lib/gameState";
import { gamesForLand } from "@/lib/minigames";
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
  const band = bandFor(kid.grade);
  const games = gamesForLand(L.id as LandId).map((g) => {
    const levels = g.levels(band);
    const prog = miniGameProgress(kid.id, g.id);
    return { ...g, stars: levels.reduce((t, l) => t + (prog[l.id]?.stars ?? 0), 0), max: levels.length * 3 };
  });

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
      <LandScreen band={band} landId={L.id as LandId} quests={quests} hero={hero} />
      {games.length > 0 && (
        <section className="side-quests">
          <h2 className="pixel-title small">Side quests</h2>
          <div className="sq-list">
            {games.map((g) => (
              <Link key={g.id} href={`/kid/play/${g.id}`} className="sq-card">
                <span className="sq-icon">{g.icon}</span>
                <span className="sq-text">
                  <strong>{g.title}</strong>
                  <span className="kmuted small">{g.blurb}</span>
                </span>
                <span className="sq-stars">★ {g.stars}/{g.max}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
