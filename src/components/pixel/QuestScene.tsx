"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "./PixelArt";
import { hexToRgb, type Grid } from "@/lib/pixel/grid";
import { heroGrid, petGrid, type Hero } from "@/lib/pixel/hero";
import { GROUND_Y, obstacleGrid, OBSTACLE_TEXT, SCENE_H, SCENE_W, sceneBackground, shadeGrid, type Obstacle } from "@/lib/pixel/scene";
import { landById, type Band, type LandId } from "@/lib/pixel/world";

export interface GameInfo {
  land: LandId;
  band: Band;
  hero: Hero;
}

/** The land's scenery on a canvas (drawn once). */
function Backdrop({ land, band }: { land: LandId; band: Band }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const L = landById(land)!;
  const bg = useMemo(() => sceneBackground(L, band), [L, band]);
  useEffect(() => {
    const ctx = ref.current?.getContext("2d");
    if (!ctx) return;
    const img = ctx.createImageData(SCENE_W, SCENE_H);
    bg.px.forEach((c, i) => {
      if (!c) return;
      const [r, g, b] = hexToRgb(c);
      img.data.set([r, g, b, 255], i * 4);
    });
    ctx.putImageData(img, 0, 0);
  }, [bg]);
  return <canvas ref={ref} width={SCENE_W} height={SCENE_H} className="scene-bg" aria-hidden />;
}

/** Places a sprite on the scene by its bottom-left pixel. */
function At({ grid, x, bottom, className, children }: { grid: Grid; x: number; bottom: number; className?: string; children?: React.ReactNode }) {
  return (
    <div
      className={`scene-sprite ${className ?? ""}`}
      style={{ left: `${(x / SCENE_W) * 100}%`, top: `${((bottom - grid.h) / SCENE_H) * 100}%`, width: `${(grid.w / SCENE_W) * 100}%` }}
    >
      <PixelSprite grid={grid} scale={1} className="scene-pixels" />
      {children}
    </div>
  );
}

function useFrame(ms = 600) {
  const [f, setF] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setF((x) => 1 - x), ms);
    return () => clearInterval(t);
  }, [ms]);
  return f;
}

/**
 * A challenge as a game scene: the hero faces an obstacle. A wrong answer
 * makes it shake; solving it plays the win (the gate opens, the bridge
 * appears...). `miss` changes each time there's a wrong answer.
 */
export function QuestScene({
  game,
  obstacle,
  solved,
  miss,
  stars,
  possible,
}: {
  game: GameInfo;
  obstacle: Obstacle;
  solved: boolean;
  miss: number;
  stars: number | null;
  possible: number;
}) {
  const frame = useFrame();
  const body = useMemo(() => [heroGrid(game.hero, 0), heroGrid(game.hero, 1)], [game.hero]);
  const pet = useMemo(() => petGrid(game.hero.pet, 0), [game.hero.pet]);
  const text = OBSTACLE_TEXT[obstacle];
  return (
    <div className={`quest-scene band-${game.band} ${solved ? "won" : ""}`} aria-label={solved ? text.win : text.goal}>
      <Backdrop land={game.land} band={game.band} />
      <At grid={body[solved ? frame : 0]} x={solved ? 70 : 26} bottom={GROUND_Y + 1} className={`scene-hero ${miss ? "flinch" : ""}`} key={`hero-${miss}`} />
      {pet && <At grid={pet} x={solved ? 60 : 14} bottom={GROUND_Y + 1} className="scene-pet" />}
      <At grid={obstacleGrid(obstacle, solved, frame)} x={108} bottom={GROUND_Y + 2} className={`scene-obstacle ${miss && !solved ? "shake" : ""}`} key={`ob-${miss}-${solved}`}>
        {solved && <span className="scene-sparkle" aria-hidden />}
      </At>
      <div className="scene-caption">{solved ? text.win : text.goal}</div>
      <div className="scene-stars" aria-label={stars !== null ? `${stars} of 3 stars` : `Up to ${possible} stars`}>
        {[1, 2, 3].map((n) => (
          <span key={n} className={`star ${(stars ?? possible) >= n ? "lit" : ""} ${stars !== null && stars >= n ? "pop" : ""}`} style={{ animationDelay: `${n * 0.12}s` }}>
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

/** The boss: the land's Shade, with its strength shown as light orbs to win back. */
export function BossScene({ game, hp, maxHp, hit, gone }: { game: GameInfo; hp: number; maxHp: number; hit: number; gone: boolean }) {
  const frame = useFrame(500);
  const L = landById(game.land)!;
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (!hit) return;
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 450);
    return () => clearTimeout(t);
  }, [hit]);
  const hero = useMemo(() => heroGrid(game.hero, 0), [game.hero]);
  return (
    <div className={`quest-scene boss band-${game.band}`} aria-label={gone ? `The ${L.name} Shade turned back into light!` : `The ${L.name} Shade`}>
      <Backdrop land={game.land} band={game.band} />
      <At grid={hero} x={30} bottom={GROUND_Y + 1} className={`scene-hero ${flash ? "attack" : ""}`} key={`h-${hit}`} />
      <At grid={shadeGrid(L, gone ? "gone" : flash ? "hit" : "idle", frame)} x={100} bottom={GROUND_Y + 2} className={`scene-boss ${flash ? "shake" : ""}`} key={`b-${hit}`} />
      <div className="scene-caption">{gone ? "The Shade turns back into light!" : `Boss: the ${L.name} Shade`}</div>
      <div className="boss-hp" aria-label={`${hp} of ${maxHp} light orbs left to win back`}>
        {Array.from({ length: maxHp }, (_, i) => (
          <span key={i} className={i < hp ? "full" : ""} />
        ))}
      </div>
    </div>
  );
}
