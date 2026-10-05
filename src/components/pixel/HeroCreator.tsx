"use client";

import { useMemo, useState } from "react";
import { HeroSprite, PixelSprite } from "./PixelArt";
import { HAIR_COLORS, HAIRS, heroGrid, OUTFITS, petGrid, PETS, SKINS, STARTER_HATS, STARTER_PETS, HATS, type Hero } from "@/lib/pixel/hero";

const HAT_NAMES: Record<string, string> = { none: "No hat", cap: "Cap", bandana: "Bandana", beanie: "Beanie", wizard: "Wizard hat", crown: "Crown", helmet: "Knight helmet", explorer: "Explorer hat" };
const PET_NAMES: Record<string, string> = { none: "No pet", cat: "Cat", dog: "Pup", fox: "Fox", owl: "Owl", bunny: "Bunny", dragon: "Baby dragon" };

/** Design your Lightkeeper. */
export default function HeroCreator({ initial, owned, save, first }: { initial: Hero; owned: { hats: string[]; pets: string[] }; save: (hero: Hero) => Promise<void>; first: boolean }) {
  const [hero, setHero] = useState<Hero>(initial);
  const [busy, setBusy] = useState(false);
  const set = (p: Partial<Hero>) => setHero((h) => ({ ...h, ...p }));
  const hats = useMemo(() => HATS.map((hat) => ({ hat, own: STARTER_HATS.includes(hat) || owned.hats.includes(hat) })), [owned.hats]);
  const pets = useMemo(() => PETS.map((pet) => ({ pet, own: STARTER_PETS.includes(pet) || owned.pets.includes(pet) })), [owned.pets]);

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
            {HAIRS.map((hair) => (
              <button key={hair} type="button" className={`hc-pick ${hero.hair === hair ? "on" : ""}`} onClick={() => set({ hair })} aria-label={`Hair: ${hair}`}>
                <PixelSprite grid={heroGrid({ ...hero, hair, hat: "none", pet: "none" })} scale={3} />
              </button>
            ))}
          </div>
          <div className="hc-row">
            {HAIR_COLORS.map((c, i) => (
              <button key={c} type="button" className={`swatch ${hero.hairColor === i ? "on" : ""}`} style={{ background: c }} onClick={() => set({ hairColor: i })} aria-label={`Hair color ${i + 1}`} />
            ))}
          </div>
        </section>
        <section>
          <h3>Outfit</h3>
          <div className="hc-row">
            {OUTFITS.map((c, i) => (
              <button key={c} type="button" className={`swatch ${hero.outfit === i ? "on" : ""}`} style={{ background: c }} onClick={() => set({ outfit: i })} aria-label={`Outfit color ${i + 1}`} />
            ))}
          </div>
        </section>
        <section>
          <h3>Hat</h3>
          <div className="hc-row">
            {hats.map(({ hat, own }) => (
              <button
                key={hat}
                type="button"
                className={`hc-pick ${hero.hat === hat ? "on" : ""} ${own ? "" : "locked"}`}
                onClick={() => own && set({ hat })}
                disabled={!own}
                title={own ? HAT_NAMES[hat] : `${HAT_NAMES[hat]}: earn it in the shop`}
              >
                <PixelSprite grid={heroGrid({ ...hero, hat, pet: "none" })} scale={3} />
                {!own && <span className="hc-lock">🔒</span>}
              </button>
            ))}
          </div>
        </section>
        <section>
          <h3>Companion</h3>
          <div className="hc-row">
            {pets.map(({ pet, own }) => {
              const g = petGrid(pet);
              return (
                <button
                  key={pet}
                  type="button"
                  className={`hc-pick pet ${hero.pet === pet ? "on" : ""} ${own ? "" : "locked"}`}
                  onClick={() => own && set({ pet })}
                  disabled={!own}
                  title={own ? PET_NAMES[pet] : `${PET_NAMES[pet]}: earn it in the shop`}
                >
                  {g ? <PixelSprite grid={g} scale={4} /> : <span className="hc-none">✕</span>}
                  {!own && <span className="hc-lock">🔒</span>}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
