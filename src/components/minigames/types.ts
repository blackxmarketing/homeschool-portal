import type { Hero, PetId } from "@/lib/pixel/hero";

/** Every mini-game screen gets the level to play and reports the kid's moves when the game ends. */
export interface MiniGameUIProps {
  levelId: string;
  /**
   * Sends the moves to the server, which replays them; resolves with the stars
   * earned, the XP, and the score the server worked out. Show `score` rather
   * than a tally kept in the browser: the server's is the one that was saved.
   */
  onFinish: (moves: unknown) => Promise<{
    stars: number;
    xp: number;
    score?: number;
    coins?: number;
    level?: number;
    rank?: string;
    unlocked?: string[];
    mastered?: boolean;
    justMastered?: boolean;
  }>;
  /** Stars already earned on this level, for games that unlock something at three. */
  stars?: number;
  /** How many times this level has been played, for games that ease off after a few goes. */
  plays?: number;
  /** The kid's pet, so a game can use it as the character they steer. */
  pet?: PetId;
  /** The kid's whole character, for games they run around in themselves. */
  hero?: Hero;
  /** Coins the kid is carrying in this game, for the games that carry any. */
  coins?: number;
  /** This level has already been mastered, so there is nothing left to earn. */
  mastered?: boolean;
  /** Start this level again from the beginning. */
  onReplay?: () => void;
  /** Leave the level and go back to the list. */
  onQuit?: () => void;
  /** Whether the AI coach can take questions, for games that let a kid ask. */
  canAsk?: boolean;
}
