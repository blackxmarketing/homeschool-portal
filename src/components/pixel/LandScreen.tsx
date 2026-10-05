"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HeroSprite, MapCanvas, pctPos } from "./PixelArt";
import type { Hero } from "@/lib/pixel/hero";
import { landById, landMap, TILE, type Band, type LandId } from "@/lib/pixel/world";
import type { Quest } from "@/lib/gameState";

const STATUS: Record<Quest["status"], string> = { done: "Beacon lit", open: "Ready", waiting: "Waiting for a parent", locked: "Locked" };

/**
 * One land up close: a road with a beacon for each quest. Lit beacons are
 * finished quests; the hero stands at the next one. Tap a beacon to see the
 * quest and its objectives.
 */
export default function LandScreen({ band, landId, quests, hero }: { band: Band; landId: LandId; quests: Quest[]; hero: Hero }) {
  const L = landById(landId)!;
  const lit = useMemo(() => quests.map((q) => q.status === "done"), [quests]);
  const map = useMemo(() => landMap(L, quests.length, lit), [L, quests.length, lit]);
  const current = Math.max(0, quests.findIndex((q) => q.status === "open" || q.status === "waiting"));
  const [picked, setPicked] = useState(current);
  // The road ahead of the current quest is still dark.
  const reach = map.nodes[Math.min(current, map.nodes.length - 1)]?.x ?? 0;
  const litTiles = useMemo(() => (tx: number) => quests.every((q) => q.status === "done") || tx * TILE <= reach + 28, [quests, reach]);
  const q = quests[picked];
  const heroAt = map.nodes[current] ?? map.nodes[0];

  return (
    <div className="land-screen">
      <MapCanvas map={map} band={band} lit={litTiles} label={`${L.name} map`}>
        {map.nodes.map((n, i) => (
          <button
            key={i}
            type="button"
            className={`quest-node ${quests[i]?.status} ${i === picked ? "picked" : ""}`}
            style={pctPos(map, n.x, n.y - 10)}
            onClick={() => setPicked(i)}
            aria-label={`${quests[i]?.title}: ${STATUS[quests[i]?.status ?? "locked"]}`}
          >
            <span className="quest-node-num">{i + 1}</span>
          </button>
        ))}
        {heroAt && (
          <div className="map-hero" style={pctPos(map, heroAt.x + 14, heroAt.y + 2)}>
            <HeroSprite hero={hero} scale={3} />
          </div>
        )}
      </MapCanvas>

      {q && (
        <aside className={`quest-card ${q.status}`}>
          <div className="quest-card-kind">{q.kind}</div>
          <h2 className="quest-card-title">{q.title}</h2>
          <div className="quest-card-status">{q.status === "done" ? "✦ " : ""}{STATUS[q.status]}</div>
          <ol className="objectives">
            {q.objectives.map((o, i) => (
              <li key={i} className={o.done ? "done" : ""}>
                <span className="obj-box" aria-hidden>{o.done ? "✓" : ""}</span>
                {o.label}
              </li>
            ))}
          </ol>
          {q.href ? (
            <Link href={q.href} className="kbtn big game-btn">
              {q.status === "done" ? "Play again" : q.objectives.some((o) => o.done) ? "Continue quest ▶" : "Start quest ▶"}
            </Link>
          ) : (
            <p className="kmuted small">Light the beacon before this one to unlock it.</p>
          )}
        </aside>
      )}
    </div>
  );
}
