/** Every mini-game screen gets the level to play and reports the kid's moves when the game ends. */
export interface MiniGameUIProps {
  levelId: string;
  /**
   * Sends the moves to the server, which replays them; resolves with the stars
   * earned, the XP, and the score the server worked out. Show `score` rather
   * than a tally kept in the browser: the server's is the one that was saved.
   */
  onFinish: (moves: unknown) => Promise<{ stars: number; xp: number; score?: number }>;
  /** Stars already earned on this level, for games that unlock something at three. */
  stars?: number;
  /** How many times this level has been played, for games that ease off after a few goes. */
  plays?: number;
}
