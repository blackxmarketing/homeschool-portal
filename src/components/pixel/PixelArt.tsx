"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Grid } from "@/lib/pixel/grid";
import { heroGrid, petGrid, type Hero } from "@/lib/pixel/hero";
import { render, TILE, type Band, type TileMap } from "@/lib/pixel/world";

/** A sprite as crisp SVG (scales without blurring). */
export function PixelSprite({ grid, scale = 4, className, title }: { grid: Grid; scale?: number; className?: string; title?: string }) {
  const runs = useMemo(() => grid.runs(), [grid]);
  return (
    <svg
      className={`pixel ${className ?? ""}`}
      width={grid.w * scale}
      height={grid.h * scale}
      viewBox={`0 0 ${grid.w} ${grid.h}`}
      shapeRendering="crispEdges"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {runs.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
      ))}
    </svg>
  );
}

/** The kid's hero (and pet), with a little walk cycle while moving. */
export function HeroSprite({ hero, walking = false, scale = 4, bounce = true }: { hero: Hero; walking?: boolean; scale?: number; bounce?: boolean }) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    if (!walking && !bounce) return;
    const t = setInterval(() => setFrame((f) => 1 - f), walking ? 180 : 700);
    return () => clearInterval(t);
  }, [walking, bounce]);
  const body = useMemo(() => [heroGrid(hero, 0), heroGrid(hero, 1)], [hero]);
  const pet = useMemo(() => [petGrid(hero.pet, 0), petGrid(hero.pet, 1)], [hero.pet]);
  return (
    <span className="hero-sprite">
      <PixelSprite grid={body[walking ? frame : 0]} scale={scale} title="Your hero" />
      {pet[0] && <PixelSprite grid={pet[frame]!} scale={scale} className="hero-pet" />}
    </span>
  );
}

/**
 * A tile map on a canvas, pixel-perfect and scaled to fit. Water and flames
 * shimmer between two frames (drawn once, then reused).
 */
export function MapCanvas({ map, band, lit, children, label }: { map: TileMap; band: Band; lit: (tx: number, ty: number) => boolean; children?: React.ReactNode; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const frames = useMemo(() => [render(map, band, lit, 0), render(map, band, lit, 1)], [map, band, lit]);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setFrame((f) => 1 - f), 650);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.putImageData(new ImageData(new Uint8ClampedArray(frames[frame]), map.w * TILE, map.h * TILE), 0, 0);
  }, [frames, frame, map]);
  return (
    <div className="map-wrap" style={{ aspectRatio: `${map.w} / ${map.h}` }}>
      <canvas ref={ref} width={map.w * TILE} height={map.h * TILE} className="map-canvas" role="img" aria-label={label} />
      <div className="map-layer">{children}</div>
    </div>
  );
}

/** Position on the map as percentages, for things placed over the canvas. */
export const pctPos = (map: TileMap, px: number, py: number) => ({ left: `${(px / (map.w * TILE)) * 100}%`, top: `${(py / (map.h * TILE)) * 100}%` });
