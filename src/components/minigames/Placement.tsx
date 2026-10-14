"use client";

import { useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime } from "../voice";
import { angleGrid, coinsGrid, diceGrid, dotsGrid, linesGrid, shapeGrid, tallyGrid, type CellArt } from "@/lib/minigames/chompers";
import css from "./ChompersGame.module.css";

/** A question as the browser sees it: no answers in it anywhere. */
export interface PublicQuestion {
  rung: number;
  title: string;
  label: string;
  cells: { text: string; art?: CellArt }[];
}

const artCache = new Map<string, ReturnType<typeof dotsGrid>>();
function CellPicture({ art }: { art: CellArt }) {
  const key = `${art.kind}:${art.parts.join(",")}`;
  let grid = artCache.get(key);
  if (!grid) {
    grid =
      art.kind === "dots"
        ? dotsGrid(art.parts[0])
        : art.kind === "tally"
          ? tallyGrid(art.parts[0])
          : art.kind === "dice"
            ? diceGrid(art.parts)
            : art.kind === "shape"
              ? shapeGrid(art.parts[0], art.parts[1])
              : art.kind === "angle"
                ? angleGrid(art.parts[0], art.parts[1] === 1)
                : art.kind === "lines"
                  ? linesGrid(art.parts[0], art.parts[1])
                  : coinsGrid(art.parts);
    artCache.set(key, grid);
  }
  return <PixelSprite grid={grid} scale={4} className={css.cellArt} />;
}

/**
 * The sit-down assessment that works out where an older kid should start.
 *
 * Six squares and a rule, which is the game with the walking taken out. It
 * never says right or wrong on the way through: it is finding out what they
 * know, and a kid who has just been told they got one wrong plays the next
 * one differently.
 */
export default function Placement({ seed, questions, onDone }: { seed: number; questions: PublicQuestion[]; onDone: (r: { rung: number; title: string; right: number; asked: number }) => void }) {
  const [at, setAt] = useState(0);
  const [picks, setPicks] = useState<number[][]>(() => questions.map(() => []));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const q = questions[at];
  const chosen = picks[at] ?? [];

  function toggle(i: number) {
    setPicks((all) => all.map((row, n) => (n === at ? (row.includes(i) ? row.filter((x) => x !== i) : [...row, i]) : row)));
  }

  async function next() {
    if (at + 1 < questions.length) {
      setAt(at + 1);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/place", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ seed, picks }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error ?? "Couldn't save that.");
      chime("streak");
      onDone(d);
    } catch {
      setError("Couldn't save that - check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`mg ${css.ch}`}>
      <div className="mg-hud">
        <span className="chip">
          Question {at + 1} of {questions.length}
        </span>
        <span className="chip">Finding your starting point</span>
      </div>

      <div className={css.rule}>
        <h2 className="pixel-title small">{q.label}</h2>
      </div>
      <p className={css.note}>Tap every square that fits. There is more than one.</p>

      <div className={css.placeRow} role="group" aria-label={q.label}>
        {q.cells.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`${css.cell} ${css.placeCell} ${chosen.includes(i) ? css.picked : ""}`}
            aria-pressed={chosen.includes(i)}
            aria-label={c.text}
            onClick={() => toggle(i)}
          >
            {c.art ? <CellPicture art={c.art} /> : <span>{c.text}</span>}
          </button>
        ))}
      </div>

      <div className="mg-controls">
        <button type="button" className="kbtn big game-btn" onClick={next} disabled={busy}>
          {at + 1 < questions.length ? "Next ▶" : busy ? "Working it out…" : "Finish"}
        </button>
        <span className="kmuted small">{chosen.length ? `${chosen.length} picked` : "Pick none if none of them fit."}</span>
      </div>
      {error && <p className="kmuted small">{error}</p>}
    </div>
  );
}
