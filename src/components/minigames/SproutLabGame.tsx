"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PixelSprite } from "../pixel/PixelArt";
import { chime, speak, SayButton, useTeacherVoice, useVoiceSettings } from "../voice";
import type { Grid } from "@/lib/pixel/grid";
import {
  DAYS,
  KINDS,
  KIND_INFO,
  MAX_TRIES,
  ORGS,
  PARTS,
  PART_INFO,
  ROLE_NAMES,
  VARS,
  WEBS,
  answerFor,
  checkStep,
  encodeDesign,
  encodeSort,
  grow,
  grownGrid,
  levelById,
  modelChain,
  parseDesign,
  partGrid,
  potGrid,
  promptFor,
  scoreRound,
  seedOf,
  seedlingGrid,
  shuffled,
  stepCount,
  teachFor,
  type BuildPlant,
  type Kind,
  type Part,
  type RoundMove,
  type Setup,
  type SproutLevel,
  type SproutRound,
  type VarSet,
} from "@/lib/minigames/sproutlab";
import type { MiniGameUIProps } from "./types";
import css from "./SproutLabGame.module.css";

/** Sprites are reused a lot, so they're cached. */
const cache = new Map<string, Grid>();
function cached(key: string, make: () => Grid): Grid {
  let g = cache.get(key);
  if (!g) cache.set(key, (g = make()));
  return g;
}
const part = (p: Part, plant: BuildPlant) => cached(`part-${p}-${plant}`, () => partGrid(p, plant));
const seedling = (k: Kind) => cached(`seed-${k}`, () => seedlingGrid(k));
const grown = (k: Kind) => cached(`grown-${k}`, () => grownGrid(k));
const pot = (set: VarSet, s: Setup, day: number) => cached(`pot-${set}-${s.join()}-${day}`, () => potGrid(set, s, day));

type Phase = "play" | "grow" | "solved";
type Note = { text: string; good: boolean } | null;

