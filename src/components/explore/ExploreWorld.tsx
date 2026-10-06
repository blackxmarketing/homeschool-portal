"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, SayButton, useAutoRead } from "../voice";
import type { Grid } from "@/lib/pixel/grid";
import { heroGrid, petGrid, type Hero } from "@/lib/pixel/hero";
import { unlockName } from "@/lib/pixel/cosmetics";
import { findPath, footprint, isWalkable, MAP_H, MAP_W, solidTiles, type ExploreMap, type ExploreObject } from "@/lib/explore/map";
import { arcadeGrid, chestGrid, landmarkGrid, gateGrid, homeGrid, itemGrid, lanternGrid, pipGrid, saturate, signGrid, sparkGrid, stoneGrid, THEMES, TILE, tileGrid, wardrobeGrid } from "@/lib/explore/tiles";
import type { WorldDef } from "@/lib/explore/worlds";
import type { ExploreState, ZoneView } from "@/lib/explore/state";
import { K5_SUBJECT_INFO, type K5Subject } from "@/content/courses/k5/base";

/**
 * A K-5 world to walk around in (docs/WORLDS.md). The map is drawn on a
 * canvas; the hero walks with the arrow keys / WASD, the on-screen pad, or by
 * tapping where to go. Walking into something (or tapping it) talks to it:
 * villagers, Pip, lesson stones, arcades, chests and the world gate. Sparks
 * and quest items are picked up by walking over them. Every find is checked
 * by the server before it counts.
 */

export interface WorldLink {
  key: string;
  name: string;
  grade: number;
  open: boolean;
}

interface Props {
  world: WorldDef;
  zones: ZoneView[];
  map: ExploreMap;
  state: ExploreState;
  hero: Hero;
  coins: number;
  justUnlocked: string[];
  lanternsLit: number;
  lanternsTotal: number;
  lessonsDone: number;
  worlds: WorldLink[];
}

type Toast = { id: number; text: string; grid?: Grid };

const SPEED = 6.5; // tiles per second
const DIRS: Record<string, [number, number]> = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  w: [0, -1],
  s: [0, 1],
  a: [-1, 0],
  d: [1, 0],
};

const at = (x: number, y: number) => y * MAP_W + x;

function toCanvas(g: Grid): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = g.w;
  c.height = g.h;
  const ctx = c.getContext("2d")!;
  for (const r of g.runs()) {
    ctx.fillStyle = r.c;
    ctx.fillRect(r.x, r.y, r.w, 1);
  }
  return c;
}

/** A sprite to show for an unlock in a toast. */
function unlockGrid(id: string, hero: Hero): Grid {
  const [kind, v] = id.split(":");
  if (kind === "pet") return petGrid(v as Hero["pet"]) ?? heroGrid(hero);
  if (kind === "hat") return heroGrid({ ...hero, hat: v as Hero["hat"], pet: "none" });
  if (kind === "hair") return heroGrid({ ...hero, hair: v as Hero["hair"], hat: "none", pet: "none" });
  if (kind === "hairColor") return heroGrid({ ...hero, hairColor: Number(v), hat: "none", pet: "none" });
  return heroGrid({ ...hero, outfit: Number(v), pet: "none" });
}

