"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import WidgetView, { type CheckFn } from "./Widgets";
import ProbeView, { probeSpeech, type ProbeResult } from "./Probes";
import { MasteryCheck, ReviewWarmup } from "./Assess";
import { QuestScene, type GameInfo } from "./pixel/QuestScene";
import BossBattle from "./pixel/BossBattle";
import { obstacleFor } from "@/lib/pixel/scene";
import TeacherFace from "./TeacherFace";
import { StoryBoard, VideoCard } from "./StoryBoard";
import { AskTeacher, Captions, lookOf, type StageTeacher } from "./TeacherStage";
import { appendSpoken, chime, MicButton, prefetchVoice, speak, stopSpeaking, useAutoRead, useSpeech, useTeacherVoice, useVoicePrefs } from "./voice";
import type { AdaptView, PublicSegment, TeachInitial } from "./TeachPlayer";
import type { PublicWidget } from "@/lib/teaching";
import type { PublicProbe } from "@/lib/probes";
import type { PublicShow } from "@/lib/storyboard";
import { buildSteps, compress, methodSteps, partNames, type TutorStep } from "@/lib/tutorFlow";
import LessonBrief from "./present/LessonBrief";
import PlanRail from "./present/PlanRail";
import SceneView from "./present/SceneView";
import CheckinView from "./present/CheckinView";
import Recap from "./present/Recap";
import { inFlow, isFastGuess, nextMove, priorRiskFor, type Move, type Signals } from "@/lib/struggle";
import type { PlanItem } from "@/lib/lessonPlan";

/**
 * The tutor: one screen, Synthesis-style. The teacher says a line or two at a
 * time and the kid works in a big hands-on workspace. It watches how the kid
 * is working and steps in before they get stuck (a hint, a simpler way in,
 * "let's slow down"), and speeds up when they're flying.
 */

type Coaching = {
  hint: string;
  analogy: string | null;
  example: string | null;
  simpler: { q: string; choices: string[] } | null;
  reveal: { answer: number; why: string } | null;
};
type Rescue = { explanation: string; tryThis: string } | null;

interface Props {
  courseId: string;
  lessonId: string;
  teacher: StageTeacher;
  kidName?: string;
  hook?: { text: string; visual?: PublicWidget; show?: PublicShow };
  segments: PublicSegment[];
  activity?: PublicWidget;
  explain?: { prompt: string };
  initial: TeachInitial;
  onFinished: (how: "taught" | "tested-out") => void;
  adaptation?: AdaptView;
  review?: { lessonId: string; seg: number; title: string; probe: PublicProbe }[];
  mastery?: PublicProbe[];
  /** The game world: challenges become quest scenes in this land. */
  game?: GameInfo;
  /** What the lesson promises, and the plan for getting there. */
  lessonTitle?: string;
  objectives?: string[];
  keyIdeas?: string[];
  plan?: PlanItem[];
  hasMastery?: boolean;
  hasTask?: boolean;
}

async function coach<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

const PRAISE = ["Yes! Nailed it.", "That's it!", "Exactly right.", "Beautiful thinking.", "You've got it!", "Spot on!"];
const AFTER_MISS = ["You worked it out! That's how learning happens.", "There it is. Mistakes are how brains grow.", "Yes! You stuck with it."];
const pick = (l: string[]) => l[Math.floor(Math.random() * l.length)];

const CHOICE_HUES = [212, 150, 32, 282, 346, 190];