export default function SproutLabGame({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <SproutLab level={level} onFinish={onFinish} /> : null;
}

/** The pots a design round starts with. */
const startPots = (r: SproutRound): [Setup, Setup] => (r.kind === "design" || r.kind === "spot" ? [[...r.a], [...r.b]] : [[], []]);

function SproutLab({ level, onFinish }: { level: SproutLevel; onFinish: MiniGameUIProps["onFinish"] }) {
  const { speakOn } = useVoiceSettings();
  const voice = useTeacherVoice();
  const [ri, setRi] = useState(0);
  const r = level.rounds[Math.min(ri, level.rounds.length - 1)];
  const [step, setStep] = useState(0);
  const [tries, setTries] = useState<string[][]>([]);
  const [phase, setPhase] = useState<Phase>("play");
  const [note, setNote] = useState<Note>(null);
  const [moves, setMoves] = useState<RoundMove[]>([]);
  const [result, setResult] = useState<{ stars: number; xp: number } | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  // Per-round hands-on state
  const [pots, setPots] = useState<[Setup, Setup]>(() => startPots(r));
  const [day, setDay] = useState(0);
  const [tags, setTags] = useState<Record<string, string>>({});
  const [path, setPath] = useState<string[]>(["sun"]);
  const [typed, setTyped] = useState("");
  const [weighed, setWeighed] = useState<boolean[]>([false, false, false, false]);
  const [wrongPick, setWrongPick] = useState<string | null>(null);

  const say = useCallback(
    (id: string, text: string) => {
      if (speakOn && text) speak(id, text, { kind: voice });
    },
    [speakOn, voice],
  );

  const prompt = promptFor(level, r, step);

  // Read each round aloud when it starts.
  const started = useRef(-1);
  useEffect(() => {
    if (started.current === ri || done) return;
    started.current = ri;
    say(`sprout-${ri}`, promptFor(level, r, 0));
  }, [ri, r, level, say, done]);

  // Growing: the days tick by.
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  useEffect(() => {
    if (phase !== "grow" || r.kind !== "design") return;
    const days = DAYS[r.set];
    if (day >= days) {
      setPhase("play");
      setStep(1);
      const p = promptFor(level, r, 1);
      say(`sprout-read-${ri}`, p);
      return;
    }
    const t = setTimeout(() => setDay((d) => Math.min(days, d + (reduced.current ? days : 1))), 170);
    return () => clearTimeout(t);
  }, [phase, day, r, level, ri, say]);

  const points = moves.reduce((s, m, i) => s + scoreRound(level.rounds[i], m).points, 0);
  const max = level.rounds.length * 2;
  const stepTries = tries[step] ?? [];
  const kids = level.grade <= 2;

  /** The kid tries an answer for the current step. */
  function submit(ans: string) {
    if (phase !== "play" || done) return;
    const prev = tries.slice(0, step);
    const t = [...stepTries, ans];
    const all = [...tries];
    all[step] = t;
    setTries(all);
    const c = checkStep(r, step, ans, prev);
    const last = step + 1 >= stepCount(r);
    if (c.ok) {
      chime("right");
      setWrongPick(null);
      setTyped("");
      afterStep(all, c.note, true, last);
      return;
    }
    chime("oops");
    if (t.length >= MAX_TRIES) {
      const show = showAnswer(all);
      setWrongPick(null);
      setTyped("");
      afterStep(all, `${c.note} ${show}`.trim(), false, last);
      return;
    }
    setWrongPick(ans);
    setNote({ text: c.note, good: false });
    say(`sprout-hint-${ri}-${step}`, c.note);
  }

  /** After 3 tries, show the right answer on the board and say it. */
  function showAnswer(all: string[][]): string {
    const ans = answerFor(r, step, all.slice(0, step));
    switch (r.kind) {
      case "build":
      case "job":
        return `It's the ${PART_INFO[ans as Part].name}.`;
      case "match":
        return `It grows into a ${KIND_INFO[ans as Kind].name}.`;
      case "design": {
        if (step === 0) {
          const d = parseDesign(r.set, ans);
          if (d) setPots(d);
          return "Here is a fair test: only one thing is different.";
        }
        return ans === "same" ? "They grew the same." : `Pot ${ans} grew more.`;
      }
      case "spot":
        return ans === "fair" ? "This test was fair." : `The ${ans} was different too.`;
      case "weigh":
        return `The answer is ${ans}.`;
      case "sort":
        setTags(Object.fromEntries(r.ids.map((id) => [id, ORGS[id].role])));
        return "Here are the right tags.";
      case "chain":
        setPath(modelChain(r));
        return "Here is one path the energy can take.";
    }
  }

  function afterStep(all: string[][], text: string, good: boolean, last: boolean) {
    if (last) {
      const teach = teachFor(r, all);
      const full = [text, teach].filter(Boolean).join(" ");
      setNote({ text: full, good });
      say(`sprout-teach-${ri}`, full);
      setMoves((m) => [...m, { tries: all }]);
      setPhase("solved");
      if (good) setTimeout(() => chime("streak"), 250);
      return;
    }
    // Design: a fair setup starts the growing.
    if (r.kind === "design" && step === 0) {
      setNote(text ? { text, good } : null);
      if (text) say(`sprout-ok-${ri}`, text);
      setDay(0);
      setPhase("grow");
      return;
    }
    const nextPrompt = promptFor(level, r, step + 1);
    setNote(text ? { text, good } : null);
    say(`sprout-step-${ri}-${step}`, `${text} ${nextPrompt}`.trim());
    setStep(step + 1);
  }

  async function next() {
    if (ri + 1 < level.rounds.length) {
      const nr = level.rounds[ri + 1];
      setRi(ri + 1);
      setStep(0);
      setTries([]);
      setPhase("play");
      setNote(null);
      setPots(startPots(nr));
      setDay(0);
      setTags({});
      setPath(["sun"]);
      setTyped("");
      setWeighed([false, false, false, false]);
      setWrongPick(null);
      return;
    }
    setDone(true);
    setBusy(true);
    try {
      const res = await onFinish(moves);
      setResult(res);
      if (res.stars > 0) setTimeout(() => chime("streak"), 400);
      say("sprout-end", res.stars === 3 ? "Three stars! You are a true plant scientist!" : "Great work in the lab! Play again to earn more stars.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className={`mg ${css.sprout}`}>
        <div className="mg-result">
          <h2 className="pixel-title">Lab day done!</h2>
          <p className={css.big}>
            {"🌱".repeat(Math.max(1, Math.round((points / max) * 5)))} {points} of {max} points
          </p>
          {busy && <p className="kmuted">Watering the results…</p>}
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
              {result.stars < 3 && <p className="kmuted small">Tip: stars come from first tries. Read the clues and look closely before you tap.</p>}
            </>
          )}
          <div className="day-log">
            {moves.map((m, i) => {
              const p = scoreRound(level.rounds[i], m).points;
              return (
                <span key={i}>
                  {ROUND_ICON[level.rounds[i].kind]} {p === 2 ? "⭐" : p === 1 ? "👍" : "🌱"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mg ${css.sprout}`}>
      <div className="mg-hud">
        <span className="chip">
          🌱 {ri + 1} of {level.rounds.length}
        </span>
        <span className="chip coin">⭐ {points}</span>
        {stepCount(r) > 1 && phase !== "solved" && (
          <span className="chip">
            Step {step + 1} of {stepCount(r)}
          </span>
        )}
      </div>
      <div className="mg-goalbar" aria-hidden>
        <span style={{ width: `${(points / max) * 100}%` }} />
      </div>

      <div className={css.prompt}>
        <SayButton id={`sprout-say-${ri}-${step}`} text={prompt} />
        <p className={kids ? css.bigPrompt : ""}>{phase === "grow" ? "Growing… watch the pots!" : prompt}</p>
      </div>

      <div className={css.greenhouse}>
        {r.kind === "build" && <BuildBoard r={r} step={phase === "solved" ? PARTS.length : step} />}
        {r.kind === "job" && <JobBoard r={r} solved={phase === "solved"} pick={submit} wrong={wrongPick} />}
        {r.kind === "match" && <MatchBoard r={r} step={step} solved={phase === "solved"} pick={submit} wrong={wrongPick} ri={ri} levelId={level.id} />}
        {(r.kind === "design" || r.kind === "spot") && (
          <PotsBoard
            r={r}
            pots={pots}
            setPots={setPots}
            day={r.kind === "design" ? day : 0}
            step={step}
            phase={phase}
            pick={submit}
            wrong={wrongPick}
          />
        )}
        {r.kind === "weigh" && <WeighBoard r={r} weighed={weighed} setWeighed={setWeighed} showStory={step > 0 || phase === "solved"} />}
        {r.kind === "sort" && <SortBoard r={r} tags={tags} setTags={setTags} active={phase === "play"} />}
        {r.kind === "chain" && <ChainBoard r={r} path={path} setPath={setPath} active={phase === "play"} />}
      </div>

      {/* Controls below the board */}
      {phase === "play" && r.kind === "build" && (
        <PartTray plant={r.plant} pick={submit} wrong={wrongPick} seed={seedOf(`${level.id}-${ri}`)} names />
      )}
      {phase === "play" && r.kind === "design" && step === 0 && (
        <button type="button" className="kbtn big game-btn" onClick={() => submit(encodeDesign(pots[0], pots[1]))}>
          Start the test 🌱
        </button>
      )}
      {phase === "play" && r.kind === "spot" && (
        <button type="button" className={`kbtn big game-btn ${wrongPick === "fair" ? css.tried : ""}`} onClick={() => submit("fair")}>
          It&apos;s fair ✓
        </button>
      )}
      {phase === "play" && r.kind === "weigh" && (
        <Keypad value={typed} setValue={setTyped} ready={weighed.every(Boolean)} check={() => typed && submit(typed)} unit={r.unit} />
      )}
      {phase === "play" && r.kind === "sort" && (
        <button type="button" className="kbtn big game-btn" onClick={() => submit(encodeSort(tags))}>
          Check the tags ✓
        </button>
      )}
      {phase === "play" && r.kind === "chain" && (
        <div className={css.row}>
          <button type="button" className="kbtn" onClick={() => setPath((p) => (p.length > 1 ? p.slice(0, -1) : p))} disabled={path.length <= 1}>
            ↶ Undo
          </button>
          <button type="button" className="kbtn" onClick={() => setPath(["sun"])} disabled={path.length <= 1}>
            ↺ Clear
          </button>
          <button type="button" className="kbtn big game-btn" onClick={() => submit(path.join(">"))} disabled={path.length < 2}>
            Check the path ✓
          </button>
        </div>
      )}

      {phase === "play" && stepTries.length > 0 && !note?.good && (
        <p className="kmuted small">
          Try {stepTries.length + 1} of {MAX_TRIES}
        </p>
      )}

      {note && (
        <div className={`day-report ${note.good ? "good" : "bad"} ${css.note}`}>
          <SayButton id={`sprout-note-${ri}-${step}`} text={note.text} />
          <span>{note.text}</span>
        </div>
      )}

      {phase === "solved" && (
        <button type="button" className="kbtn big game-btn" onClick={next}>
          {ri + 1 < level.rounds.length ? "Next ➜" : "Finish 🎉"}
        </button>
      )}
    </div>
  );
}

const ROUND_ICON: Record<SproutRound["kind"], string> = {
  build: "🌻",
  job: "🌿",
  match: "🌱",
  design: "🧪",
  spot: "🔎",
  weigh: "⚖️",
  sort: "🏷️",
  chain: "☀️",
};

// ---------------- Grade 1: build a plant ----------------

/** The plant, top to bottom: flower, leaves, stem, soil, roots. `step` parts (bottom-up) are in place. */
function PlantStack({
  plant,
  placed,
  next,
  onTap,
  wrong,
}: {
  plant: BuildPlant;
  placed: number;
  next?: number;
  onTap?: (p: Part) => void;
  wrong?: string | null;
}) {
  const order: Part[] = ["flower", "leaves", "stem", "roots"];
  return (
    <div className={css.stack}>
      {order.map((p) => {
        const i = PARTS.indexOf(p);
        const has = i < placed;
        const cls = `${css.partSlot} ${p === "roots" ? css.under : ""} ${next === i ? css.nextSlot : ""} ${wrong === p ? css.tried : ""}`;
        const inner = has ? <PixelSprite grid={part(p, plant)} scale={4} /> : <span className={css.empty}>{next === i ? "?" : ""}</span>;
        return (
          <div key={p} className={css.stackRow}>
            {p === "roots" && <div className={css.soil} aria-hidden />}
            {onTap ? (
              <button type="button" className={`${cls} ${css.tapPart}`} onClick={() => onTap(p)} aria-label={`The ${PART_INFO[p].name}`}>
                {inner}
              </button>
            ) : (
              <div className={cls} aria-label={has ? `The ${PART_INFO[p].name}` : "An empty spot"}>
                {inner}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function BuildBoard({ r, step }: { r: Extract<SproutRound, { kind: "build" }>; step: number }) {
  return <PlantStack plant={r.plant} placed={step} next={step < PARTS.length ? step : undefined} />;
}

function PartTray({ plant, pick, wrong, seed, names }: { plant: BuildPlant; pick: (a: string) => void; wrong: string | null; seed: number; names: boolean }) {
  const order = useMemo(() => shuffled(PARTS, seed), [seed]);
  return (
    <div className={css.tray}>
      {order.map((p) => (
        <button key={p} type="button" className={`kbtn game-btn ${css.partBtn} ${wrong === p ? css.tried : ""}`} onClick={() => pick(p)}>
          <PixelSprite grid={part(p, plant)} scale={3} />
          {names && <span>{PART_INFO[p].name}</span>}
        </button>
      ))}
    </div>
  );
}

function JobBoard({ r, solved, pick, wrong }: { r: Extract<SproutRound, { kind: "job" }>; solved: boolean; pick: (a: string) => void; wrong: string | null }) {
  return (
    <div className={css.jobWrap}>
      <PlantStack plant={r.plant} placed={PARTS.length} onTap={solved ? undefined : pick} wrong={wrong} />
    </div>
  );
}

function MatchBoard({
  r,
  step,
  solved,
  pick,
  wrong,
  ri,
  levelId,
}: {
  r: Extract<SproutRound, { kind: "match" }>;
  step: number;
  solved: boolean;
  pick: (a: string) => void;
  wrong: string | null;
  ri: number;
  levelId: string;
}) {
  const order = useMemo(() => shuffled(KINDS, seedOf(`${levelId}-${ri}-grown`)), [levelId, ri]);
  const doneKinds = solved ? r.kinds : r.kinds.slice(0, step);
  const current = solved ? null : r.kinds[step];
  return (
    <div className={css.match}>
      <div className={css.nursery}>
        {r.kinds.map((k, i) => (
          <div key={i} className={`${css.baby} ${k === current && i === step ? css.nextSlot : ""} ${i < step || solved ? css.matched : ""}`}>
            <PixelSprite grid={seedling(k)} scale={k === current && i === step ? 5 : 3} title={i < step || solved ? `Baby ${KIND_INFO[k].name}` : "A baby plant"} />
            {(i < step || solved) && <span className={css.tag}>✓</span>}
          </div>
        ))}
      </div>
      <div className={css.grownRow}>
        {order.map((k) => (
          <button
            key={k}
            type="button"
            className={`${css.grownBtn} ${wrong === k ? css.tried : ""} ${doneKinds.includes(k) ? css.matched : ""}`}
            onClick={() => pick(k)}
            disabled={solved}
            aria-label={`Grown ${KIND_INFO[k].name}`}
          >
            <PixelSprite grid={grown(k)} scale={3} />
            <span>{KIND_INFO[k].name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Grades 2 and 5: fair tests ----------------

function PotsBoard({
  r,
  pots,
  setPots,
  day,
  step,
  phase,
  pick,
  wrong,
}: {
  r: Extract<SproutRound, { kind: "design" | "spot" }>;
  pots: [Setup, Setup];
  setPots: (p: [Setup, Setup]) => void;
  day: number;
  step: number;
  phase: Phase;
  pick: (a: string) => void;
  wrong: string | null;
}) {
  const vars = VARS[r.set];
  const editing = r.kind === "design" && step === 0 && phase === "play";
  const reading = r.kind === "design" && step === 1 && phase === "play";
  const grown_ = r.kind === "design" && (phase === "grow" || step === 1 || phase === "solved");
  const days = DAYS[r.set];
  const spotting = r.kind === "spot" && phase === "play";

  function cycle(p: 0 | 1, vi: number) {
    const vals = vars[vi].values;
    const cur = vals.findIndex((v) => v.id === pots[p][vi]);
    const nextPots: [Setup, Setup] = [[...pots[0]], [...pots[1]]];
    nextPots[p][vi] = vals[(cur + 1) % vals.length].id;
    setPots(nextPots);
  }

  const measure = (s: Setup) => {
    const v = grow(r.set, s, day).value;
    return r.set === "g2" ? `${v} green lea${v === 1 ? "f" : "ves"}` : `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)} g`;
  };

  return (
    <div className={css.lab}>
      {grown_ && (
        <div className={css.dayBar} aria-live="polite">
          📅 Day {day} of {days}
        </div>
      )}
      <div className={css.pots}>
        {([0, 1] as const).map((p) => {
          const name = p === 0 ? "A" : "B";
          const body = (
            <>
              <span className={css.potName}>Pot {name}</span>
              <PixelSprite grid={pot(r.set, pots[p], grown_ ? day : 0)} scale={3} />
              {grown_ && <span className={css.measure}>{measure(pots[p])}</span>}
            </>
          );
          return (
            <div key={p} className={css.potCol}>
              {reading ? (
                <button type="button" className={`${css.potCard} ${css.pickPot} ${wrong === name ? css.tried : ""}`} onClick={() => pick(name)} aria-label={`Pot ${name}: ${measure(pots[p])}`}>
                  {body}
                </button>
              ) : (
                <div className={css.potCard}>{body}</div>
              )}
              {!spotting &&
                vars.map((v, vi) => {
                  const val = v.values.find((x) => x.id === pots[p][vi]);
                  const same = pots[0][vi] === pots[1][vi];
                  return (
                    <button
                      key={v.id}
                      type="button"
                      className={`${css.toggle} ${!same ? css.differs : ""}`}
                      onClick={() => cycle(p, vi)}
                      disabled={!editing}
                      aria-label={`Pot ${name} ${v.name}: ${val?.label}. ${editing ? "Tap to change." : ""}`}
                    >
                      <span className={css.tEmoji}>{val?.emoji}</span>
                      <span>{val?.label}</span>
                    </button>
                  );
                })}
            </div>
          );
        })}
      </div>
      {spotting && (
        <div className={css.spotRows}>
          {vars.map((v, vi) => {
            const [a, b] = [0, 1].map((p) => v.values.find((x) => x.id === pots[p][vi]));
            return (
              <button key={v.id} type="button" className={`${css.spotRow} ${wrong === v.id ? css.tried : ""}`} onClick={() => pick(v.id)}>
                <span className={css.spotName}>{v.name}</span>
                <span>
                  {a?.emoji} {a?.label}
                </span>
                <span>
                  {b?.emoji} {b?.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
      {reading && (
        <button type="button" className={`kbtn game-btn ${wrong === "same" ? css.tried : ""}`} onClick={() => pick("same")}>
          They grew the same 🤝
        </button>
      )}
    </div>
  );
}

// ---------------- Grade 5: weighing ----------------

function WeighBoard({
  r,
  weighed,
  setWeighed,
  showStory,
}: {
  r: Extract<SproutRound, { kind: "weigh" }>;
  weighed: boolean[];
  setWeighed: (f: (w: boolean[]) => boolean[]) => void;
  showStory: boolean;
}) {
  const big = r.unit === "lb" ? "🌳" : "🪴";
  const cards = [
    { label: `${r.plant} at the start`, icon: "🌱", value: `${r.plantBefore} ${r.unit}` },
    { label: "soil at the start", icon: "🟫", value: `${r.soilBefore} ${r.unit}` },
    { label: `${r.plant} at the end`, icon: big, value: `${r.plantAfter} ${r.unit}` },
    { label: "soil at the end", icon: "🟫", value: r.soilNote ? `about ${r.soilAfter} ${r.unit}*` : `${r.soilAfter} ${r.unit}` },
  ];
  return (
    <div className={css.weigh}>
      {showStory && <p className={css.story}>{r.story}</p>}
      <div className={css.scales}>
        {cards.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`${css.scale} ${weighed[i] ? css.weighed : ""}`}
            onClick={() => {
              if (weighed[i]) return;
              chime("right");
              setWeighed((ws) => ws.map((w, j) => w || j === i));
            }}
          >
            <span className={css.scaleIcon}>{c.icon}</span>
            <span className={css.scaleLabel}>{c.label}</span>
            <span className={css.reading}>{weighed[i] ? c.value : "⚖️ Weigh"}</span>
          </button>
        ))}
      </div>
      {r.soilNote && weighed[3] && <p className="kmuted small">* The soil {r.soilNote}.</p>}
    </div>
  );
}

function Keypad({ value, setValue, ready, check, unit }: { value: string; setValue: (v: string) => void; ready: boolean; check: () => void; unit: string }) {
  if (!ready) return <p className={css.hint}>Tap all four scales to weigh everything first.</p>;
  const add = (d: string) => setValue(value.length >= 6 ? value : value === "0" ? d : value + d);
  return (
    <div className={css.keypad}>
      <div className={css.display} aria-live="polite">
        {value || "?"} <small>{unit}</small>
      </div>
      <div className={css.keys}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"].map((k) => (
          <button
            key={k}
            type="button"
            className={`kbtn ${k === "✓" ? "game-btn" : ""} ${css.key}`}
            onClick={() => (k === "⌫" ? setValue(value.slice(0, -1)) : k === "✓" ? check() : add(k))}
            disabled={k === "✓" && !value}
            aria-label={k === "⌫" ? "Delete" : k === "✓" ? "Check" : k}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------- Grade 5: food webs ----------------

const ROLE_CYCLE = ["", "P", "C", "D"];

function SortBoard({ r, tags, setTags, active }: { r: Extract<SproutRound, { kind: "sort" }>; tags: Record<string, string>; setTags: (t: Record<string, string>) => void; active: boolean }) {
  return (
    <div className={css.orgs}>
      {r.ids.map((id) => {
        const t = tags[id] ?? "";
        return (
          <button
            key={id}
            type="button"
            className={`${css.org} ${t ? css[`role${t}`] : ""}`}
            onClick={() => active && setTags({ ...tags, [id]: ROLE_CYCLE[(ROLE_CYCLE.indexOf(t) + 1) % ROLE_CYCLE.length] })}
            disabled={!active}
            aria-label={`${ORGS[id].name}: ${t ? ROLE_NAMES[t as "P"] : "no tag"}. Tap to change.`}
          >
            <span className={css.orgEmoji}>{ORGS[id].emoji}</span>
            <span className={css.orgName}>{ORGS[id].name}</span>
            <span className={css.roleTag}>{t ? ROLE_NAMES[t as "P"] : "Tap to tag"}</span>
          </button>
        );
      })}
    </div>
  );
}

function ChainBoard({ r, path, setPath, active }: { r: Extract<SproutRound, { kind: "chain" }>; path: string[]; setPath: (p: string[]) => void; active: boolean }) {
  const web = WEBS[r.web];
  return (
    <div className={css.chain}>
      <div className={css.path} aria-label={`Energy path: ${path.map((p) => ORGS[p].name).join(", then ")}`}>
        {path.map((p, i) => (
          <span key={i} className={css.pathStep}>
            {i > 0 && <span className={css.arrow}>➜</span>}
            <span className={`${css.pathChip} ${p === r.target ? css.targetChip : ""}`}>
              {ORGS[p].emoji} <small>{ORGS[p].name}</small>
            </span>
          </span>
        ))}
      </div>
      <p className="kmuted small">
        {web.name} food web · goal: {ORGS[r.target].emoji} {ORGS[r.target].name}
        {r.decomposer ? " ➜ a decomposer" : ""}
      </p>
      <div className={css.webGrid}>
        {web.orgs
          .filter((o) => o !== "sun")
          .map((o) => (
            <button
              key={o}
              type="button"
              className={`${css.webOrg} ${o === r.target ? css.targetChip : ""}`}
              onClick={() => active && !path.includes(o) && setPath([...path, o])}
              disabled={!active || path.includes(o)}
            >
              <span className={css.orgEmoji}>{ORGS[o].emoji}</span>
              <span className={css.orgName}>{ORGS[o].name}</span>
            </button>
          ))}
      </div>
    </div>
  );
}