export default function ExploreWorld(props: Props) {
  const { world, zones, map, hero } = props;
  const theme = world.theme;
  const young = world.grade <= 2;
  const zoneBy = useMemo(() => Object.fromEntries(zones.map((z) => [z.subject, z])) as Record<K5Subject, ZoneView>, [zones]);

  // ---------- Saved progress (updated as the server confirms things) ----------
  const [found, setFound] = useState(() => new Set(props.state.found));
  const [opened, setOpened] = useState(() => new Set(props.state.opened));
  const [questDone, setQuestDone] = useState(props.state.questDone);
  const [coins, setCoins] = useState(props.coins);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dialog, setDialog] = useState<ExploreObject | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [story, setStory] = useState<{ lines: string[]; i: number; kind: "intro" | "outro" | "help" } | null>(() =>
    !props.state.seenIntro ? { lines: world.intro, i: 0, kind: "intro" } : props.lanternsTotal > 0 && props.lanternsLit === props.lanternsTotal && !props.state.seenOutro ? { lines: world.outro, i: 0, kind: "outro" } : null,
  );

  const toast = useCallback((text: string, grid?: Grid) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text, grid }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const post = useCallback(
    async (body: Record<string, unknown>, keepalive = false) => {
      try {
        const r = await fetch("/api/explore", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ world: world.key, ...body }), keepalive });
        return (await r.json()) as { ok: boolean; error?: string; unlocked?: string[]; coins?: number; message?: string };
      } catch {
        return { ok: false, error: "Couldn't reach the server. Try again." };
      }
    },
    [world.key],
  );

  const celebrate = useCallback(
    (r: { unlocked?: string[]; coins?: number; message?: string }) => {
      if (r.coins) setCoins((c) => c + r.coins!);
      if (r.message) toast(r.message);
      for (const id of r.unlocked ?? []) {
        toast(`New! ${unlockName(id)}. Try it on in the wardrobe.`, unlockGrid(id, hero));
        chime("streak");
      }
    },
    [toast, hero],
  );

  // Lantern rewards earned since last time.
  useEffect(() => {
    props.justUnlocked.forEach((id, i) => setTimeout(() => toast(`New! ${unlockName(id)} for lighting lanterns.`, unlockGrid(id, hero)), 600 + i * 900));
  }, [props.justUnlocked, toast, hero]);

  // ---------- The map: solid things, where the hero is ----------
  const objects = map.objects;
  const solid = useMemo(() => solidTiles(objects), [objects]);
  const objAt = useMemo(() => {
    const m = new Map<number, ExploreObject>();
    for (const o of objects) {
      const cells = footprint(o);
      if (cells.length) for (const [x, y] of cells) m.set(at(x, y), o);
    }
    return m;
  }, [objects]);
  const pickups = useMemo(() => new Map(objects.filter((o) => o.kind === "spark" || o.kind === "item").map((o) => [at(o.x, o.y), o])), [objects]);

  const start = props.state.x !== null && props.state.y !== null && isWalkable(map, solid, props.state.x, props.state.y) ? { x: props.state.x, y: props.state.y } : map.spawn;
  const me = useRef({ x: start.x, y: start.y, fx: start.x, fy: start.y, tx: start.x, ty: start.y, prevX: start.x, prevY: start.y + 1, face: 1, walking: false });
  const path = useRef<{ x: number; y: number }[]>([]);
  const goal = useRef<ExploreObject | null>(null);
  const held = useRef<string | null>(null);
  const lastSaved = useRef(`${start.x},${start.y}`);
  const dialogRef = useRef<ExploreObject | null>(null);
  dialogRef.current = dialog;

  // ---------- What happens when the hero reaches things ----------
  const foundRef = useRef(found);
  foundRef.current = found;
  const arrive = useCallback(
    (x: number, y: number) => {
      const p = pickups.get(at(x, y));
      if (!p || foundRef.current.has(p.id)) return;
      setFound((f) => new Set(f).add(p.id));
      chime("right");
      if (p.kind === "spark") toast("✨ You found a spark!", sparkGrid(1));
      else toast(`You found a ${world.quest.item.name}!`, itemGrid(world.quest.item.sprite));
      post({ action: "pick", id: p.id }).then((r) => (r.ok ? celebrate(r) : null));
    },
    [pickups, toast, post, celebrate, world.quest.item],
  );

  const interact = useCallback((o: ExploreObject) => {
    setDialog(o);
    chime("right");
  }, []);

  /** Walk to a tile (or next to a thing, then talk to it). */
  const walkTo = useCallback(
    (tx: number, ty: number) => {
      const m = me.current;
      const o = objAt.get(at(tx, ty));
      setDialog(null);
      if (o) {
        // Go to the closest open tile next to it.
        const near = footprint(o)
          .flatMap(([x, y]) => [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
          ])
          .filter(([x, y]) => isWalkable(map, solid, x, y));
        let best: { x: number; y: number }[] | null = null;
        for (const [x, y] of near) {
          if (x === m.x && y === m.y) {
            best = [];
            break;
          }
          const p = findPath(map, solid, m.x, m.y, x, y);
          if (p && (!best || p.length < best.length)) best = p;
        }
        if (best) {
          path.current = best;
          goal.current = o;
          if (!best.length) interact(o);
        }
        return;
      }
      const p = findPath(map, solid, m.x, m.y, tx, ty);
      if (p) {
        path.current = p;
        goal.current = null;
      }
    },
    [objAt, map, solid, interact],
  );

  // ---------- Keyboard ----------
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (story) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (DIRS[k] && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        held.current = k;
        path.current = [];
        goal.current = null;
        if (dialogRef.current) setDialog(null);
      }
      if (k === "Escape") setDialog(null);
      if ((k === "Enter" || k === " ") && !dialogRef.current && !(e.target instanceof HTMLButtonElement) && !(e.target instanceof HTMLAnchorElement)) {
        const m = me.current;
        const [dx, dy] = [
          [0, -1],
          [0, 1],
          [-1, 0],
          [1, 0],
        ][m.face === 0 ? 0 : m.face === 1 ? 1 : m.face === 2 ? 2 : 3];
        const o = objAt.get(at(m.x + dx, m.y + dy));
        if (o) {
          e.preventDefault();
          interact(o);
        }
      }
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (held.current === k) held.current = null;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [objAt, interact, story]);

  // ---------- Drawing ----------
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const view = useRef({ scale: 3, w: 600, h: 400, camX: 0, camY: 0 });

  // Ground, drawn once per frame of animation. Zones get their color back as their lessons are done.
  const base = useMemo(() => {
    if (typeof document === "undefined") return null;
    const sat: Record<string, number> = {};
    for (const z of zones) sat[z.subject] = z.off ? 0.3 : z.lit ? 1 : z.lessons.length ? 0.35 + 0.5 * (z.done / z.lessons.length) : 0.35;
    const wild = props.lanternsTotal ? 0.55 + 0.45 * (props.lanternsLit / props.lanternsTotal) : 0.55;
    return [0, 1].map((frame) => {
      const c = document.createElement("canvas");
      c.width = MAP_W * TILE;
      c.height = MAP_H * TILE;
      const ctx = c.getContext("2d")!;
      const img = ctx.createImageData(c.width, c.height);
      for (let ty = 0; ty < MAP_H; ty++)
        for (let tx = 0; tx < MAP_W; tx++) {
          const g = tileGrid(theme, map.tiles[at(tx, ty)], tx, ty, frame);
          const z = map.zoneOf[at(tx, ty)];
          const s = z ? sat[z] : wild;
          for (let y = 0; y < TILE; y++)
            for (let x = 0; x < TILE; x++) {
              const col = g.get(x, y);
              if (!col) continue;
              const [r, gg, b] = saturate(col, s);
              const i = ((ty * TILE + y) * c.width + tx * TILE + x) * 4;
              img.data[i] = r;
              img.data[i + 1] = gg;
              img.data[i + 2] = b;
              img.data[i + 3] = 255;
            }
        }
      ctx.putImageData(img, 0, 0);
      return c;
    });
  }, [map, theme, zones, props.lanternsLit, props.lanternsTotal]);

  const sprites = useMemo(() => {
    if (typeof document === "undefined") return null;
    const cache = new Map<string, HTMLCanvasElement>();
    return (key: string, make: () => Grid) => {
      let c = cache.get(key);
      if (!c) {
        c = toCanvas(make());
        cache.set(key, c);
      }
      return c;
    };
  }, []);

  // The next lesson to suggest: the least-finished zone that has one open.
  const nextStone = useMemo(() => {
    const open = zones
      .filter((z) => !z.off && z.lessons.some((l) => l.status === "open" || l.status === "waiting"))
      .sort((a, b) => a.done / Math.max(1, a.lessons.length) - b.done / Math.max(1, b.lessons.length));
    const z = open[0];
    if (!z) return null;
    const i = z.lessons.findIndex((l) => l.status === "open" || l.status === "waiting");
    return objects.find((o) => o.kind === "stone" && o.zone === z.subject && o.index === i) ?? null;
  }, [zones, objects]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !base || !sprites) return;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      view.current.scale = Math.max(2, Math.min(4, Math.round(h / (11 * TILE)))) * dpr;
      view.current.w = canvas.width;
      view.current.h = canvas.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();
    let tick = 0;
    const loop = (now: number) => {
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
      last = now;
      tick += dt;
      const m = me.current;

      // Move one tile at a time.
      if (m.fx === m.tx && m.fy === m.ty) {
        let step: { x: number; y: number } | null = null;
        if (path.current.length) step = path.current.shift()!;
        else if (held.current) {
          const [dx, dy] = DIRS[held.current];
          m.face = dy < 0 ? 0 : dy > 0 ? 1 : dx < 0 ? 2 : 3;
          const nx = m.x + dx;
          const ny = m.y + dy;
          if (isWalkable(map, solid, nx, ny)) step = { x: nx, y: ny };
          else {
            const o = objAt.get(at(nx, ny));
            if (o && !dialogRef.current) {
              held.current = null;
              interact(o);
            }
          }
        } else if (goal.current) {
          interact(goal.current);
          goal.current = null;
        }
        if (step) {
          m.face = step.y < m.y ? 0 : step.y > m.y ? 1 : step.x < m.x ? 2 : 3;
          m.prevX = m.x;
          m.prevY = m.y;
          m.tx = step.x;
          m.ty = step.y;
          m.walking = true;
        } else m.walking = false;
      }
      if (m.fx !== m.tx || m.fy !== m.ty) {
        const d = SPEED * dt;
        m.fx = Math.abs(m.tx - m.fx) <= d ? m.tx : m.fx + Math.sign(m.tx - m.fx) * d;
        m.fy = Math.abs(m.ty - m.fy) <= d ? m.ty : m.fy + Math.sign(m.ty - m.fy) * d;
        if (m.fx === m.tx && m.fy === m.ty) {
          m.x = m.tx;
          m.y = m.ty;
          arrive(m.x, m.y);
        }
      }

      // Camera follows the hero.
      const v = view.current;
      const s = v.scale;
      const worldW = MAP_W * TILE * s;
      const worldH = MAP_H * TILE * s;
      const cx = (m.fx + 0.5) * TILE * s - v.w / 2;
      const cy = (m.fy + 0.5) * TILE * s - v.h / 2;
      v.camX = worldW <= v.w ? (worldW - v.w) / 2 : Math.max(0, Math.min(worldW - v.w, cx));
      v.camY = worldH <= v.h ? (worldH - v.h) / 2 : Math.max(0, Math.min(worldH - v.h, cy));

      const frame = reduce ? 0 : Math.floor(tick * 2) % 2;
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = THEMES[theme].void;
      ctx.fillRect(0, 0, v.w, v.h);
      ctx.drawImage(base[frame], -v.camX, -v.camY, worldW, worldH);

      const put = (c: HTMLCanvasElement, px: number, py: number) => ctx.drawImage(c, Math.round(px * s - v.camX), Math.round(py * s - v.camY), c.width * s, c.height * s);
      const bob = reduce ? 0 : Math.sin(tick * 4) > 0 ? 1 : 0;

      // Things on the ground, then everything standing, back to front.
      const standing: { y: number; draw: () => void }[] = [];
      for (const o of objects) {
        const px = o.x * TILE;
        const py = o.y * TILE;
        switch (o.kind) {
          case "spark":
            if (!found.has(o.id)) put(sprites(`spark${frame}`, () => sparkGrid(frame)), px + 3, py + 3 - bob);
            break;
          case "item":
            if (!found.has(o.id) && !questDone) put(sprites("item", () => itemGrid(world.quest.item.sprite)), px + 2, py + 2 - bob);
            break;
          case "lantern": {
            const lit = zoneBy[o.zone]?.lit;
            standing.push({
              y: py,
              draw: () => {
                if (lit) {
                  const gx = (px + 8) * s - v.camX;
                  const gy = (py + 2) * s - v.camY;
                  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, 40 * s);
                  glow.addColorStop(0, "rgba(255,224,102,0.45)");
                  glow.addColorStop(1, "rgba(255,224,102,0)");
                  ctx.fillStyle = glow;
                  ctx.fillRect(gx - 40 * s, gy - 40 * s, 80 * s, 80 * s);
                }
                put(sprites(`lantern${lit ? 1 : 0}${frame}`, () => lanternGrid(!!lit, frame)), px, py - 8);
              },
            });
            break;
          }
          case "stone": {
            const z = zoneBy[o.zone];
            const st = z?.lessons[o.index]?.status ?? "locked";
            const isNext = nextStone?.id === o.id;
            standing.push({
              y: py,
              draw: () => {
                put(sprites(`stone${st}${isNext ? 1 : 0}${frame}`, () => stoneGrid(st, isNext, frame)), px, py);
                ctx.fillStyle = "#1b1530";
                ctx.font = `bold ${Math.round(5 * s)}px ui-monospace, monospace`;
                ctx.textAlign = "center";
                ctx.fillText(String(o.index + 1), (px + 8) * s - v.camX, (py - 1) * s - v.camY);
                if (isNext) put(sprites(`arrow${frame}`, () => sparkGrid(frame)), px + 3, py - 14 - bob * 2);
              },
            });
            break;
          }
          case "arcade":
            standing.push({ y: py + 16, draw: () => put(sprites(`arcade-${o.zone}`, () => arcadeGrid(`hsl(${K5_SUBJECT_INFO[o.zone].hue} 70% 55%)`)), px, py) });
            break;
          case "home":
            standing.push({ y: py + 16, draw: () => put(sprites("home", homeGrid), px, py) });
            break;
          case "landmark":
            standing.push({ y: py + 16, draw: () => put(sprites(`landmark${frame}`, () => landmarkGrid(theme, frame)), px, py) });
            break;
          case "gate":
            standing.push({ y: py + 16, draw: () => put(sprites(`gate${frame}`, () => gateGrid(frame)), px, py) });
            break;
          case "wardrobe":
            standing.push({ y: py, draw: () => put(sprites("wardrobe", wardrobeGrid), px, py) });
            break;
          case "sign":
            standing.push({ y: py, draw: () => put(sprites("sign", signGrid), px, py) });
            break;
          case "chest":
            standing.push({ y: py, draw: () => put(sprites(`chest${opened.has(o.id) ? 1 : 0}`, () => chestGrid(opened.has(o.id))), px, py) });
            break;
          case "pip":
            standing.push({ y: py, draw: () => put(sprites(`pip${frame}`, () => pipGrid(frame)), px + 2, py - 2 - bob * 2) });
            break;
          case "npc": {
            const v2 = world.villagers.find((x) => x.id === o.id);
            if (v2) standing.push({ y: py, draw: () => put(sprites(`npc-${o.id}`, () => heroGrid(v2.look)), px, py - 3 - (bob && o.x % 2 ? 1 : 0)) });
            break;
          }
          case "guide": {
            const info = K5_SUBJECT_INFO[o.zone];
            const look: Hero = { skin: (o.x * 3) % 6, hair: "short", hairColor: 6, outfit: ["math", "ela", "sci", "soc", "span"].indexOf(o.zone) + 1, hat: "none", pet: "none" };
            standing.push({ y: py, draw: () => put(sprites(`guide-${o.zone}`, () => heroGrid(look)), px, py - 3) });
            void info;
            break;
          }
        }
      }
      // The pet trails one step behind; the hero is drawn last at their row.
      const petG = petGrid(hero.pet, frame);
      const petX = m.walking ? m.prevX + (m.fx - m.x) : m.prevX;
      const petY = m.walking ? m.prevY + (m.fy - m.y) : m.prevY;
      if (petG && isWalkable(map, solid, Math.round(petX), Math.round(petY))) standing.push({ y: petY * TILE, draw: () => put(sprites(`pet${frame}`, () => petGrid(hero.pet, frame)!), petX * TILE + 3, petY * TILE + 5) });
      const walkFrame = m.walking ? Math.floor(tick * 8) % 2 : 0;
      standing.push({ y: m.fy * TILE + 0.5, draw: () => put(sprites(`hero${walkFrame}`, () => heroGrid({ ...hero, pet: "none" }, walkFrame)), m.fx * TILE, m.fy * TILE - 3) });
      standing.sort((a, b) => a.y - b.y).forEach((x) => x.draw());

      // An arrow at the edge of the screen pointing to the next lesson.
      if (nextStone) {
        const sx = (nextStone.x + 0.5) * TILE * s - v.camX;
        const sy = (nextStone.y + 0.5) * TILE * s - v.camY;
        if (sx < 0 || sy < 0 || sx > v.w || sy > v.h) {
          const ang = Math.atan2(sy - v.h / 2, sx - v.w / 2);
          const r = Math.min(v.w, v.h) / 2 - 22 * (s / 3);
          const ax = v.w / 2 + Math.cos(ang) * r;
          const ay = v.h / 2 + Math.sin(ang) * r;
          ctx.save();
          ctx.translate(ax, ay);
          ctx.rotate(ang);
          ctx.fillStyle = "#ffd43b";
          ctx.strokeStyle = "#1b1530";
          ctx.lineWidth = 2 * (s / 3);
          ctx.beginPath();
          const k = 7 * s;
          ctx.moveTo(k, 0);
          ctx.lineTo(-k * 0.7, k * 0.7);
          ctx.lineTo(-k * 0.3, 0);
          ctx.lineTo(-k * 0.7, -k * 0.7);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [base, sprites, map, solid, objAt, objects, found, opened, questDone, zoneBy, nextStone, hero, theme, world, interact, arrive]);

  // Tap or click to walk.
  const onTap = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (story) return;
    const r = e.currentTarget.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const v = view.current;
    const tx = Math.floor(((e.clientX - r.left) * dpr + v.camX) / (TILE * v.scale));
    const ty = Math.floor(((e.clientY - r.top) * dpr + v.camY) / (TILE * v.scale));
    if (tx >= 0 && ty >= 0 && tx < MAP_W && ty < MAP_H) walkTo(tx, ty);
  };

  // Save where the hero is now and then, and when leaving.
  useEffect(() => {
    const save = (keepalive: boolean) => {
      const m = me.current;
      const k = `${m.x},${m.y}`;
      if (k === lastSaved.current) return;
      lastSaved.current = k;
      post({ action: "move", x: m.x, y: m.y }, keepalive);
    };
    const t = setInterval(() => save(false), 6000);
    const hide = () => document.visibilityState === "hidden" && save(true);
    document.addEventListener("visibilitychange", hide);
    return () => {
      clearInterval(t);
      document.removeEventListener("visibilitychange", hide);
      save(true);
    };
  }, [post]);

  // ---------- HUD numbers ----------
  const sparksFound = [...found].filter((id) => id.startsWith("spark")).length;
  const itemsFound = [...found].filter((id) => id.startsWith("item")).length;

  return (
    <div className={`explore theme-${theme} ${young ? "young" : ""}`}>
      <div className="ex-hud">
        <div className="ex-title">
          <span className="pixel-title">{world.name}</span>
          <span className="ex-chapter">
            Chapter {world.chapter}: {world.chapterTitle}
          </span>
        </div>
        <div className="ex-chips">
          <span className="chip" title="Lanterns lit">
            🏮 {props.lanternsLit}/{props.lanternsTotal}
          </span>
          <span className="chip" title="Sparks found">
            ✨ {sparksFound}/{world.sparks}
          </span>
          {!questDone && itemsFound > 0 && (
            <span className="chip" title={world.quest.title}>
              🎒 {itemsFound}/{world.quest.count}
            </span>
          )}
          <span className="chip coin" title="Coins">
            🪙 {coins}
          </span>
        </div>
        <div className="ex-buttons">
          <button className="kbtn ghost small-btn" onClick={() => setShowMap(true)}>
            🗺️ Map
          </button>
          <button className="kbtn ghost small-btn" onClick={() => setStory({ lines: world.intro, i: 0, kind: "help" })}>
            📜 Story
          </button>
          <Link className="kbtn ghost small-btn" href={`/kid/hero?world=${world.key}`}>
            🎒 Hero
          </Link>
          <Link className="kbtn ghost small-btn" href="/kid?home=1">
            🏠 More
          </Link>
        </div>
      </div>

      <div className="ex-stage" ref={wrapRef}>
        <canvas ref={canvasRef} className="ex-canvas" onPointerDown={onTap} role="img" aria-label={`${world.name}. Use the arrow keys or tap to walk.`} />
        <div className="ex-goal">{world.goal}</div>
        <Pad
          onDir={(k) => {
            held.current = k;
            path.current = [];
            goal.current = null;
            setDialog(null);
          }}
          onStop={() => (held.current = null)}
        />
        {dialog && (
          <Dialog
            o={dialog}
            props={props}
            zoneBy={zoneBy}
            found={found}
            questDone={questDone}
            opened={opened}
            onClose={() => setDialog(null)}
            onStory={(kind) => {
              setDialog(null);
              setStory({ lines: kind === "outro" ? world.outro : world.intro, i: 0, kind: kind === "outro" ? "outro" : "help" });
            }}
            onOpenChest={async (id) => {
              const r = await post({ action: "open", id });
              if (!r.ok) return r.error ?? "Not yet!";
              setOpened((s) => new Set(s).add(id));
              celebrate(r);
              return null;
            }}
            onQuest={async () => {
              const r = await post({ action: "quest" });
              if (!r.ok) return r.error ?? "Not yet!";
              setQuestDone(true);
              celebrate(r);
              return null;
            }}
          />
        )}
        <div className="ex-toasts" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} className="ex-toast">
              {t.grid && <PixelSprite grid={t.grid} scale={3} />}
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {showMap && base && (
        <MiniMap
          base={base[0]}
          world={world}
          zones={zones}
          objects={objects}
          here={{ x: me.current.x, y: me.current.y }}
          next={nextStone}
          onGo={(x, y) => {
            setShowMap(false);
            walkTo(x, y);
          }}
          onClose={() => setShowMap(false)}
        />
      )}

      {story && (
        <Story
          lines={story.lines}
          i={story.i}
          setI={(i) => setStory((s) => (s ? { ...s, i } : s))}
          onDone={() => {
            if (story.kind === "intro") post({ action: "intro" });
            if (story.kind === "outro") post({ action: "outro" });
            setStory(null);
          }}
          title={story.kind === "outro" ? "The lanterns are lit!" : `Chapter ${world.chapter}: ${world.chapterTitle}`}
        />
      )}
    </div>
  );
}

