"use client";

import { useState } from "react";
import GameHost from "./GameHost";
import Placement, { type PublicQuestion } from "./Placement";
import SpellPlacement from "./SpellPlacement";
import type { SpellCheck } from "@/lib/minigames/spellrush";
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
  coins,
  canAsk,
}: {
  game: string;
  levels: MiniLevel[];
  progress: Record<string, { stars: number; best: number | null; plays: number }>;
  unlockAt?: number;
  /** The rung an assessment put them on, or null if they have not sat one. */
  placedAt: number | null;
  /**
   * The check to sit, when one is needed. Each drill game asks its own kind:
   * squares that fit a rule, or words to spell.
   */
  placement: ({ seed: number } & ({ kind: "cells"; questions: PublicQuestion[] } | { kind: "spell"; questions: SpellCheck[] })) | null;
  /** The kid's pet, which is who they play as. */
  pet?: PetId;
  /** The kid's whole character, for games they run around in themselves. */
  hero?: Hero;
  /** Coins the kid is carrying in this game. */
  coins?: number;
  /** Whether the AI coach can take questions. */
  canAsk?: boolean;
}) {
  const [placed, setPlaced] = useState(placedAt);
  const [just, setJust] = useState<{ rung: number; title: string; right: number; asked: number } | null>(null);

  if (placed === null && placement) {
    const done = (r: { rung: number; title: string; right: number; asked: number }) => {
      setJust(r);
      setPlaced(r.rung);
    };
    return (
      <div className="game-host">
        <p className="game-intro">
          {placement.kind === "spell"
            ? "A few words to find out where to start. The teacher says one, you type it. You will not be marked on it - it just saves you spelling cat for a week."
            : "A few quick questions to find out where to start. Tap every square that fits the rule. You will not be marked on it - it just saves you counting dots for an hour."}
        </p>
        {placement.kind === "spell" ? (
          <SpellPlacement seed={placement.seed} questions={placement.questions} onDone={done} />
        ) : (
          <Placement seed={placement.seed} questions={placement.questions} onDone={done} />
        )}
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
      <GameHost game={game} levels={levels} progress={progress} unlockAt={unlockAt} openTo={placed ?? 0} pet={pet} hero={hero} coins={coins} canAsk={canAsk} />
    </div>
  );
}
