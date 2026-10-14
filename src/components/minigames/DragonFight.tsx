"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { Grid } from "@/lib/pixel/grid";
import {
  type Pace,
  DRAGON_BREATH_MS,
  DRAGON_FIRE_SPEED,
  DRAGON_HITS,
  DRAGON_PACE,
  cagedPetGrid,
  dragonGrid,
  fireballGrid,
} from "@/lib/minigames/factrush";
import css from "./DragonFight.module.css";

/**
 * The fight at the end of a dungeon.
 *
 * The only real-time thing in either XP Rush, and the only thing the server
 * does not replay. What it cannot invent is the ammunition: a fireball is a
 * card answered right, counted on the server from the answers. Run out and
 * the dragon throws down another hand - the way out is always to answer.
 *
 * Arrow keys move, up jumps, down ducks, and space or enter throws.
 */

/** The floor the two of them stand on, as a share of the pit's height. */
const FLOOR = 0.78;
const JUMP_MS = 620;
const DUCK_MS = 520;
/** How far across the pit a throw travels every second. */
const THROW_SPEED = 0.85;

type Shot = { id: number; x: number; y: number };

export interface FightResult {
  /** Fireballs thrown, which the server checks against what they earned. */
  thrown: number;
  beat: boolean;
}

export default function DragonFight({
  pace,
  ammo,
  lives,
  paused,
  hero,
  pet,
  onThrow,
  onHurt,
  onOutOfFire,
  onWon,
}: {
  pace: Pace;
  /** Fireballs in hand right now. */
  ammo: number;
  lives: number;
  /** Held still while the coach explains it over the top. */
  paused: boolean;
  hero: Grid;
  pet: Grid | null;
  /** Spend one. */
  onThrow: () => void;
  /** Burned by the dragon's fire: costs a life, but not the level. */
  onHurt: () => void;
  /** Nothing left to throw: back to the cards for another hand. */
  onOutOfFire: () => void;
  onWon: (thrown: number) => void;
}) {
  const need = DRAGON_HITS[pace];
  const [hp, setHp] = useState(need);
  const [me, setMe] = useState({ x: 0.14, jump: 0, duck: 0 });
  const [shots, setShots] = useState<Shot[]>([]);
  const [flames, setFlames] = useState<Shot[]>([]);
  const [dragon, setDragon] = useState({ x: 0.74, y: 0 });
  const [hurtAt, setHurtAt] = useState(0);
  const [won, setWon] = useState(false);
  /**
   * Burned to nothing, and about to come back.
   *
   * Being singed and losing a life looked the same as being singed, so a kid
   * could not tell what it had cost them. Now they go up in smoke, the fight
   * stops, and it starts over with the dragon back on its feet.
   */
  const [dying, setDying] = useState(false);

  const thrown = useRef(0);
  const nextId = useRef(1);
  const held = useRef<Record<string, boolean>>({});
  const jumpUntil = useRef(0);
  const duckUntil = useRef(0);
  const lastBreath = useRef(0);
  const invuln = useRef(0);
  /** Where they are, for the loop to read without re-subscribing each frame. */
  const meRef = useRef({ x: 0.14, jump: 0, duck: 0 });
  const live = useRef({ ammo, hp: need, won: false });
  live.current = { ammo, hp, won: won || dying };
  meRef.current = me;

  const throwOne = useCallback(() => {
    if (live.current.won) return;
    if (live.current.ammo <= 0) {
      onOutOfFire();
      return;
    }
    thrown.current++;
    onThrow();
    chime("right");
    setShots((xs) => [...xs, { id: nextId.current++, x: 0.2, y: jumpUntil.current > Date.now() ? 0.42 : duckUntil.current > Date.now() ? 0.9 : 0.66 }]);
  }, [onThrow, onOutOfFire]);

  // Keys: the arrows move, up jumps, down ducks, space or enter throws.
  useEffect(() => {
    if (paused || dying) return;
    const down = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const k = e.key;
      if (k === "ArrowLeft" || k === "ArrowRight") held.current[k] = true;
      else if (k === "ArrowUp" && jumpUntil.current < Date.now()) jumpUntil.current = Date.now() + JUMP_MS;
      else if (k === "ArrowDown") duckUntil.current = Date.now() + DUCK_MS;
      else if (k === " " || k === "Enter") throwOne();
      else return;
      e.preventDefault();
    };
    const up = (e: KeyboardEvent) => {
      held.current[e.key] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [throwOne, paused, dying]);

  // Gone for a moment, then the whole thing starts again.
  useEffect(() => {
    if (!dying) return;
    const t = setTimeout(() => {
      setMe({ x: 0.14, jump: 0, duck: 0 });
      meRef.current = { x: 0.14, jump: 0, duck: 0 };
      setShots([]);
      setFlames([]);
      // The hits they had already landed stay landed: a careless moment costs
      // them a life, not the four good throws before it.
      jumpUntil.current = 0;
      duckUntil.current = 0;
      lastBreath.current = Date.now();
      setDying(false);
    }, 1500);
    return () => clearTimeout(t);
  }, [dying]);

  // The fight itself.
  useEffect(() => {
    if (won || paused || dying) return;
    let raf = 0;
    let last = performance.now();
    const step = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      const now = Date.now();

      // Them: walking, in the air, or flat to the floor.
      setMe((m) => {
        let x = m.x;
        if (held.current.ArrowLeft) x -= 0.55 * dt;
        if (held.current.ArrowRight) x += 0.55 * dt;
        return { x: Math.min(0.52, Math.max(0.02, x)), jump: jumpUntil.current > now ? 1 : 0, duck: duckUntil.current > now ? 1 : 0 };
      });

      // It: up and down, and in and out.
      const beat = DRAGON_PACE[pace];
      setDragon({ x: 0.72 + Math.sin(t / 1000 * beat * 2.1) * 0.08, y: Math.sin(t / 1000 * beat * 3.3) * 0.26 });

      // Their throws, travelling right.
      setShots((xs) =>
        xs
          .map((f) => ({ ...f, x: f.x + THROW_SPEED * dt }))
          .filter((f) => {
            const d = { x: 0.72 + Math.sin(t / 1000 * beat * 2.1) * 0.08, y: Math.sin(t / 1000 * beat * 3.3) * 0.26 };
            const onIt = Math.abs(f.x - d.x) < 0.1 && Math.abs(f.y - (0.6 + d.y)) < 0.22;
            if (onIt) {
              setHp((h) => {
                const left = h - 1;
                if (left <= 0 && !live.current.won) {
                  setWon(true);
                  chime("streak");
                  onWon(thrown.current);
                } else chime("oops");
                return Math.max(0, left);
              });
              return false;
            }
            return f.x < 1.05;
          }),
      );

      // Its fire, travelling left at whatever height it is at.
      if (now - lastBreath.current > DRAGON_BREATH_MS[pace]) {
        lastBreath.current = now;
        setFlames((fs) => [...fs, { id: nextId.current++, x: 0.7, y: 0.6 + Math.sin(t / 1000 * beat * 3.3) * 0.26 }]);
        chime("growl");
      }
      setFlames((fs) =>
        fs
          .map((f) => ({ ...f, x: f.x - (DRAGON_FIRE_SPEED[pace] / 420) * dt }))
          .filter((f) => {
            const mx = meRef.current.x;
            const myLow = meRef.current.jump ? 0.3 : meRef.current.duck ? 0.86 : 0.58;
            const myHigh = meRef.current.jump ? 0.52 : meRef.current.duck ? 0.98 : 0.98;
            const onMe = Math.abs(f.x - mx) < 0.07 && f.y > myLow - 0.12 && f.y < myHigh;
            if (onMe && now > invuln.current) {
              invuln.current = now + 2600;
              setHurtAt(now);
              setDying(true);
              chime("died");
              onHurt();
              return false;
            }
            return f.x > -0.1;
          }),
      );

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [pace, won, paused, dying, onHurt, onWon]);

  const hurt = Date.now() - hurtAt < 500;

  return (
    <div className={css.pit} aria-label={`Fighting the dragon: ${hp} of ${need} hits left`}>
      <div className={css.hud}>
        <span className="chip">🔥 {ammo}</span>
        <span className="chip">🐉 {hp}</span>
        <span className="chip">{"♥".repeat(Math.max(0, lives))}</span>
      </div>

      <div className={css.floor} />

      {dying && <span className={css.lost}>Burned! A life gone - here we go again</span>}

      {!dying && (
      <span
        className={`${css.me} ${hurt ? css.hurt : ""}`}
        style={{ left: `${me.x * 100}%`, bottom: `${FLOOR * 100 - (me.jump ? -14 : 0) + (me.jump ? 22 : 0)}px`, transform: me.duck ? "scaleY(0.6)" : undefined }}
      >
        <PixelSprite grid={hero} scale={4} />
      </span>
      )}

      {shots.map((f) => (
        <span key={f.id} className={css.shot} style={{ left: `${f.x * 100}%`, top: `${f.y * 100}%` }}>
          <PixelSprite grid={fireballGrid(f.id % 2)} scale={3} />
        </span>
      ))}

      {flames.map((f) => (
        <span key={f.id} className={css.flame} style={{ left: `${f.x * 100}%`, top: `${f.y * 100}%` }}>
          <PixelSprite grid={fireballGrid((f.id + 1) % 2)} scale={3} />
        </span>
      ))}

      {/* It thins out with every hit, so a kid can see it going rather than
          having to read the number. */}
      <span
        className={`${css.dragon} ${won ? css.beaten : ""}`}
        style={{ left: `${dragon.x * 100}%`, top: `${(0.52 + dragon.y) * 100}%`, opacity: won ? 0.25 : 0.3 + 0.7 * (hp / need) }}
      >
        <PixelSprite grid={dragonGrid(Math.floor(Date.now() / 420) % 2)} scale={4} />
      </span>

      <span className={css.cage}>
        <PixelSprite grid={cagedPetGrid(pet, won)} scale={4} />
      </span>

      <p className={css.how}>
        {paused ? "" : won ? "It is down! Get the cage open." : ammo > 0 ? "← → move · ↑ jump · ↓ duck · space to throw" : "Out of fire - answer more cards to make some."}
      </p>
    </div>
  );
}