// ---------- The whole map ----------

/** The whole world at a glance: zones, lanterns, where you are and the next lesson. Tap a spot to walk there. */
function MiniMap({
  base,
  world,
  zones,
  objects,
  here,
  next,
  onGo,
  onClose,
}: {
  base: HTMLCanvasElement;
  world: WorldDef;
  zones: ZoneView[];
  objects: ExploreObject[];
  here: { x: number; y: number };
  next: ExploreObject | null;
  onGo: (x: number, y: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(base, 0, 0, c.width, c.height);
    const k = c.width / MAP_W;
    const dot = (x: number, y: number, color: string, r: number) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = "#1b1530";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc((x + 0.5) * k, (y + 0.5) * k, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    };
    for (const o of objects) if (o.kind === "lantern") dot(o.x, o.y, zones.find((z) => z.subject === o.zone)?.lit ? "#ffd43b" : "#868e96", 7);
    if (next) dot(next.x, next.y, "#4dabf7", 6);
    dot(here.x, here.y, "#e03131", 7);
  }, [base, objects, zones, here, next]);
  const W = MAP_W * 10;
  const H = MAP_H * 10;
  return (
    <div className="ex-story" role="dialog" aria-label={`Map of ${world.name}`} onClick={onClose}>
      <div className="ex-map-card" onClick={(e) => e.stopPropagation()}>
        <div className="ex-dialog-head">
          <strong>{world.name}</strong>
          <button className="ex-x" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="ex-map-wrap">
          <canvas
            ref={ref}
            width={W}
            height={H}
            className="ex-map"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              onGo(Math.floor(((e.clientX - r.left) / r.width) * MAP_W), Math.floor(((e.clientY - r.top) / r.height) * MAP_H));
            }}
          />
          {objects
            .filter((o) => o.kind === "lantern")
            .map((o) => {
              const z = zones.find((x) => x.subject === (o as { zone: K5Subject }).zone)!;
              return (
                <span key={o.id} className="ex-map-label" style={{ left: `${((o.x + 0.5) / MAP_W) * 100}%`, top: `${((o.y + 2.2) / MAP_H) * 100}%` }}>
                  {z.icon} {z.name}
                </span>
              );
            })}
        </div>
        <p className="kmuted small" style={{ margin: "6px 0 0" }}>
          🔴 You · 🔵 Next lesson · 🟡 Lit lantern. Tap the map to walk there.
        </p>
      </div>
    </div>
  );
}

