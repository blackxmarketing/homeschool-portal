/** Every mini-game screen gets the level to play and reports the kid's moves when the game ends. */
export interface MiniGameUIProps {
  levelId: string;
  /** Sends the moves to the server, which replays them; resolves with the stars earned and XP. */
  onFinish: (moves: unknown) => Promise<{ stars: number; xp: number }>;
}