function Burst() {
  const colors = ["#2340ff", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4", "#a855f7"];
  return (
    <div className="burst" aria-hidden>
      {Array.from({ length: 18 }, (_, i) => (
        <span key={i} style={{ ["--a" as string]: `${i * 20}deg`, background: colors[i % colors.length], animationDelay: `${(i % 3) * 0.03}s` }} />
      ))}
    </div>
  );
}

/** What the teacher is saying right now, with captions, controls and the photo teacher. */
function TutorPanel({
  teacher,
  line,
  onReplay,
  children,
}: {
  teacher: StageTeacher;
  line: { id: string; text: string; tone?: string };
  onReplay: () => void;
  children?: React.ReactNode;
}) {
  const s = useSpeech();
  const kind = useTeacherVoice();
  useAutoRead(line.id, line.text);
  const talking = s.id === line.id && !s.paused;
  return (
    <aside className="tutor-voice">
      <div className={`tutor-face ${talking ? "talking" : ""}`}>
        <TeacherFace look={lookOf(teacher)} talking={talking} size={64} />
      </div>
      <div className={`tutor-bubble ${line.tone ?? ""}`} aria-live="polite">
        <div className="tutor-name">{teacher.name}</div>
        <Captions id={line.id} text={line.text} />
      </div>
      <div className="tutor-tools">
        <button
          type="button"
          className="stage-btn"
          onClick={() => {
            onReplay();
            speak(line.id, line.text, { kind });
          }}
          title="Say that again"
        >
          ↺ Again
        </button>
        {children}
      </div>
    </aside>
  );
}

/** Reading speed and auto-read, kept small for the voice bar. */
function SpeedToggle() {
  const [p, setP] = useVoicePrefs();
  return (
    <>
      <select className="stage-select" value={p.rate} aria-label="Reading speed" onChange={(e) => setP({ rate: Number(e.target.value) })}>
        <option value={0.8}>🐢 Slower</option>
        <option value={1}>Normal</option>
        <option value={1.2}>🐇 Faster</option>
      </select>
      <button type="button" className={`stage-btn ${p.autoRead ? "on-soft" : ""}`} onClick={() => setP({ autoRead: !p.autoRead })} aria-pressed={p.autoRead} title="Read lines out loud by themselves">
        {p.autoRead ? "🔊 Auto" : "🔇 Off"}
      </button>
    </>
  );
}

/** The thing to look at while the teacher talks: slides, or a big card with the key line. */
function SayView({ step, id, title }: { step: Extract<TutorStep, { kind: "say" }>; id: string; title: string }) {
  if (step.show?.watch && !step.show.beats.length) return <VideoCard video={step.show.watch} />;
  if (step.show?.beats.length) return <StoryBoard id={id} text={step.text} show={step.show} />;
  return (
    <div className="say-card">
      <div className="eyebrow">{step.label ?? title}</div>
      <p>{step.text}</p>
    </div>
  );
}

export default function TutorSession(props: Props) {
  const { courseId, lessonId, teacher, segments, onFinished, adaptation, mastery } = props;
  const [p, setP] = useVoicePrefs();
  const parts = useMemo(() => partNames(props), [props]);
  const [steps, setSteps] = useState<TutorStep[]>(() => buildSteps(props));
  const [idx, setIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [testOut, setTestOut] = useState(false);
  const [line, setLineState] = useState<{ id: string; text: string; tone?: string }>({ id: "intro", text: "" });
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [stars, setStars] = useState(0);
  const [fast, setFast] = useState(false);
  const [burst, setBurst] = useState(0);
  const [replays, setReplays] = useState(0);
  const history = useRef<{ firstTry: boolean; ratio: number }[]>([]);
  const lineCount = useRef(0);
  const step = steps[idx];
  const s = useSpeech();
  const voiceKind = useTeacherVoice();

  // Get the next couple of lines ready so the teacher never pauses to load.
  useEffect(() => {
    if (!started) return;
    for (const n of steps.slice(idx, idx + 3)) if (n.kind === "say" || n.kind === "present") prefetchVoice(n.text, voiceKind);
  }, [started, idx, steps, voiceKind]);

  const setLine = useCallback((text: string, tone?: string) => {
    lineCount.current++;
    setLineState({ id: `${lessonId}:line${lineCount.current}`, text, tone });
  }, [lessonId]);

  useEffect(() => {
    if (idx >= steps.length && steps.length) onFinished("taught");
  }, [idx, steps.length, onFinished]);
  // Nothing left to teach (e.g. coming back after the teaching was done).
  useEffect(() => {
    if (!steps.length) onFinished("taught");
  }, [steps.length, onFinished]);

  // Each new step: the teacher says its line.
  useEffect(() => {
    if (!started || !step) return;
    setReplays(0);
    if (step.kind === "say") setLine(step.text);
    else if (step.kind === "present") setLine(step.text);
    else if (step.kind === "checkin") setLine(`${step.text} ${probeSpeech(step.probe)}`.trim());
    else if (step.kind === "recap") setLine(`Here's what you can do now. ${step.objectives.join(". ")}.`, "good");
    else if (step.kind === "think") setLine(step.optional ? `Quick check: ${step.q}` : step.q);
    else if (step.kind === "probe") setLine(`${step.text} ${probeSpeech(step.probe)}`.trim());
    else if (step.kind === "explore" || step.kind === "activity") setLine(`${step.text} ${step.widget.type === "sort" || step.widget.type === "sequence" || step.widget.type === "highlight" ? step.widget.prompt : ""}`.trim());
    else if (step.kind === "explain") setLine(`${step.prompt} Tell me in your own words. You can talk or type.`);
    else if (step.kind === "review") setLine("Let's warm up with a couple of things you learned before.");
  }, [started, step, setLine]);

  // Lines and scenes move on by themselves when the teacher finishes saying them.
  useEffect(() => {
    const auto = step?.kind === "say" ? !step.video : step?.kind === "present";
    if (!auto || !p.autoRead || s.lastDone !== line.id) return;
    const t = setTimeout(() => setIdx((i) => i + 1), 600);
    return () => clearTimeout(t);
  }, [s.lastDone, line.id, step, p.autoRead]);

  const next = useCallback(() => {
    stopSpeaking();
    setIdx((i) => i + 1);
  }, []);

  /**
   * Jump past the rest of this part's talk, straight to the problem. Logged as
   * a skip so the parents can see whether the scenes are running long.
   */
  const skipTalk = useCallback(
    (segIndex: number) => {
      stopSpeaking();
      setIdx((i) => {
        const to = steps.findIndex((st, j) => j > i && st.part === segIndex + 1 && (st.kind === "probe" || st.kind === "think"));
        return to >= 0 ? to : i + 1;
      });
    },
    [steps],
  );

  /**
   * The practice for this way of teaching it did not land, and the part has
   * another route. Drop in that method's teaching and its own question right
   * here, so the kid is shown a different way while it is still fresh.
   */
  const anotherWay = useCallback(
    (segIndex: number, method: number) => {
      stopSpeaking();
      const seg = segments[segIndex];
      const m = seg?.methods?.[method];
      if (!m) return;
      const fresh = methodSteps(segIndex, segIndex + 1, m, method, adaptation?.mode ?? "standard");
      setSteps((st) => {
        // Replace the rest of this part with the new way in; everything after
        // the part is untouched.
        const after = st.findIndex((s, j) => j > idx && s.part !== segIndex + 1);
        const tail = after >= 0 ? st.slice(after) : [];
        return [...st.slice(0, idx + 1), ...fresh, ...tail];
      });
      setIdx((i) => i + 1);
    },
    [segments, adaptation?.mode, idx],
  );

  const solved = useCallback(
    (firstTry: boolean, ratio: number, why?: string | null) => {
      history.current.push({ firstTry, ratio });
      const nextStreak = firstTry ? streak + 1 : 0;
      setStreak(nextStreak);
      setXp((x) => x + (firstTry ? 10 : 5));
      setBurst((b) => b + 1);
      chime(nextStreak >= 3 ? "streak" : "right");
      if (!fast && inFlow(history.current)) {
        setFast(true);
        setSteps((st) => compress(st, idx + 1));
        setLine(`${why ? `${why} ` : ""}You're on fire! I'll pick up the pace and skip the easy check-ins.`, "good");
        return;
      }
      const praise = firstTry ? (nextStreak >= 3 ? `${pick(PRAISE)} That's ${nextStreak} in a row!` : pick(PRAISE)) : pick(AFTER_MISS);
      setLine(why ? `${praise} ${why}` : praise, "good");
    },
    [streak, fast, idx, setLine],
  );

  if (testOut && mastery?.length) {
    return props.game ? (
      <BossBattle game={props.game} courseId={courseId} lessonId={lessonId} probes={mastery} testOut onPassed={() => onFinished("tested-out")} onCancel={() => setTestOut(false)} />
    ) : (
      <MasteryCheck courseId={courseId} lessonId={lessonId} probes={mastery} testOut onPassed={() => onFinished("tested-out")} onCancel={() => setTestOut(false)} />
    );
  }

  if (!started) {
    // A lesson that states its goals opens with the brief instead of a hello.
    const brief = steps[0]?.kind === "brief" ? steps[0] : null;
    if (brief) {
      return (
        <LessonBrief
          title={brief.title}
          teacherName={teacher.name}
          look={lookOf(teacher)}
          objectives={brief.objectives}
          plan={brief.plan}
          teaching={brief.teaching}
          doing={brief.doing}
          speakingId={line.id}
          text={line.text}
          onStart={() => {
            setStarted(true);
            setIdx(1);
          }}
          onTestOut={adaptation?.offerTestOut && mastery?.length ? () => setTestOut(true) : undefined}
        />
      );
    }
    return (
      <div className="tutor-start pop">
        <div className="tutor-start-face">
          <TeacherFace look={lookOf(teacher)} size={170} />
        </div>
        <h2>
          Hi{props.kidName ? `, ${props.kidName}` : ""}! I&apos;m {teacher.name}.
        </h2>
        <p className="kmuted">{adaptation?.message || "We'll learn this together, one small step at a time. I'll talk, you'll try things, and I'll help whenever you need it."}</p>
        <div className="btnrow" style={{ justifyContent: "center" }}>
          <button className="kbtn big" onClick={() => setStarted(true)} autoFocus>
            ▶ Let&apos;s start
          </button>
          {adaptation?.offerTestOut && mastery?.length ? (
            <button className="kbtn ghost" onClick={() => setTestOut(true)}>
              I already know this: test out
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  if (!step) return null;
  const partIndex = step.part;
  const stepsInPart = steps.filter((x) => x.part === partIndex);
  const posInPart = stepsInPart.indexOf(step);

  return (
    <div className="tutor">
      <div className="tutor-top">
        <div className="tutor-progress" aria-label="Lesson progress">
          {parts.map((name, i) => {
            const inPart = steps.filter((x) => x.part === i);
            if (!inPart.length) return null;
            const fill = i < partIndex ? 1 : i > partIndex ? 0 : (posInPart + 0.5) / stepsInPart.length;
            return (
              <span key={i} className={`tp-seg ${i === partIndex ? "on" : ""}`} title={name}>
                <span style={{ width: `${Math.round(fill * 100)}%` }} />
              </span>
            );
          })}
        </div>
        <div className="tutor-stats">
          {streak >= 2 && <span className="chip hot">🔥 {streak} in a row</span>}
          <span className="chip">★ {stars}</span>
          <span className="chip">+{xp} XP</span>
          {fast && <span className="chip">⚡ Fast lane</span>}
          <button type="button" className="chip chip-btn" onClick={() => setP({ sounds: !p.sounds })} aria-pressed={p.sounds} title="Sounds">
            {p.sounds ? "🔔" : "🔕"}
          </button>
        </div>
      </div>

      <div className="tutor-main">
        <TutorPanel teacher={teacher} line={line} onReplay={() => setReplays((r) => r + 1)}>
          <SpeedToggle />
          <AskTeacher teacher={teacher} ask={async (text) => (await coach<{ answer: string }>({ action: "ask", courseId, lessonId, seg: step.part >= 1 && step.part <= segments.length ? step.part - 1 : -1, text })).answer} />
        </TutorPanel>

        <section className="tutor-work" key={`${step.key}:${idx}`}>
          {burst > 0 && <Burst key={burst} />}
          <div className="tutor-work-head">
            <span className="eyebrow">{parts[partIndex]}</span>
          </div>
          {!!props.plan?.length && (
            <PlanRail
              plan={props.plan}
              done={new Set(props.plan.filter((pl) => pl.key.startsWith("part:") && Number(pl.key.slice(5)) < partIndex - 1).map((pl) => pl.key))}
              currentKey={partIndex >= 1 && partIndex <= segments.length ? `part:${partIndex - 1}` : step.kind === "activity" ? "practice" : step.kind === "explain" ? "explain" : null}
            />
          )}
          {step.kind === "say" ? (
            <>
              <SayView step={step} id={line.id} title={parts[partIndex]} />
              <div className="tutor-next">
                <button className="kbtn big" onClick={next}>
                  {p.autoRead ? "Next ▶" : "Got it ▶"}
                </button>
              </div>
            </>
          ) : step.kind === "present" ? (
            <SceneView
              step={step}
              id={line.id}
              look={lookOf(teacher)}
              teacherName={teacher.name}
              onNext={next}
              nextLabel={p.autoRead ? "Next ▶" : "Got it ▶"}
              onSkip={step.scene < step.of - 1 ? () => skipTalk(step.seg) : undefined}
            />
          ) : step.kind === "checkin" ? (
            <CheckinView step={step} courseId={courseId} lessonId={lessonId} setLine={setLine} onNext={next} />
          ) : step.kind === "recap" ? (
            <Recap
              look={lookOf(teacher)}
              objectives={step.objectives}
              keyIdeas={step.keyIdeas}
              stars={stars}
              xp={xp}
              next={step.next}
              speakingId={line.id}
              text={line.text}
              onNext={next}
            />
          ) : step.kind === "review" ? (
            <ReviewWarmup courseId={courseId} items={step.items} onDone={next} />
          ) : (
            <InteractiveStep
              key={step.key}
              step={step}
              courseId={courseId}
              lessonId={lessonId}
              game={props.game}
              replays={replays}
              priorRisk={priorRiskFor(adaptation?.mode)}
              setLine={setLine}
              onSolved={solved}
              onStars={(n) => setStars((t) => t + n)}
              onNext={next}
              onAnotherWay={anotherWay}
              teacherName={teacher.name}
            />
          )}
        </section>
      </div>
    </div>
  );
}

/** A step where the kid does something. Watches for struggle and steps in early. */
function InteractiveStep({
  step,
  courseId,
  lessonId,

  replays,
  priorRisk,
  setLine,
  onSolved,
  onStars,
  onNext,
  onAnotherWay,
  teacherName,
  game,
}: {
  step: Exclude<TutorStep, { kind: "say" | "review" }>;
  courseId: string;
  lessonId: string;

  replays: number;
  priorRisk: number;
  setLine: (text: string, tone?: string) => void;
  onSolved: (firstTry: boolean, ratio: number, why?: string | null) => void;
  onStars: (n: number) => void;
  onNext: () => void;
  /** The practice did not land; teach the next way in from here. */
  onAnotherWay: (seg: number, method: number) => void;
  teacherName: string;
  game?: GameInfo;
}) {
  const seg = "seg" in step ? step.seg : null;
  const expectedMs =
    step.kind === "probe" ? (step.probe.seconds ?? 40) * 1000 : step.kind === "think" ? 30_000 : step.kind === "activity" ? 90_000 : step.kind === "explain" ? 240_000 : 60_000;
  const t0 = useRef(Date.now());
  const firstAction = useRef<number | null>(null);
  const lastAction = useRef(Date.now());
  const [wrong, setWrong] = useState(0);
  const [fastWrong, setFastWrong] = useState(0);
  const [hints, setHints] = useState(0);
  const moves = useRef(new Set<Move>());
  /** When the last wrong answer came in, so "fast" means fast since the last try. */
  const lastMiss = useRef(0);
  const [offer, setOffer] = useState(false);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [rescue, setRescue] = useState<Rescue>(null);
  const [picked, setPicked] = useState<number[]>([]);
  const [rightChoice, setRightChoice] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ex, setEx] = useState<{ text: string; result: { understood: boolean; covered: string[]; missing: string[]; feedback: string; followUp: string; done: boolean } | null }>({ text: "", result: null });
  const [canSkipExplore, setCanSkipExplore] = useState(step.kind === "explore");
  const interactive = step.kind === "think" || step.kind === "probe" || step.kind === "activity";

  const touch = () => {
    lastAction.current = Date.now();
    if (firstAction.current === null) firstAction.current = Date.now() - t0.current;
  };

  const signals = useCallback(
    (): Signals => ({
      elapsedMs: Date.now() - t0.current,
      expectedMs,
      firstActionMs: firstAction.current,
      idleMs: Date.now() - lastAction.current,
      wrong,
      fastWrong,
      hints,
      replays,
      priorRisk,
    }),
    [expectedMs, wrong, fastWrong, hints, replays, priorRisk],
  );

  const getHelp = useCallback(
    async (auto: boolean) => {
      if (seg === null || busy) return;
      setBusy(true);
      setOffer(false);
      setHints((h) => h + 1);
      try {
        const d = await coach<{ coaching: Coaching; rescue: Rescue }>({ action: "lost", courseId, lessonId, seg, picks: [] });
        setCoaching(d.coaching);
        if (d.rescue) setRescue(d.rescue);
        const c = d.coaching;
        const say = d.rescue ? `${d.rescue.explanation} ${d.rescue.tryThis}` : c.analogy ? `Here's another way to see it. ${c.analogy}` : c.example ? `Watch me do one. ${c.example}` : c.hint;
        setLine(auto ? `Let me help a little. ${say}` : say, "ai");
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setBusy(false);
      }
    },
    [seg, busy, courseId, lessonId, setLine],
  );

  const slowDown = useCallback(() => {
    moves.current.add("slow-down");
    setLocked(true);
    setLine("Whoa, speedy! Let's slow down and think it through together. Read it with me.", "warn");
    setTimeout(() => setLocked(false), 4000);
  }, [setLine]);

  // Predict struggle every couple of seconds and step in early.
  useEffect(() => {
    if (!interactive || done) return;
    const t = setInterval(() => {
      const move = nextMove(signals(), moves.current);
      if (!move) return;
      moves.current.add(move);
      if (move === "nudge") {
        setOffer(true);
        setLine("Take your time. This one's tricky. Want a hint?", "warn");
      } else if (move === "scaffold") {
        void getHelp(true);
      } else if (move === "slow-down") slowDown();
    }, 2000);
    return () => clearInterval(t);
  }, [interactive, done, signals, getHelp, setLine, slowDown]);

  useEffect(() => {
    if (step.kind !== "explore") return;
    const t = setTimeout(() => setCanSkipExplore(true), 2500);
    return () => clearTimeout(t);
  }, [step.kind]);

  const challenge = step.kind === "probe" || step.kind === "activity";
  const [earned, setEarned] = useState<number | null>(null);
  /** Stars still possible: 3 for first try with no help, 2 after a miss or hint. */
  const possible = wrong === 0 && hints === 0 ? 3 : 2;
  const award = (n: number) => {
    if (!challenge || earned !== null) return;
    setEarned(n);
    onStars(n);
  };

  const finish = (firstTry: boolean, why?: string | null) => {
    setDone(true);
    setOffer(false);
    award(firstTry && hints === 0 ? 3 : 2);
    onSolved(firstTry, (Date.now() - t0.current) / expectedMs, why);
  };

  const miss = (c: Coaching | null, r: Rescue) => {
    const ms = Date.now() - t0.current;
    setWrong((w) => w + 1);
    if (c) setCoaching(c);
    if (r) setRescue(r);
    chime("oops");
    // Two quick wrong answers in a row looks like guessing: slow down right away.
    if (isFastGuess(ms - lastMiss.current, expectedMs) && !c?.reveal) {
      const n = fastWrong + 1;
      setFastWrong(n);
      if (n >= 2 && !moves.current.has("slow-down")) {
        lastMiss.current = ms;
        slowDown();
        return;
      }
    }
    lastMiss.current = ms;
    setLine(r ? `${r.explanation} ${r.tryThis}` : c?.reveal ? `Here's the answer: ${c.reveal.why} We'll come back to this so it sticks.` : c?.hint || "Not quite. Have another look.", c?.reveal ? "good" : "warn");
  };

  async function answerThink(choice: number) {
    if (step.kind !== "think" || busy || done || locked) return;
    touch();
    setBusy(true);
    setError(null);
    try {
      const picks = [...picked, choice].map((c) => step.choices[c]);
      const d = await coach<{ correct: boolean; why: string | null; coaching: Coaching | null; rescue: Rescue }>({ action: "think", courseId, lessonId, seg: step.seg, choice, picks });
      if (d.correct) {
        setRightChoice(choice);
        finish(wrong === 0, d.why);
      } else {
        setPicked((p) => [...p, choice]);
        miss(d.coaching, d.rescue);
        if (d.coaching?.reveal) {
          setRightChoice(d.coaching.reveal.answer);
          setDone(true);
        }
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function submitProbe(answer: unknown, ms: number): Promise<ProbeResult> {
    touch();
    if (step.kind !== "probe") return { correct: false, parts: [] };
    setError(null);
    try {
      const d = await coach<{
        correct: boolean;
        graded: { parts: boolean[]; detail?: string } | null;
        coaching: Coaching | null;
        rescue: Rescue;
        solution: unknown;
        nextMethod?: number | null;
      }>({
        action: "probe",
        courseId,
        lessonId,
        seg: step.seg,
        answer,
        ms,
      });
      if (d.correct) finish(wrong === 0);
      else if (d.nextMethod != null) {
        // This way of teaching it did not land, and the part has another.
        // Teach that one now, right here, rather than ending on a miss.
        onAnotherWay(step.seg, d.nextMethod);
      } else {
        miss(d.coaching, d.rescue);
        if (d.solution !== null && d.solution !== undefined) {
          setDone(true);
          award(1);
          setLine("I've filled in the answer. Look at how it works; we'll come back to this idea so it sticks.", "good");
        }
      }
      return { correct: d.correct, parts: d.graded?.parts ?? [], solution: d.solution ?? undefined, detail: d.graded?.detail };
    } catch (e) {
      setError((e as Error).message);
      return { correct: false, parts: [] };
    }
  }

  const checkVisual: CheckFn = async (answer) => {
    touch();
    const r = await coach<{ correct: boolean; parts: boolean[]; solution?: number[] | null }>({ action: "visual", courseId, lessonId, seg, answer });
    if (r.correct && !done) finish(true);
    return r;
  };

  const checkActivity: CheckFn = async (answer) => {
    touch();
    const r = await coach<{ correct: boolean; parts: boolean[]; done: boolean; solution: number[] | null }>({ action: "activity", courseId, lessonId, answer });
    if (r.correct) finish(wrong === 0);
    else {
      setWrong((w) => w + 1);
      if (r.done) {
        setDone(true);
        award(1);
        setLine("Here's how it goes. Look it over, then let's keep going.", "good");
      } else setLine("Close! Look at the ones that aren't green yet and try again.", "warn");
    }
    return r;
  };

  async function submitExplain() {
    setBusy(true);
    setError(null);
    try {
      const r = await coach<{ understood: boolean; covered: string[]; missing: string[]; feedback: string; followUp: string; done: boolean }>({
        action: "explain",
        courseId,
        lessonId,
        text: ex.text,
      });
      setEx((e) => ({ ...e, result: r }));
      setLine(`${r.feedback} ${r.followUp}`.trim(), r.understood ? "good" : "warn");
      if (r.done) {
        setDone(true);
        if (r.understood) chime("right");
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="tutor-step" onPointerDownCapture={touch} onKeyDownCapture={touch}>
      {locked && <div className="tutor-lock">🐢 Read it with me first…</div>}
      {challenge && game && (
        <QuestScene
          game={game}
          obstacle={step.kind === "probe" ? obstacleFor(step.probe.type) : "chest"}
          solved={done}
          miss={wrong}
          stars={earned}
          possible={possible}
        />
      )}
      {challenge && !game && (
        <div className={`challenge-head ${earned !== null ? "won" : ""}`}>
          <span className="challenge-tag">⚡ {step.kind === "activity" ? "Mission" : "Challenge"}</span>
          <span className="challenge-stars" aria-label={earned !== null ? `${earned} of 3 stars` : `Up to ${possible} stars`}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={`star ${(earned ?? possible) >= n ? "lit" : ""} ${earned !== null && earned >= n ? "pop" : ""}`} style={{ animationDelay: `${n * 0.12}s` }}>
                ★
              </span>
            ))}
          </span>
        </div>
      )}

      {step.kind === "think" && (
        <div className="tutor-think">
          <div className="tutor-q">{step.q}</div>
          <div className="tutor-choices">
            {step.choices.map((c, i) => (
              <button
                key={i}
                type="button"
                className={`tutor-choice ${picked.includes(i) ? "wrong" : ""} ${rightChoice === i ? "right" : ""}`}
                style={{ ["--c-hue" as string]: CHOICE_HUES[i % CHOICE_HUES.length] }}
                disabled={busy || done || locked || picked.includes(i)}
                onClick={() => answerThink(i)}
              >
                <span className="tutor-choice-key">{String.fromCharCode(65 + i)}</span>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {step.kind === "probe" && <ProbeView p={step.probe} submit={submitProbe} locked={locked} />}

      {step.kind === "explore" && <WidgetView w={step.widget} onCheck={checkVisual} />}
      {step.kind === "activity" && <WidgetView w={step.widget} onCheck={checkActivity} />}

      {step.kind === "explain" && (
        <div className="tutor-explain">
          <textarea
            className="kinput"
            rows={5}
            value={ex.text}
            onChange={(e) => {
              touch();
              setEx({ ...ex, text: e.target.value });
            }}
            placeholder="Explain it like you're teaching a friend…"
            disabled={ex.result?.done}
          />
          {!ex.result?.done && (
            <div className="btnrow">
              <MicButton onText={(t) => setEx((cur) => ({ ...cur, text: appendSpoken(cur.text, t) }))} label="Talk it out" />
              <button className="kbtn" disabled={busy || ex.text.trim().length < 15} onClick={submitExplain}>
                {busy ? `${teacherName} is reading…` : ex.result ? "Try again with more" : "Check my explanation"}
              </button>
            </div>
          )}
          {ex.result && (
            <div className="w-chips">
              {ex.result.covered.map((c) => (
                <span key={c} className="w-chip right">
                  ✓ {c}
                </span>
              ))}
              {ex.result.missing.map((c) => (
                <span key={c} className="w-chip">
                  ＋ {c}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Extra ways in, from the coaching ladder. */}
      {!done && coaching && (coaching.analogy || coaching.example || rescue) && (
        <div className="tutor-help">
          {coaching.analogy && (
            <div className="approach">
              <div className="eyebrow">Another way to see it</div>
              <p>{coaching.analogy}</p>
            </div>
          )}
          {coaching.example && (
            <div className="approach">
              <div className="eyebrow">Watch it worked out</div>
              <p>{coaching.example}</p>
            </div>
          )}
          {rescue && (
            <div className="approach ai">
              <div className="eyebrow">{teacherName} explains it a new way</div>
              <p>
                {rescue.explanation} <strong>{rescue.tryThis}</strong>
              </p>
            </div>
          )}
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <div className="tutor-next">
        {offer && !done && (
          <>
            <button className="kbtn" onClick={() => getHelp(false)} disabled={busy}>
              💡 Yes, a hint please
            </button>
            <button
              className="kbtn ghost"
              onClick={() => {
                setOffer(false);
                setLine("You've got this. Take your time.");
              }}
            >
              I&apos;ve got it
            </button>
          </>
        )}
        {!done && !offer && seg !== null && interactive && (
          <button className="kbtn ghost" onClick={() => getHelp(false)} disabled={busy}>
            😵 I&apos;m stuck
          </button>
        )}
        {(done || (step.kind === "explore" && canSkipExplore)) && (
          <button className="kbtn big" onClick={onNext} autoFocus={done}>
            {done ? "Keep going ▶" : "Next ▶"}
          </button>
        )}
      </div>
    </div>
  );
}
