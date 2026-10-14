"use client";

import { useState } from "react";
import GameHost from "./GameHost";
import Placement, { type PublicQuestion } from "./Placement";
import type { MiniLevel } from "@/lib/minigames";
import type { Hero, PetId } from "@/lib/pixel/hero";

/**
 * A game's levels, with the sit-down assessment in front of them when the kid
 * needs one.
 *
 * Everybody climbs the same ladder from the bottom. That is right for a
 * six-year-old and insulting for a thirteen-year-old, so older kids answer a
 * handful of questions first and start where the questions ran out - with
 * everything below them unlocked, to go back to whenever they want.
 */
export default function PlayArea({
  game,
  levels,
  progress,
  unlockAt,
  placedAt,
  placement,
  pet,
  hero,
  canAsk,
}: {
  game: string;
  levels: MiniLevel[];
  progress: Record<string, { stars: number; best: number | null; plays: number }>;
  unlockAt?: number;
  /** The rung an assessment put them on, or null if they have not sat one. */
  placedAt: number | null;
  /** The questions to ask, when one is needed. */
  placement: { seed: number; questions: PublicQuestion[] } | null;
  /** The kid's pet, which is who they play as. */
  pet?: PetId;
  /** The kid's whole character, for games they run around in themselves. */
  hero?: Hero;
  /** Whether the AI coach can take questions. */
  canAsk?: boolean;
}) {
  const [placed, setPlaced] = useState(placedAt);
  const [just, setJust] = useState<{ rung: number; title: string; right: number; asked: number } | null>(null);

  if (placed === null && placement) {
    return (
      <div className="game-host">
        <p className="game-intro">
          A few quick questions to find out where to start. Tap every square that fits the rule. You will not be marked on it - it just saves you counting dots for an hour.
        </p>
        <Placement
          seed={placement.seed}
          questions={placement.questions}
          onDone={(r) => {
            setJust(r);
            setPlaced(r.rung);
          }}
        />
      </div>
    );
  }

  return (
    <div className="game-host">
      {just && (
        <p className="game-intro">
          <strong>
            {just.right} of {just.asked} right.
          </strong>{" "}
          Starting you on <strong>{just.title}</strong>. Everything before it is open too, so you can go back over anything you want to brush up.
        </p>
      )}
      <GameHost game={game} levels={levels} progress={progress} unlockAt={unlockAt} openTo={placed ?? 0} pet={pet} hero={hero} canAsk={canAsk} />
    </div>
  );
}
