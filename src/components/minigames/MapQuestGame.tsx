"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useAutoRead, useStopOnUnmount, useTeacherVoice, useVoiceSettings } from "../voice";
import { heroGrid, DEFAULT_HERO } from "@/lib/pixel/hero";
import type { Grid } from "@/lib/pixel/grid";
import {
  DELTA,
  DIRS,
  MAX_TRIES,
  PIN_LATS,
  PIN_LONS,
  REGION_NAME,
  THING_NAME,
  US_H,
  US_W,
  WORLD_H,
  WORLD_W,
  checkTry,
  coordName,
  latName,
  levelById,
  lonName,
  mapGrid,
  maxSteps,
  nameAt,
  pinName,
  scoreRound,
  simulate,
  solvePath,
  tappable,
  terrainGrid,
  thingGrid,
  usAt,
  usGrid,
  worldAt,
  worldGrid,
  type Cell,
  type Dir,
  type MapLevel,
  type RegionId,
  type Round,
  type RoundMove,
  type TileMap,
  type Try,
} from "@/lib/minigames/mapquest";
import type { MiniGameUIProps } from "./types";
import css from "./MapQuestGame.module.css";

const HERO = heroGrid({ ...DEFAULT_HERO, hat: "explorer" });
const BIRD = thingGrid("bird");
const ARROW: Record<Dir, string> = { N: "↑", S: "↓", E: "→", W: "←", NE: "↗", NW: "↖", SE: "↘", SW: "↙" };
const KID_LABEL: Partial<Record<Dir, string>> = { N: "Up", S: "Down", E: "Right", W: "Left" };

let worldPic: Grid | null = null;
let globePic: Grid | null = null;
let usPic: Grid | null = null;
const worldImg = () => (worldPic ??= worldGrid(false));
const globeImg = () => (globePic ??= worldGrid(true));
const usImg = () => (usPic ??= usGrid());

/** Where each region's label goes (the middle of its cells). */
function centers(w: number, h: number, at: (c: number, r: number) => RegionId | null): Map<RegionId, [number, number]> {
  const sum = new Map<RegionId, [number, number, number]>();
  for (let r = 0; r < h; r++)
    for (let c = 0; c < w; c++) {
      const g = at(c, r);
      if (!g) continue;
      const s = sum.get(g) ?? [0, 0, 0];
      sum.set(g, [s[0] + c + 0.5, s[1] + r + 0.5, s[2] + 1]);
    }
  const out = new Map<RegionId, [number, number]>();
  for (const [g, [x, y, n]] of sum) out.set(g, [x / n / w, y / n / h]);
  // The Pacific wraps around the map edges; put its label on the left side.
  if (out.has("PAC")) out.set("PAC", [0.1, 0.5]);
  return out;
}
const WORLD_CENTERS = centers(WORLD_W, WORLD_H, worldAt);
const US_CENTERS = centers(US_W, US_H, usAt);

const pct = (n: number) => `${n * 100}%`;
const short = (name: string) => name.replace(/^(the|a) /, "");

type Note = { text: string; good: boolean };
type Mark = { cell: Cell; kind: "good" | "bad" | "answer" | "goal" | "path" };

export default function MapQuestGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <MapQuest level={level} onFinish={onFinish} /> : null;
}

