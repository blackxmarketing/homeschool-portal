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
/** The pit's height in pixels, which the stylesheet also sets. */
const PIT_H = 300;
/** How tall they are standing, and squashed down into a duck. */
const ME_H = 72;
const DUCK_H = 43;
/** How high a jump takes them off the floor. */
const JUMP_PX = 36;
const JUMP_MS = 620;
const DUCK_MS = 520;
/** How far across the pit a throw travels every second. */
const THROW_SPEED = 0.85;
/** The least time between two throws, so one press is one fireball. */
const THROW_GAP_MS = 260;

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
  reloading,
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
  /** They are back on the cards making more fire, with the dragon waiting. */
  reloading?: boolean;
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
  /**
   * When they last threw.
   *
   * Holding the space bar repeats the key about thirty times a second, and
   * every repeat was a fireball: a kid who leaned on it emptied a hundred
   * of them into the wall in three seconds and was told they had run out.
   * One throw per press, and no faster than this between presses.
   */
  const lastThrow = useRef(0);
  const invuln = useRef(0);
  /** Where they are, for the loop to read without re-subscribing each frame. */
  const meRef = useRef({ x: 0.14, jump: 0, duck: 0 });
  /**
   * What is in the air, held outside React.
   *
   * Everything that happens in a frame - a hit landing, a life going, the
   * dragon falling - used to be worked out inside a setState updater, which
   * React is free to run twice and which must not touch anything outside
   * itself. It did both: hits were counted twice and the parent was updated
   * mid-render. The frame now works it out here and hands React the answer.
   */
  const shotsRef = useRef<Shot[]>([]);
  const flamesRef = useRef<Shot[]>([]);
  const hpRef = useRef(need);
  const live = useRef({ ammo, hp: need, won: false });
  live.current = { ammo, hp, won: won || dying };
  meRef.current = me;

  /**
   * The box they occupy, top and bottom, as shares of the pit's height.
   *
   * Fire is drawn from the top of the pit and they are drawn from the floor
   * up, and the two were being compared as if they were the same number. The
   * bands that came out of that were wrong in both dodges: fire went through
   * their legs mid-jump and straight through them while ducked, and a kid saw
   * themselves hit and nothing happen. This is the body as it is drawn.
   */
  const bodyBand = () => {
    const feet = FLOOR * 100 + (meRef.current.jump ? JUMP_PX : 0);
    const head = feet + (meRef.current.duck ? DUCK_H : ME_H);
    return { top: 1 - head / PIT_H, bottom: 1 - feet / PIT_H };
  };

  const throwOne = useCallback(() => {
    if (live.current.won) return;
    const now = Date.now();
    if (now - lastThrow.current < THROW_GAP_MS) return;
    lastThrow.current = now;
    if (live.current.ammo <= 0) {
      onOutOfFire();
      return;
    }
    thrown.current++;
    onThrow();
    chime("right");
    shotsRef.current = [
      ...shotsRef.current,
      { id: nextId.current++, x: 0.2, y: jumpUntil.current > Date.now() ? 0.42 : duckUntil.current > Date.now() ? 0.9 : 0.66 },
    ];
    setShots(shotsRef.current);
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
      // Not on a repeat: a held key is one press, not thirty.
      else if ((k === " " || k === "Enter") && !e.repeat) throwOne();
      else if (k === " " || k === "Enter") e.preventDefault();
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
      shotsRef.current = [];
      flamesRef.current = [];
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

  // The fight itself: one frame, worked out in order, then handed to React.
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
      const d = { x: 0.72 + Math.sin((t / 1000) * beat * 2.1) * 0.08, y: Math.sin((t / 1000) * beat * 3.3) * 0.26 };
      setDragon(d);

      // Their throws, travelling right. A hit is counted once, here.
      const flying: Shot[] = [];
      let landed = 0;
      for (const f of shotsRef.current) {
        const x = f.x + THROW_SPEED * dt;
        if (Math.abs(x - d.x) < 0.1 && Math.abs(f.y - (0.6 + d.y)) < 0.22) {
          landed++;
          continue;
        }
        if (x < 1.05) flying.push({ ...f, x });
      }
      if (landed > 0) {
        const left = Math.max(0, hpRef.current - landed);
        hpRef.current = left;
        setHp(left);
        if (left <= 0 && !live.current.won) {
          live.current.won = true;
          setWon(true);
          chime("streak");
          onWon(thrown.current);
        } else {
          chime("oops");
        }
      }
      shotsRef.current = flying;
      setShots(flying);

      // Its fire, travelling left at whatever height it is at.
      if (now - lastBreath.current > DRAGON_BREATH_MS[pace]) {
        lastBreath.current = now;
        flamesRef.current = [...flamesRef.current, { id: nextId.current++, x: 0.7, y: 0.6 + Math.sin((t / 1000) * beat * 3.3) * 0.26 }];
        chime("growl");
      }
      const burning: Shot[] = [];
      let caught = false;
      const body = bodyBand();
      for (const f of flamesRef.current) {
        const x = f.x - (DRAGON_FIRE_SPEED[pace] / 420) * dt;
        const mx = meRef.current.x;
        // Anything that touches them burns them. The only way past it is to
        // be somewhere else: jump it, duck it, or back off.
        const onMe = Math.abs(x - mx) < 0.07 && f.y > body.top - 0.05 && f.y < body.bottom + 0.05;
        if (!caught && onMe && now > invuln.current) {
          caught = true;
          continue;
        }
        if (x > -0.1) burning.push({ ...f, x });
      }
      flamesRef.current = burning;
      setFlames(burning);
      if (caught) {
        // Burned: they go up in smoke and come back, and it costs a life -
        // but never the hits they have already landed.
        invuln.current = now + 1700;
        setHurtAt(now);
        setDying(true);
        chime("died");
        onHurt();
      }

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
      {reloading && <span className={css.lost}>Out of fire! Answer below to make more.</span>}

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