// ---------- The on-screen pad (for touch) ----------

function Pad({ onDir, onStop }: { onDir: (k: string) => void; onStop: () => void }) {
  const btn = (k: string, label: string, cls: string) => (
    <button
      type="button"
      className={`ex-pad-btn ${cls}`}
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        onDir(k);
      }}
      onPointerUp={onStop}
      onPointerLeave={onStop}
      onPointerCancel={onStop}
    >
      {cls === "up" ? "▲" : cls === "down" ? "▼" : cls === "left" ? "◀" : "▶"}
    </button>
  );
  return (
    <div className="ex-pad" aria-hidden>
      {btn("ArrowUp", "Up", "up")}
      {btn("ArrowLeft", "Left", "left")}
      {btn("ArrowRight", "Right", "right")}
      {btn("ArrowDown", "Down", "down")}
    </div>
  );
}

// ---------- Story cards (Pip) ----------

function Story({ lines, i, setI, onDone, title }: { lines: string[]; i: number; setI: (i: number) => void; onDone: () => void; title: string }) {
  const line = lines[i] ?? "";
  useAutoRead(`story-${i}-${line.slice(0, 12)}`, line);
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => 1 - f), 300);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ex-story" role="dialog" aria-label={title}>
      <div className="ex-story-card">
        <div className="ex-story-pip">
          <PixelSprite grid={pipGrid(frame)} scale={7} />
        </div>
        <div className="ex-story-title">{title}</div>
        <p className="ex-story-line">{line}</p>
        <div className="ex-story-dots">
          {lines.map((_, j) => (
            <span key={j} className={j === i ? "on" : ""} />
          ))}
        </div>
        <div className="ex-story-btns">
          <SayButton id={`story-say-${i}`} text={line} />
          {i > 0 && (
            <button className="kbtn ghost" onClick={() => setI(i - 1)}>
              ◀ Back
            </button>
          )}
          {i < lines.length - 1 ? (
            <button className="kbtn big game-btn" onClick={() => setI(i + 1)} autoFocus>
              Next ▶
            </button>
          ) : (
            <button className="kbtn big game-btn" onClick={onDone} autoFocus>
              Let&apos;s go! ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Talking to things ----------

function Dialog({
  o,
  props,
  zoneBy,
  found,
  questDone,
  opened,
  onClose,
  onStory,
  onOpenChest,
  onQuest,
}: {
  o: ExploreObject;
  props: Props;
  zoneBy: Record<K5Subject, ZoneView>;
  found: Set<string>;
  questDone: boolean;
  opened: Set<string>;
  onClose: () => void;
  onStory: (kind: "intro" | "outro") => void;
  onOpenChest: (id: string) => Promise<string | null>;
  onQuest: () => Promise<string | null>;
}) {
  const { world } = props;
  const [line, setLine] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const lessonHref = (z: ZoneView, id: string) => `/kid/learn/${z.courseId}/${encodeURIComponent(id)}`;

  let name = "";
  let lines: string[] = [];
  let actions: React.ReactNode = null;
  let sprite: Grid | null = null;

  const nextLesson = (z: ZoneView) => z.lessons.find((l) => l.status === "open" || l.status === "waiting");

  switch (o.kind) {
    case "pip": {
      name = "Pip";
      sprite = pipGrid(1);
      const all = props.lanternsTotal > 0 && props.lanternsLit === props.lanternsTotal;
      const z = props.zones.filter((x) => !x.off && nextLesson(x)).sort((a, b) => a.done - b.done)[0];
      lines = all
        ? ["Every lantern is glowing! You saved this world.", "Want to hear the ending again?"]
        : [
            `${world.goal}`,
            `You've lit ${props.lanternsLit} of ${props.lanternsTotal} lanterns so far.`,
            z ? `Try the ${z.name} next. Follow the yellow arrow to the glowing stone!` : "Explore and find the sparks while you wait for new lessons.",
          ];
      actions = all ? (
        <button className="kbtn game-btn" onClick={() => onStory("outro")}>
          Hear the ending
        </button>
      ) : (
        <button className="kbtn ghost" onClick={() => onStory("intro")}>
          Hear the story again
        </button>
      );
      break;
    }
    case "npc": {
      const v = world.villagers.find((x) => x.id === o.id);
      if (!v) break;
      name = v.name;
      sprite = heroGrid(v.look);
      if (v.id === world.quest.giver) {
        const items = props.map.objects.filter((x) => x.kind === "item");
        const have = items.filter((x) => found.has(x.id)).length;
        if (questDone) lines = [...world.quest.thanks.slice(0, 1), ...v.lines.slice(1)];
        else if (have >= items.length) {
          lines = [`You found all my ${world.quest.item.plural}!`];
          actions = (
            <button
              className="kbtn big game-btn"
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                const err = await onQuest();
                setBusy(false);
                setMsg(err ?? world.quest.thanks.join(" "));
              }}
            >
              Give them back 🎁
            </button>
          );
        } else lines = [...world.quest.ask, `You've found ${have} of ${items.length}.`];
      } else lines = v.lines;
      break;
    }
    case "guide":
    case "lantern":
    case "sign": {
      const z = o.zone ? zoneBy[o.zone] : null;
      if (!z) {
        name = "Signpost";
        lines = [`Welcome to ${world.name}!`, ...props.zones.map((x) => `${x.icon} ${x.name}: ${x.title}`)];
        break;
      }
      const info = K5_SUBJECT_INFO[z.subject];
      const next = nextLesson(z);
      name = o.kind === "guide" ? z.teacher : o.kind === "lantern" ? z.lantern : z.name;
      if (o.kind === "guide") sprite = heroGrid({ skin: (o.x * 3) % 6, hair: "short", hairColor: 6, outfit: ["math", "ela", "sci", "soc", "span"].indexOf(z.subject) + 1, hat: "none", pet: "none" });
      if (o.kind === "lantern") sprite = lanternGrid(z.lit, 1);
      if (z.off) lines = [`The ${z.name} is closed for now. A grown-up can turn ${info.title} on in Settings.`];
      else if (!z.lessons.length) lines = [`The ${z.name} is getting ready. New lessons are coming soon!`];
      else if (z.lit) lines = [`The ${z.lantern} is shining bright! You finished all ${z.lessons.length} lessons here.`, "You can play any lesson again, or visit the arcade."];
      else
        lines =
          o.kind === "guide"
            ? [`Hi! I'm ${z.teacher}, and this is the ${z.name}.`, `Finish all ${z.lessons.length} lessons here to light the ${z.lantern}. You've done ${z.done}.`]
            : [`${z.name}: ${z.title}.`, `${z.done} of ${z.lessons.length} lessons done. Finish them all to light the ${z.lantern}.`];
      if (next && !z.off)
        actions = (
          <Link className="kbtn big game-btn" href={lessonHref(z, next.id)}>
            {z.done ? "Next lesson" : "Start"}: {next.title} ▶
          </Link>
        );
      break;
    }
    case "stone": {
      const z = zoneBy[o.zone];
      const l = z?.lessons[o.index];
      if (!z || !l) break;
      name = `${z.name} · Stone ${o.index + 1}`;
      sprite = stoneGrid(l.status, false, 1);
      lines =
        l.status === "locked"
          ? [`${l.title}.`, `This stone is still asleep. Finish stone ${o.index} first.`]
          : l.status === "done"
            ? [`${l.title}.`, "You finished this one! ⭐ You can do it again any time."]
            : l.status === "waiting"
              ? [`${l.title}.`, "Almost done! Finish the last step to light this stone."]
              : [`${l.title}.`, `About ${l.minutes} minutes with ${z.teacher}.`];
      if (l.status !== "locked")
        actions = (
          <Link className="kbtn big game-btn" href={lessonHref(z, l.id)}>
            {l.status === "done" ? "Play again" : l.status === "waiting" ? "Finish it" : "Start lesson"} ▶
          </Link>
        );
      break;
    }
    case "arcade": {
      const z = zoneBy[o.zone];
      name = `${z?.name ?? ""} Arcade`;
      sprite = arcadeGrid(`hsl(${K5_SUBJECT_INFO[o.zone].hue} 70% 55%)`);
      lines = z?.games.length ? ["Games to practice what you learn. Earn stars for coins!"] : ["The games for this arcade are still being built. Come back soon!"];
      actions = z?.games.length ? (
        <div className="ex-games">
          {z.games.map((g) => (
            <Link key={g.id} className="ex-game" href={`/kid/play/${g.id}?world=${world.key}`}>
              <span className="ex-game-icon">{g.icon}</span>
              <span className="ex-game-title">{g.title}</span>
              <span className="ex-game-stars">
                ⭐ {g.stars}/{g.max}
              </span>
            </Link>
          ))}
        </div>
      ) : null;
      break;
    }
    case "chest": {
      const c = world.chests.find((x) => x.id === o.id);
      if (!c) break;
      name = "Treasure chest";
      const isOpen = opened.has(c.id);
      sprite = chestGrid(isOpen);
      if (isOpen) lines = [`Empty now. You found ${unlockName(c.reward)} here.`];
      else if (props.lessonsDone < c.lessons) lines = [`It's locked tight. It opens after you finish ${c.lessons} lessons in ${world.name}. You've done ${props.lessonsDone}.`];
      else {
        lines = ["A treasure chest! What's inside?"];
        actions = (
          <button
            className="kbtn big game-btn"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              const err = await onOpenChest(c.id);
              setBusy(false);
              setMsg(err ?? `You found ${unlockName(c.reward)} and 15 coins!`);
            }}
          >
            Open it 🗝️
          </button>
        );
      }
      break;
    }
    case "landmark":
      name = world.landmark.name;
      sprite = landmarkGrid(world.theme, 1);
      lines = world.landmark.lines;
      break;
    case "home":
      name = "Your home";
      sprite = homeGrid();
      lines = ["Home sweet home. From here you can see your day, your goals and more."];
      actions = (
        <Link className="kbtn game-btn" href="/kid?home=1">
          My day and more ▶
        </Link>
      );
      break;
    case "wardrobe":
      name = "Wardrobe";
      sprite = wardrobeGrid();
      lines = ["Change your look! New colors, hats, hair and pets show up here as you find them."];
      actions = (
        <Link className="kbtn big game-btn" href={`/kid/hero?world=${world.key}`}>
          Change my look ▶
        </Link>
      );
      break;
    case "gate":
      name = "The World Gate";
      sprite = gateGrid(1);
      lines = ["The gate can take you to the worlds you've been to. New worlds open as you grow."];
      actions = (
        <div className="ex-games">
          {props.worlds.map((w) =>
            w.open && w.key !== world.key ? (
              <Link key={w.key} className="ex-game" href={`/kid/explore/${w.key}`}>
                <span className="ex-game-title">{w.name}</span>
                <span className="ex-game-stars">{w.grade === 0 ? "K" : `Grade ${w.grade}`}</span>
              </Link>
            ) : (
              <span key={w.key} className={`ex-game ${w.key === world.key ? "here" : "locked"}`}>
                <span className="ex-game-title">{w.key === world.key ? `${w.name} (you're here)` : "🔒 ???"}</span>
                <span className="ex-game-stars">{w.grade === 0 ? "K" : `Grade ${w.grade}`}</span>
              </span>
            ),
          )}
        </div>
      );
      break;
  }

  const text = msg ?? lines[line] ?? "";
  useAutoRead(`ex-${o.id}-${line}-${msg ? "m" : ""}`, text);
  const last = msg !== null || line >= lines.length - 1;

  return (
    <div className="ex-dialog" role="dialog" aria-label={name}>
      <div className="ex-dialog-head">
        {sprite && <PixelSprite grid={sprite} scale={3} />}
        <strong>{name}</strong>
        <button className="ex-x" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      <p className="ex-dialog-text">{text}</p>
      <div className="ex-dialog-actions">
        <SayButton id={`ex-say-${o.id}-${line}`} text={text} />
        {!last && (
          <button className="kbtn game-btn" onClick={() => setLine((l) => l + 1)} autoFocus>
            Next ▶
          </button>
        )}
        {last && !msg && actions}
        {last && (
          <button className="kbtn ghost" onClick={onClose}>
            Bye!
          </button>
        )}
      </div>
    </div>
  );
}