function MapQuest({ level, onFinish }: { level: MapLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const [ri, setRi] = useState(0);
  const round = level.rounds[ri];
  const [tries, setTries] = useState<Try[]>([]);
  const [over, setOver] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [plan, setPlan] = useState<Dir[]>([]);
  const [heroAt, setHeroAt] = useState<Cell | null>(round.kind === "walk" ? round.start : null);
  const [walking, setWalking] = useState(false);
  const [bumped, setBumped] = useState(false);
  const [lastTap, setLastTap] = useState<Cell | null>(null);
  const [picked, setPicked] = useState<[number, number] | null>(null);
  const [found, setFound] = useState<RegionId[]>([]);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { speakOn } = useVoiceSettings();
  const voice = useTeacherVoice();
  const young = level.grade <= 2;
  const kid = level.words === "kid";
  useStopOnUnmount();
  useAutoRead(`mq-${level.id}-${ri}`, done || !young ? null : ri === 0 ? `${level.intro.replace(/^Skill: /, "")} ${round.say}` : round.say);
  useEffect(() => () => void (timer.current && clearInterval(timer.current)), []);

  const say = (id: string, text: string) => {
    if (young && speakOn && text) speak(id, text, { kind: voice });
  };

  const points = moves.reduce((s, m, i) => s + scoreRound(level, level.rounds[i], m).points, 0);
  const max = level.rounds.length * 2;

  function submit(tr: Try) {
    if (over) return;
    const c = checkTry(level, round, tr);
    const all = [...tries, tr];
    setTries(all);
    if (c.ok) {
      chime(all.length === 1 ? "streak" : "right");
      setNote({ text: c.note, good: true });
      say(`mq-ok-${ri}`, c.note);
      endRound(all);
      return;
    }
    chime("oops");
    if (all.length >= MAX_TRIES) {
      const ans = answerText(round);
      setNote({ text: `${c.note} ${ans}`, good: false });
      say(`mq-ans-${ri}`, `${c.note} ${ans}`);
      endRound(all);
      return;
    }
    const text = `${c.note} Try again!`;
    setNote({ text, good: false });
    say(`mq-no-${ri}-${all.length}`, text);
  }

  function endRound(all: Try[]) {
    setOver(true);
    setMoves((m) => [...m, { tries: all }]);
    if (round.kind === "region") setFound((f) => [...f, round.target]);
  }

  function answerText(r: Round): string {
    switch (r.kind) {
      case "tap":
        return "Look at the glowing square: that's the answer.";
      case "walk": {
        const p = solvePath(r) ?? [];
        return `Here's one way: ${p.map((d) => ARROW[d]).join(" ")} (follow the dots).`;
      }
      case "region":
        return `Here it is: ${REGION_NAME[r.target]}.`;
      case "pin":
        return `The answer is the green pin at ${pinName(r.lat, r.lon)}.`;
    }
  }

  // ---------- tapping a map square ----------
  function tapCell(x: number, y: number) {
    if (over || round.kind !== "tap") return;
    if (!tappable(round.map, x, y)) {
      setNote({ text: "Tap one of the pictures!", good: false });
      return;
    }
    setLastTap([x, y]);
    submit({ at: [x, y] });
  }

  // ---------- planning a walk ----------
  function resetWalker() {
    if (round.kind === "walk") setHeroAt(round.start);
    setBumped(false);
  }
  function addStep(d: Dir) {
    if (over || walking || round.kind !== "walk" || plan.length >= 24) return;
    resetWalker();
    setPlan((p) => [...p, d]);
  }
  function undo() {
    if (walking) return;
    resetWalker();
    setPlan((p) => p.slice(0, -1));
  }
  function clear() {
    if (walking) return;
    resetWalker();
    setPlan([]);
  }
  function go() {
    if (over || walking || round.kind !== "walk" || plan.length === 0) return;
    const sim = simulate(round, plan);
    const path = [...plan];
    setHeroAt(round.start);
    setBumped(false);
    setWalking(true);
    let i = 0;
    timer.current = setInterval(() => {
      if (i < sim.cells.length) {
        setHeroAt(sim.cells[i]);
        i++;
        return;
      }
      if (timer.current) clearInterval(timer.current);
      timer.current = null;
      setWalking(false);
      if (sim.bump >= 0) setBumped(true);
      submit({ path });
    }, 280);
  }

  // ---------- world, U.S. and globe ----------
  function tapPicture(e: React.MouseEvent<HTMLElement>, cols: number, rows: number) {
    if (over) return;
    const box = e.currentTarget.getBoundingClientRect();
    const fx = (e.clientX - box.left) / box.width;
    const fy = (e.clientY - box.top) / box.height;
    if (round.kind === "region") {
      const c = Math.min(cols - 1, Math.max(0, Math.floor(fx * cols)));
      const r = Math.min(rows - 1, Math.max(0, Math.floor(fy * rows)));
      if (round.map === "usa" && !usAt(c, r)) {
        setNote({ text: "Tap inside the United States.", good: false });
        return;
      }
      setLastTap([c, r]);
      submit({ at: [c, r] });
    } else if (round.kind === "pin") {
      const lon = Math.round((fx * 360 - 180) / 30) * 30;
      const lat = Math.round((90 - fy * 180) / 30) * 30;
      setPicked([Math.max(-150, Math.min(150, lon)), Math.max(-60, Math.min(60, lat))]);
      setNote(null);
    }
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      const nr = level.rounds[ri + 1];
      setRi(ri + 1);
      setTries([]);
      setOver(false);
      setNote(null);
      setPlan([]);
      setHeroAt(nr.kind === "walk" ? nr.start : null);
      setBumped(false);
      setLastTap(null);
      setPicked(null);
      return;
    }
    setDone(true);
    setBusy(true);
    try {
      const res = await onFinish(moves);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`mg ${css.quest}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Quest complete!</h2>
          <p>
            You earned <strong>{points}</strong> of {max} map points.
          </p>
          {busy && <p className="kmuted">Checking your map…</p>}
          {result && (
            <>
              <div className="mg-stars" aria-label={`${result.stars} of 3 stars`}>
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`star ${result.stars >= n ? "lit pop" : ""}`} style={{ animationDelay: `${n * 0.15}s` }}>
                    ★
                  </span>
                ))}
              </div>
              {result.xp > 0 && <p className="kmuted">+{result.xp} XP for new stars!</p>}
              {result.stars < 3 && <p className="kmuted small">Tip: getting it right on the first try earns the most points. Take your time and check the map before you tap.</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => {
              const p = scoreRound(level, level.rounds[i], m).points;
              return (
                <span key={i}>
                  {i + 1}. {p === 2 ? "⭐⭐" : p === 1 ? "⭐" : "🗺️"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Marks on a tile map.
  const marks: Mark[] = [];
  if (round.kind === "walk") {
    const goalHasThing = round.map.things.some((t) => t.x === round.goal[0] && t.y === round.goal[1]);
    if (!goalHasThing && !round.map.grid) marks.push({ cell: round.goal, kind: "goal" });
    if (over && moves.length && scoreRound(level, round, moves[moves.length - 1]).points === 0) {
      let [x, y] = round.start;
      for (const d of solvePath(round) ?? []) {
        x += DELTA[d][0];
        y += DELTA[d][1];
        marks.push({ cell: [x, y], kind: "path" });
      }
    }
  }
  if (round.kind === "tap") {
    if (lastTap) marks.push({ cell: lastTap, kind: over && round.targets.some((c) => c[0] === lastTap[0] && c[1] === lastTap[1]) ? "good" : "bad" });
    if (over && moves.length && scoreRound(level, round, moves[moves.length - 1]).points === 0) for (const c of round.targets) marks.push({ cell: c, kind: "answer" });
  }

  const roundScore = over && moves.length ? scoreRound(level, round, moves[moves.length - 1]).points : 0;

  return (
    <div className={`mg ${css.quest}`}>
      <div className="mg-hud">
        <span className="chip">
          🗺️ {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
        {!over && tries.length > 0 && <span className="chip">Try {tries.length + 1} of {MAX_TRIES}</span>}
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <p className={css.ask}>
        {round.say}
        <SayButton id={`mq-say-${level.id}-${ri}`} text={round.say} />
      </p>

      {(round.kind === "tap" || round.kind === "walk") && (
        <TileView
          map={round.map}
          onTap={round.kind === "tap" && !over ? tapCell : undefined}
          walker={round.kind === "walk" && heroAt ? { at: heroAt, who: round.who ?? "hero", bumped } : null}
          marks={marks}
        />
      )}
      {round.kind === "region" && (
        <RegionView kind={round.map} found={found} lastTap={lastTap} over={over} ok={roundScore > 0} answer={over && roundScore === 0 ? round.target : null} onTap={tapPicture} />
      )}
      {round.kind === "pin" && <GlobeView picked={picked} answer={over ? [round.lon, round.lat] : null} onTap={tapPicture} />}

      {round.kind === "walk" && !over && (
        <WalkPad dirs={round.dirs} kid={kid} plan={plan} limit={maxSteps(round)} walking={walking} onStep={addStep} onUndo={undo} onClear={clear} onGo={go} showLimit={round.slack === 0} />
      )}

      {round.kind === "pin" && !over && (
        <button type="button" className={`kbtn big game-btn ${css.wide}`} disabled={!picked} onClick={() => picked && submit({ at: picked })}>
          {picked ? `📍 Drop the pin at ${pinName(picked[1], picked[0])}` : "Tap the map where the lines cross"}
        </button>
      )}

      {note && (
        <div className={`day-report ${note.good ? "good" : "bad"} ${css.note}`} role="status">
          {over && note.good && <strong>{roundScore === 2 ? "First try! " : "You got it! "}</strong>}
          {note.text}
          {young && note.text && <SayButton id={`mq-note-${ri}-${tries.length}`} text={note.text} />}
        </div>
      )}

      {over && (
        <button type="button" className={`kbtn big game-btn ${css.wide}`} onClick={next}>
          {ri + 1 < level.rounds.length ? "Next ➜" : "Finish 🎉"}
        </button>
      )}
    </div>
  );
}

// ---------------- A tile map (picture maps, towns, grid maps) ----------------

function TileView({
  map,
  onTap,
  walker,
  marks,
}: {
  map: TileMap;
  onTap?: (x: number, y: number) => void;
  walker: { at: Cell; who: "hero" | "bird"; bumped: boolean } | null;
  marks: Mark[];
}) {
  const pic = useMemo(() => mapGrid(map), [map]);
  const cell = (x: number, y: number) => ({ left: pct(x / map.w), top: pct(y / map.h), width: pct(1 / map.w), height: pct(1 / map.h) });
  const label = (x: number, y: number) => {
    const n = nameAt(map, x, y);
    return map.grid ? `${coordName(x, y)}${n ? `, ${n}` : ""}` : (n ?? "empty");
  };

  const board = (
    <div className={`${css.board} ${map.scene !== "top" ? css.side : ""}`} style={{ aspectRatio: `${map.w} / ${map.h}` }}>
      <PixelSprite grid={pic} scale={1} className={css.pic} title={map.scene === "room" ? "A picture map of a bedroom" : map.scene === "park" ? "A picture map of a playground" : "A map"} />
      {marks.map((m, i) => (
        <span key={i} className={`${css.mark} ${css[m.kind]}`} style={cell(m.cell[0], m.cell[1])} aria-hidden />
      ))}
      {onTap &&
        Array.from({ length: map.h }, (_, y) =>
          Array.from({ length: map.w }, (_, x) => (
            <button key={`${x}-${y}`} type="button" className={css.cellBtn} style={cell(x, y)} onClick={() => onTap(x, y)} aria-label={label(x, y)} />
          )),
        )}
      {walker && (
        <span className={`${css.walker} ${walker.bumped ? css.bump : ""}`} style={cell(walker.at[0], walker.at[1])} aria-label={`You are at ${map.grid ? coordName(...walker.at) : "the start"}`}>
          <PixelSprite grid={walker.who === "bird" ? BIRD : HERO} scale={1} className={css.walkerImg} />
        </span>
      )}
    </div>
  );

  return (
    <div className={css.mapArea}>
      {map.grid ? (
        <div className={css.gridWrap} style={{ gridTemplateColumns: `18px minmax(0, 1fr)` }}>
          <span />
          <div className={css.colLabels} style={{ gridTemplateColumns: `repeat(${map.w}, 1fr)` }}>
            {Array.from({ length: map.w }, (_, x) => (
              <span key={x}>{"ABCDEFGHIJ"[x]}</span>
            ))}
          </div>
          <div className={css.rowLabels} style={{ gridTemplateRows: `repeat(${map.h}, 1fr)` }}>
            {Array.from({ length: map.h }, (_, y) => (
              <span key={y}>{y + 1}</span>
            ))}
          </div>
          {board}
        </div>
      ) : (
        board
      )}
      {(map.compass || map.key || map.miles) && (
        <div className={css.legend}>
          {map.compass && <Compass points={map.compass} />}
          {map.miles && (
            <span className={css.scale}>
              <span className={css.scaleBar} /> 1 square = 1 mile
            </span>
          )}
          {map.key && <MapKey map={map} />}
        </div>
      )}
    </div>
  );
}

function MapKey({ map }: { map: TileMap }) {
  const kinds = [...new Set(map.things.map((t) => t.k))].filter((k) => k !== "flag");
  const terr = [...new Set(map.terrain.join("").split(""))].filter((c) => "wrbs".includes(c));
  const TER: Record<string, string> = { w: "water", r: "road", b: "bridge", s: "sand" };
  return (
    <div className={css.key} aria-label="Map key">
      <span className={css.keyTitle}>Map key</span>
      {kinds.map((k) => (
        <span key={k} className={css.keyItem}>
          <PixelSprite grid={thingGrid(k)} scale={2} />
          {short(THING_NAME[k])}
        </span>
      ))}
      {terr.map((c) => (
        <span key={c} className={css.keyItem}>
          <PixelSprite grid={terrainGrid(c)} scale={2} />
          {TER[c]}
        </span>
      ))}
    </div>
  );
}

function Compass({ points }: { points: 4 | 8 }) {
  const all: [string, number, number][] = [
    ["N", 1, 0],
    ["S", 1, 2],
    ["W", 0, 1],
    ["E", 2, 1],
  ];
  if (points === 8) all.push(["NW", 0, 0], ["NE", 2, 0], ["SW", 0, 2], ["SE", 2, 2]);
  return (
    <span className={`${css.compass} ${points === 8 ? css.compass8 : ""}`} aria-label={points === 8 ? "Compass rose with 8 directions" : "Compass rose: north is up"}>
      {all.map(([l, x, y]) => (
        <span key={l} style={{ gridColumn: x + 1, gridRow: y + 1 }} className={l === "N" ? css.north : l.length === 2 ? css.mid : ""}>
          {l}
        </span>
      ))}
      <span style={{ gridColumn: 2, gridRow: 2 }} className={css.star}>
        ✦
      </span>
    </span>
  );
}

// ---------------- Planning a walk ----------------

function WalkPad({
  dirs,
  kid,
  plan,
  limit,
  walking,
  showLimit,
  onStep,
  onUndo,
  onClear,
  onGo,
}: {
  dirs: keyof typeof DIRS;
  kid: boolean;
  plan: Dir[];
  limit: number;
  walking: boolean;
  showLimit: boolean;
  onStep: (d: Dir) => void;
  onUndo: () => void;
  onClear: () => void;
  onGo: () => void;
}) {
  const POS: Record<Dir, [number, number]> = { NW: [1, 1], N: [2, 1], NE: [3, 1], W: [1, 2], E: [3, 2], SW: [1, 3], S: [2, 3], SE: [3, 3] };
  const btnLabel = (d: Dir) => (kid ? KID_LABEL[d] : d);
  return (
    <div className={css.walkBox}>
      <div className={css.plan} aria-label="Your plan" aria-live="polite">
        {plan.length === 0 ? (
          <span className="kmuted small">{kid ? "Tap the arrows to plan your walk." : "Tap the direction buttons to plan your route."}</span>
        ) : (
          plan.map((d, i) => (
            <span key={i} className={css.stepChip} title={kid ? KID_LABEL[d] : d}>
              {ARROW[d]}
            </span>
          ))
        )}
        {showLimit && plan.length > 0 && <span className={css.count}>{plan.length} step{plan.length === 1 ? "" : "s"}</span>}
        {!showLimit && plan.length > limit && <span className={css.count}>{plan.length} steps</span>}
      </div>
      <div className={css.walkRow}>
        {dirs === "lr" ? (
          <div className={css.lrPad}>
            <button type="button" className={`kbtn game-btn ${css.dirBtn}`} onClick={() => onStep("W")} disabled={walking} aria-label="Left">
              ← Left
            </button>
            <button type="button" className={`kbtn game-btn ${css.dirBtn}`} onClick={() => onStep("E")} disabled={walking} aria-label="Right">
              Right →
            </button>
          </div>
        ) : (
          <div className={css.pad}>
            {DIRS[dirs].map((d) => (
              <button
                key={d}
                type="button"
                className={`kbtn game-btn ${css.dirBtn} ${d.length === 2 ? css.diag : ""}`}
                style={{ gridColumn: POS[d][0], gridRow: POS[d][1] }}
                onClick={() => onStep(d)}
                disabled={walking}
                aria-label={kid ? KID_LABEL[d] : DIR_LABEL[d]}
              >
                <span className={css.arrow}>{ARROW[d]}</span>
                <span className={css.dirName}>{btnLabel(d)}</span>
              </button>
            ))}
            <span className={css.padHub} style={{ gridColumn: 2, gridRow: 2 }} aria-hidden>
              🧭
            </span>
          </div>
        )}
        <div className={css.actions}>
          <button type="button" className={`kbtn big game-btn ${css.goBtn}`} onClick={onGo} disabled={walking || plan.length === 0}>
            Go ▶
          </button>
          <div className={css.row}>
            <button type="button" className="kbtn ghost" onClick={onUndo} disabled={walking || plan.length === 0} aria-label="Undo the last step">
              ↶ Undo
            </button>
            <button type="button" className="kbtn ghost" onClick={onClear} disabled={walking || plan.length === 0}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const DIR_LABEL: Record<Dir, string> = { N: "North", S: "South", E: "East", W: "West", NE: "Northeast", NW: "Northwest", SE: "Southeast", SW: "Southwest" };

// ---------------- World and U.S. maps ----------------

function RegionView({
  kind,
  found,
  lastTap,
  over,
  ok,
  answer,
  onTap,
}: {
  kind: "world" | "usa";
  found: RegionId[];
  lastTap: Cell | null;
  over: boolean;
  ok: boolean;
  answer: RegionId | null;
  onTap: (e: React.MouseEvent<HTMLElement>, cols: number, rows: number) => void;
}) {
  const world = kind === "world";
  const pic = world ? worldImg() : usImg();
  const cols = world ? WORLD_W : US_W;
  const rows = world ? WORLD_H : US_H;
  const where = world ? WORLD_CENTERS : US_CENTERS;
  return (
    <div className={css.mapArea}>
      <div className={`${css.board} ${css.picture}`} style={{ aspectRatio: `${pic.w} / ${pic.h}` }}>
        <PixelSprite grid={pic} scale={1} className={css.pic} title={world ? "A map of the world" : "A map of the United States"} />
        <button type="button" className={css.wholeBtn} onClick={(e) => onTap(e, cols, rows)} aria-label={world ? "Tap a continent or ocean" : "Tap a region"} disabled={over} />
        {lastTap && (
          <span
            className={`${css.dot} ${over && ok ? css.good : css.bad}`}
            style={{ left: pct((lastTap[0] + 0.5) / cols), top: pct((lastTap[1] + 0.5) / rows) }}
            aria-hidden
          />
        )}
        {[...found, ...(answer && !found.includes(answer) ? [answer] : [])].map((g) => {
          const c = where.get(g);
          return c ? (
            <span key={g} className={`${css.regionLabel} ${g === answer ? css.answerLabel : ""}`} style={{ left: pct(c[0]), top: pct(c[1]) }}>
              {short(REGION_NAME[g])}
            </span>
          ) : null;
        })}
      </div>
      {!world && <p className="kmuted small">The blue square in the Midwest is Lake Michigan, one of the Great Lakes. Each color is one region.</p>}
      {world && <span className={css.legend}><Compass points={4} /></span>}
    </div>
  );
}

function GlobeView({ picked, answer, onTap }: { picked: [number, number] | null; answer: [number, number] | null; onTap: (e: React.MouseEvent<HTMLElement>, cols: number, rows: number) => void }) {
  const pic = globeImg();
  // The lines sit on pixel columns/rows; place pins on their centers.
  const pos = (lon: number, lat: number) => ({ left: pct(((3 * (lon + 180)) / 10 + 0.5) / pic.w), top: pct(((3 * (90 - lat)) / 10 + 0.5) / pic.h) });
  const right = answer && picked && picked[0] === answer[0] && picked[1] === answer[1];
  return (
    <div className={css.mapArea}>
      <div className={css.globeWrap}>
        <div className={css.latLabels}>
          {PIN_LATS.map((lat) => (
            <span key={lat} style={{ top: pos(0, lat).top }}>
              {latName(lat)}
            </span>
          ))}
        </div>
        <div className={`${css.board} ${css.picture}`} style={{ aspectRatio: `${pic.w} / ${pic.h}` }}>
          <PixelSprite grid={pic} scale={1} className={css.pic} title="A world map with latitude and longitude lines every 30 degrees" />
          {PIN_LATS.flatMap((lat) => PIN_LONS.map((lon) => <span key={`${lat}/${lon}`} className={css.cross} style={pos(lon, lat)} aria-hidden />))}
          <button type="button" className={css.wholeBtn} onClick={(e) => onTap(e, WORLD_W, WORLD_H)} aria-label="Tap where two lines cross to place your pin" disabled={!!answer} />
          {picked && !(answer && right) && (
            <span className={`${css.pin} ${answer ? css.pinWrong : ""}`} style={pos(picked[0], picked[1])} aria-hidden>
              📍
            </span>
          )}
          {answer && (
            <span className={`${css.pin} ${css.pinRight}`} style={pos(answer[0], answer[1])} aria-hidden>
              📍
            </span>
          )}
        </div>
        <span />
        <div className={css.lonLabels}>
          {PIN_LONS.filter((l) => l % 60 === 0).map((lon) => (
            <span key={lon} style={{ left: pos(lon, 0).left }}>
              {lonName(lon)}
            </span>
          ))}
        </div>
      </div>
      <p className="kmuted small">
        Yellow lines: the <strong>Equator</strong> (0° latitude) and the <strong>Prime Meridian</strong> (0° longitude). Other lines are every 30°.
      </p>
    </div>
  );
}

