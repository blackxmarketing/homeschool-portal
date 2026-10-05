"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSprite, MapCanvas, pctPos } from "./PixelArt";
import type { Hero } from "@/lib/pixel/hero";
import { LANDS, litFor, TILE, worldMap, type Band, type LandId } from "@/lib/pixel/world";

/**
 * The world of Lumina. Each land is restored (in color) as its lessons are
 * mastered. Tap a land: the hero walks there and the land opens.
 */
export default function WorldScreen({ band, progress, hero }: { band: Band; progress: Record<LandId, number>; hero: Hero }) {
  const router = useRouter();
  const map = useMemo(() => worldMap(), []);
  const lit = useMemo(() => litFor(map, progress), [map, progress]);
  const village = LANDS[0];
  const home = { x: village.cx * TILE + 18, y: village.cy * TILE + 10 };
  const [pos, setPos] = useState(home);
  const [walking, setWalking] = useState(false);

  const go = (id: LandId) => {
    const L = LANDS.find((l) => l.id === id)!;
    setWalking(true);
    setPos({ x: L.cx * TILE, y: (L.cy + 2) * TILE });
    setTimeout(() => router.push(`/kid/land/${id}`), 900);
  };

  return (
    <MapCanvas map={map} band={band} lit={lit} label="The world of Lumina">
      {LANDS.filter((L) => L.id !== "village").map((L) => {
        const p = progress[L.id] ?? 0;
        const dark = p === 0;
        return (
          <button
            key={L.id}
            type="button"
            className={`land-flag ${dark ? "dark" : ""}`}
            style={{ ...pctPos(map, L.cx * TILE, Math.max(4.5, L.cy - L.r * 0.55) * TILE), ["--l-hue" as string]: L.hue }}
            onClick={() => go(L.id)}
            disabled={walking}
          >
            <span className="land-flag-name">{L.name}</span>
            <span className="land-flag-bar" aria-label={`${Math.round(p * 100)}% restored`}>
              <span style={{ width: `${Math.max(4, p * 100)}%` }} />
            </span>
            {dark && <span className="land-flag-dark">Still dark: bring back the light!</span>}
          </button>
        );
      })}
      <div className={`map-hero ${walking ? "walking" : ""}`} style={pctPos(map, pos.x, pos.y)}>
        <HeroSprite hero={hero} walking={walking} scale={3} />
      </div>
    </MapCanvas>
  );
}
