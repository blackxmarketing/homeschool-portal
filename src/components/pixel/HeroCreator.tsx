"use client";

import { useMemo, useState } from "react";
import { HeroSprite, PixelSprite } from "./PixelArt";
import { HAIR_COLORS, HAIRS, heroGrid, OUTFITS, petGrid, PETS, SKINS, HATS, type Hero } from "@/lib/pixel/hero";
import { HAT_NAMES, ownsPart, PET_NAMES, type CosmeticKind } from "@/lib/pixel/cosmetics";
import { UNLOCK_SOURCES } from "@/lib/explore/worlds";

/**
 * Design your Lightkeeper. Locked styles show a lock and where to find them
 * (K-5 worlds: chests, sparks, side quests and lanterns; the rest: the shop).
 * `worldItems` hides the K-5 world unlocks from kids who can't earn them.
 */
export default function HeroCreator({ initial, unlocks, worldItems, save, first }: { initial: Hero; unlocks: string[]; worldItems: boolean; save: (hero: Hero) => Promise<void>; first: boolean }) {
  const [hero, setHero] = useState<Hero>(initial);
  const [busy, setBusy] = useState(false);
  const set = (p: Partial<Hero>) => setHero((h) => ({ ...h, ...p }));
  const have = useMemo(() => new Set(unlocks), [unlocks]);
  /** Whether to show a choice, whether it's owned, and the hint for a locked one. */
  const opt = (kind: CosmeticKind, value: string | number) => {
    const own = ownsPart(have, kind, value);
    const src = UNLOCK_SOURCES[`${kind}:${value}`];
    return { show: own || worldItems || !src, own, hint: src ? `Find it: ${src}` : "Earn it in the shop" };
  };
  const lock = <span className="hc-lock">🔒</span>;

  return (
    <div className="hero-creator">
      <div className="hc-preview">
        <div className="hc-stage">
          <HeroSprite hero={hero} scale={9} />
        </div>
        <button
          className="kbtn big game-btn"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await save(hero);
          }}
        >
          {busy ? "Saving…" : first ? "Begin my adventure ▶" : "Save my hero ✓"}
        </button>
      </div>

      <div className="hc-options">
        <section>
          <h3>Skin</h3>
          <div className="hc-row">
            {SKINS.map((c, i) => (
              <button key={c} type="button" className={`swatch ${hero.skin === i ? "on" : ""}`} style={{ background: c }} onClick={() => set({ skin: i })} aria-label={`Skin ${i + 1}`} />
            ))}
          </div>
        </section>
        <section>
          <h3>Hair</h3>
          <div className="hc-row">
            {HAIRS.map((hair) => {
              const o = opt("hair", hair);
              if (!o.show) return null;
              return (
                <button key={hair} type="button" className={`hc-pick ${hero.hair === hair ? "on" : ""} ${o.own ? "" : "locked"}`} onClick={() => o.own && set({ hair })} disabled={!o.own} title={o.own ? hair : o.hint} aria-label={`Hair: ${hair}${o.own ? "" : " (locked)"}`}>
                  <PixelSprite grid={heroGrid({ ...hero, hair, hat: "none", pet: "none" })} scale={3} />
                  {!o.own && lock}
                </button>
              );
            })}
          </div>
          <div className="hc-row">
            {HAIR_COLORS.map((c, i) => {
              const o = opt("hairColor", i);
              if (!o.show) return null;
              return (
                <button key={c} type="button" className={`swatch ${hero.hairColor === i ? "on" : ""} ${o.own ? "" : "locked"}`} style={{ background: c }} onClick={() => o.own && set({ hairColor: i })} disabled={!o.own} title={o.own ? undefined : o.hint} aria-label={`Hair color ${i + 1}${o.own ? "" : " (locked)"}`}>
                  {!o.own && lock}
                </button>
              );
            })}
          </div>
        </section>
        <section>
          <h3>Outfit</h3>
          <div className="hc-row">
            {OUTFITS.map((c, i) => {
              const o = opt("outfit", i);
              if (!o.show) return null;
              return (
                <button key={c} type="button" className={`swatch ${hero.outfit === i ? "on" : ""} ${o.own ? "" : "locked"}`} style={{ background: c }} onClick={() => o.own && set({ outfit: i })} disabled={!o.own} title={o.own ? undefined : o.hint} aria-label={`Outfit color ${i + 1}${o.own ? "" : " (locked)"}`}>
                  {!o.own && lock}
                </button>
              );
            })}
          </div>
        </section>
        <section>
          <h3>Hat</h3>
          <div className="hc-row">
            {HATS.map((hat) => {
              const o = opt("hat", hat);
              if (!o.show) return null;
              return (
                <button key={hat} type="button" className={`hc-pick ${hero.hat === hat ? "on" : ""} ${o.own ? "" : "locked"}`} onClick={() => o.own && set({ hat })} disabled={!o.own} title={o.own ? HAT_NAMES[hat] : `${HAT_NAMES[hat]}. ${o.hint}`}>
                  <PixelSprite grid={heroGrid({ ...hero, hat, pet: "none" })} scale={3} />
                  {!o.own && lock}
                </button>
              );
            })}
          </div>
        </section>
        <section>
          <h3>Companion</h3>
          <div className="hc-row">
            {PETS.map((pet) => {
              const o = opt("pet", pet);
              if (!o.show) return null;
              const g = petGrid(pet);
              return (
                <button key={pet} type="button" className={`hc-pick pet ${hero.pet === pet ? "on" : ""} ${o.own ? "" : "locked"}`} onClick={() => o.own && set({ pet })} disabled={!o.own} title={o.own ? PET_NAMES[pet] : `${PET_NAMES[pet]}. ${o.hint}`}>
                  {g ? <PixelSprite grid={g} scale={4} /> : <span className="hc-none">✕</span>}
                  {!o.own && lock}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
