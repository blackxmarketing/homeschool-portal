import type { Band, LandId } from "../pixel/world";
import { LEMONADE_LEVELS, levelById as lemonLevel, replay as lemonReplay } from "./lemonade";
import { pizzaParty } from "./pizza";
import { rocketLaunch } from "./rocket";
import { voyage } from "./voyage";
import { bugHunt } from "./bughunt";
import { expedition } from "./expedition";

/**
 * Story mini-games (docs/GAME.md): one per land, played as side quests.
 * Each game has levels per grade band and is scored on the server by
 * replaying the kid's moves, so stars can't be faked.
 */

export interface MiniLevel {
  id: string;
  title: string;
  intro: string;
}

export interface MiniGame {
  id: string;
  title: string;
  icon: string;
  land: LandId;
  blurb: string;
  levels: (band: Band) => MiniLevel[];
  /** Checks a finished game: the stars earned and a score to keep as "best". */
  score: (levelId: string, moves: unknown) => { stars: number; best: number } | null;
}

const asArray = (v: unknown) => (Array.isArray(v) ? v : []);

const LEMONADE: MiniGame = {
  id: "lemonade",
  title: "Lemonade Stand",
  icon: "🍋",
  land: "harbor",
  blurb: "Watch the weather, make the right number of cups, set your price and hit your profit goal.",
  levels: (band) => LEMONADE_LEVELS[band],
  score: (levelId, moves) => {
    const level = lemonLevel(levelId);
    if (!level) return null;
    const choices = asArray(moves).map((m) => {
      const o = (m && typeof m === "object" ? m : {}) as Record<string, unknown>;
      return { made: Number(o.made) || 0, price: Number(o.price) || 0 };
    });
    const r = lemonReplay(level, choices);
    return { stars: r.stars, best: r.profit };
  },
};

/** All games (the ones still being built are left out until they have levels). */
export const GAMES: MiniGame[] = [LEMONADE, pizzaParty, rocketLaunch, voyage, bugHunt, expedition].filter((g): g is MiniGame => !!g);

export const gameById = (id: string) => GAMES.find((g) => g.id === id);
export const gamesForLand = (land: LandId) => GAMES.filter((g) => g.land === land);
