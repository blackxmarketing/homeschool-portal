import { bandFor, type Band, type LandId } from "../pixel/world";
import type { Evidence } from "../masteryMeter";
import { LEMONADE_LEVELS, levelById as lemonLevel, replay as lemonReplay } from "./lemonade";
import { pizzaParty } from "./pizza";
import { rocketLaunch } from "./rocket";
import { voyage } from "./voyage";
import { bugHunt } from "./bughunt";
import { expedition } from "./expedition";
import { critters } from "./critters";
import { numberHop } from "./numberhop";
import { chompers } from "./chompers";
import { factRush } from "./factrush";
import { coinShop } from "./coinshop";
import { arrayGarden } from "./arraygarden";
import { treasureGrid } from "./treasuregrid";
import { wordBuilder } from "./wordbuilder";
import { sentenceSmith } from "./sentencesmith";
import { habitatRescue } from "./habitat";
import { weatherWatch } from "./weather";
import { sproutLab } from "./sproutlab";
import { circuitBuilder } from "./circuit";
import { mapQuest } from "./mapquest";
import { palabras } from "./palabras";

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
  /** K-5 games: the grades it has levels for (0 = kindergarten), and those levels. Without these, levels go by grade band. */
  grades?: number[];
  /**
   * Stars needed on a level before the next one opens. One by default: have a
   * go and move on. A drill game sets it to three, so nobody runs ahead of
   * facts they do not know yet.
   */
  unlockAt?: number;
  /**
   * The game says the level's intro itself - a teacher reading it out, say -
   * so the chrome above the game should not print it a second time.
   */
  ownIntro?: boolean;
  /**
   * This game has a sit-down assessment to place older kids part way up its
   * ladder. Only the game that owns the questions may ask them.
   */
  placement?: boolean;
  /** K-5 games: which subject zone of the world they sit in. */
  subject?: "math" | "ela" | "sci" | "soc" | "span";
  levelsForGrade?: (grade: number) => MiniLevel[];
  /** Checks a finished game: the stars earned and a score to keep as "best". */
  /**
   * Checks a finished game. `saved` is what the kid was carrying into it, for
   * the games that carry anything; the rest ignore it.
   */
  score: (levelId: string, moves: unknown, saved?: number) => { stars: number; best: number } | null;
  /**
   * What this run did to the kid's coins: picked up, less anything spent.
   * Read from the replayed moves on the server, never from the browser.
   */
  coins?: (levelId: string, moves: unknown, saved: number) => number;
  /**
   * What the game saw the kid show, for the mastery meter. Optional: a game
   * that only earns stars leaves it out. Read on the server from the replayed
   * moves, never from anything the browser claims.
   */
  evidence?: (levelId: string, moves: unknown) => GameEvidence[];
}

/** One thing a game saw a kid do, named in the same words the lessons use. */
export interface GameEvidence extends Evidence {
  /** The course the skill belongs to, e.g. "math". */
  subject: string;
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
export const GAMES: MiniGame[] = [
  LEMONADE, pizzaParty, rocketLaunch, voyage, bugHunt, expedition,
  // Grades K-5
  critters, numberHop, chompers, factRush, coinShop, arrayGarden, treasureGrid, wordBuilder, sentenceSmith, habitatRescue, weatherWatch, sproutLab, circuitBuilder, mapQuest, palabras,
].filter((g): g is MiniGame => !!g);

/** The levels a kid plays: their own grade's levels when the game has them, otherwise their grade band's. */
export function levelsForKid(game: MiniGame, grade: number): MiniLevel[] {
  if (game.levelsForGrade && game.grades?.includes(grade)) return game.levelsForGrade(grade);
  // Band levels start at grade 4 (the easiest band is grades 4-5). A game may
  // have both: its own grade levels for K-5 and band levels for 6-12.
  return grade < 4 ? [] : game.levels(bandFor(grade));
}

/** Every level a kid may score: their own, plus (in grades K-5) the levels of earlier worlds they can revisit. */
export function levelsKidMayPlay(game: MiniGame, grade: number): MiniLevel[] {
  const own = levelsForKid(game, grade);
  if (grade > 5 || !game.levelsForGrade || !game.grades) return own;
  const earlier = game.grades.filter((g) => g < grade).flatMap((g) => game.levelsForGrade!(g));
  return [...own, ...earlier];
}

/** Games with levels for a grade (the K-5 worlds' arcades). */
export const gamesForGrade = (grade: number) => GAMES.filter((g) => levelsForKid(g, grade).length > 0);

export const gameById = (id: string) => GAMES.find((g) => g.id === id);
export const gamesForLand = (land: LandId) => GAMES.filter((g) => g.land === land);
