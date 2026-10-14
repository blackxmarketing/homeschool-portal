"use client";

import { useState } from "react";
import { GAME_UI } from "./registry";
import { gameById, type MiniLevel } from "@/lib/minigames";
import type { Hero, PetId } from "@/lib/pixel/hero";

/** Picks a level, runs the game, and sends the result to the server to be scored. */
export default function GameHost({
  game,
  levels,
  progress,
  unlockAt = 1,
  openTo = 0,
  pet,
  hero,
  canAsk,
}: {
  game: string;
  levels: MiniLevel[];
  progress: Record<string, { stars: number; best: number | null; plays: number }>;
  /** Stars needed on a level before the next one opens. */
  unlockAt?: number;
  /** Levels up to here are open already, because an assessment said so. */
  openTo?: number;
  /** The kid's pet, for games that let them play as it. */
  pet?: PetId;
  /** The kid's whole character, for games they run around in themselves. */
  hero?: Hero;
  /** Whether the AI coach can take questions. */
  canAsk?: boolean;
}) {
  const [stars, setStars] = useState(progress);
  const [playing, setPlaying] = useState<string | null>(null);
  const [round, setRound] = useState(0);

  async function finish(levelId: string, moves: unknown) {
    const res = await fetch("/api/play", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ game, level: levelId, moves }) });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error ?? "Couldn't save the game.");
    setStars((s) => ({ ...s, [levelId]: { stars: d.stars, best: d.best, plays: (s[levelId]?.plays ?? 0) + 1 } }));
    return { stars: d.earned as number, xp: d.xp as number, score: d.score as number | undefined };
  }

  if (playing) {
    const idx = levels.findIndex((l) => l.id === playing);
    const next = levels[idx + 1];
    return (
      <div className="game-host">
        <div className="btnrow">
          <button className="kbtn ghost small-btn" onClick={() => setPlaying(null)}>
            ← Levels
          </button>
          <button className="kbtn ghost small-btn" onClick={() => setRound((r) => r + 1)}>
            ↺ Play again
          </button>
          {next && (stars[playing]?.stars ?? 0) > 0 && (
            <button className="kbtn small-btn" onClick={() => setPlaying(next.id)}>
              Next level ▶
            </button>
          )}
        </div>
        {!gameById(game)?.ownIntro && <p className="game-intro">{levels[idx]?.intro}</p>}
        {GAME_UI[game] && (() => {
          const Screen = GAME_UI[game];
          return <Screen key={`${playing}-${round}`} levelId={playing} stars={stars[playing]?.stars ?? 0} plays={stars[playing]?.plays ?? 0} pet={pet} hero={hero} canAsk={canAsk} onFinish={(m) => finish(playing, m)} />;
        })()}
      </div>
    );
  }

  return (
    <div className="level-grid">
      {levels.map((l, i) => {
        const s = stars[l.id]?.stars ?? 0;
        // Open because they earned it, or because the assessment put them here.
        const open = i === 0 || i <= openTo || (stars[levels[i - 1].id]?.stars ?? 0) >= unlockAt;
        return (
          <button key={l.id} type="button" className={`level-card ${open ? "" : "locked"}`} disabled={!open} onClick={() => setPlaying(l.id)}>
            <span className="level-num">Level {i + 1}</span>
            <span className="level-title">{l.title}</span>
            <span className="level-stars">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`star ${s >= n ? "lit" : ""}`}>
                  ★
                </span>
              ))}
            </span>
            {!open && <span className="kmuted small">🔒 {unlockAt > 1 ? `Earn ${unlockAt} stars on the level before` : "Earn a star on the level before"}</span>}
            {open && i === openTo && openTo > 0 && s === 0 && <span className="kmuted small">⭐ Start here</span>}
          </button>
        );
      })}
    </div>
  );
}
