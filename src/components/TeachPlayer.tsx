"use client";

import { useEffect, useState } from "react";
import WidgetView, { type CheckFn } from "./Widgets";
import type { PublicWidget } from "@/lib/teaching";
import type { PublicProbe } from "@/lib/probes";
import ProbeView, { type ProbeResult } from "./Probes";
import { MasteryCheck, ReviewWarmup } from "./Assess";
import { AskTeacher, CoachLine, TeacherStage, type StageTeacher } from "./TeacherStage";
import { appendSpoken, MicButton, SayButton } from "./voice";

export interface PublicSegment {
  title: string;
  teach: string;
  visual?: PublicWidget;
  think: { q: string; choices: string[] };
  /** Interactive check (replaces the multiple-choice think). */
  probe?: PublicProbe;
  /** Shown before the check when the coach is in support mode ("I do, we do, you do"). */
  example?: string;
}

export interface AdaptView {
  mode: "support" | "standard" | "challenge";
  message: string;
  offerTestOut: boolean;
}

export interface TeachInitial {
  segmentsDone: boolean[];
  activityDone: boolean;
  explainDone: boolean;
}

interface Props {
  courseId: string;
  lessonId: string;
  teacher: StageTeacher;
  hook?: { text: string; visual?: PublicWidget };
  segments: PublicSegment[];
  activity?: PublicWidget;
  explain?: { prompt: string };
  initial: TeachInitial;
  onFinished: (how: "taught" | "tested-out") => void;
  adaptation?: AdaptView;
  review?: { lessonId: string; seg: number; title: string; probe: PublicProbe }[];
  mastery?: PublicProbe[];
}

type Coaching = {
  hint: string;
  analogy: string | null;
  example: string | null;
  simpler: { q: string; choices: string[] } | null;
  reveal: { answer: number; why: string } | null;
};

async function coach<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/coach", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
  return data as T;
}

function SegmentView({
  courseId,
  lessonId,
  index,
  seg,
  teacher,
  alreadyDone,
  onDone,
}: {
  courseId: string;
  lessonId: string;
  index: number;
  seg: PublicSegment;
  teacher: StageTeacher;
  alreadyDone: boolean;
  onDone: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [correctWhy, setCorrectWhy] = useState<string | null>(null);
  const [coaching, setCoaching] = useState<Coaching | null>(null);
  const [rescue, setRescue] = useState<{ explanation: string; tryThis: string } | null>(null);
  const [simpler, setSimpler] = useState<{ choice: number | null; feedback: string; correct: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nudge, setNudge] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const done = alreadyDone || correctWhy !== null || !!coaching?.reveal || revealed;

  // Struggle signal: a long pause without answering brings a gentle offer of help.
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setNudge(true), 75_000);
    return () => clearTimeout(t);
  }, [done, coaching]);

  async function answer(choice: number) {
    if (busy || done) return;
    setBusy(true);
    setError(null);
    setPicked(choice);
    setNudge(false);
    try {
      const picks = [...wrongPicks, choice].map((c) => seg.think.choices[c]);
      const d = await coach<{ correct: boolean; why: string | null; coaching: Coaching | null; rescue: { explanation: string; tryThis: string } | null }>({
        action: "think",
        courseId,
        lessonId,
        seg: index,
        choice,
        picks,
      });
      if (d.correct) setCorrectWhy(d.why ?? "");
      else {
        setWrongPicks((w) => [...w, choice]);
        setCoaching(d.coaching);
        if (d.rescue) setRescue(d.rescue);
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function lost() {
    setBusy(true);
    setNudge(false);
    try {
      const d = await coach<{ coaching: Coaching; rescue: { explanation: string; tryThis: string } | null }>({
        action: "lost",
        courseId,
        lessonId,
        seg: index,
        picks: wrongPicks.map((c) => seg.think.choices[c]),
      });
      setCoaching(d.coaching);
      if (d.rescue) setRescue(d.rescue);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function answerSimpler(choice: number) {
    const d = await coach<{ correct: boolean; feedback: string }>({ action: "simpler", courseId, lessonId, seg: index, choice });
    setSimpler({ choice, ...d });
  }

  const checkVisual: CheckFn = (answer) => coach({ action: "visual", courseId, lessonId, seg: index, answer });

  async function submitProbe(answer: unknown, ms: number): Promise<ProbeResult> {
    setError(null);
    setNudge(false);
    try {
      const d = await coach<{
        correct: boolean;
        graded: { parts: boolean[]; detail?: string } | null;
        coaching: Coaching | null;
        rescue: { explanation: string; tryThis: string } | null;
        solution: unknown;
      }>({ action: "probe", courseId, lessonId, seg: index, answer, ms });
      if (d.correct) setCorrectWhy("");
      else {
        setWrongPicks((w) => [...w, -1]);
        setCoaching(d.coaching);
        if (d.rescue) setRescue(d.rescue);
        if (d.solution !== null && d.solution !== undefined) setRevealed(true);
      }
      return { correct: d.correct, parts: d.graded?.parts ?? [], solution: d.solution ?? undefined, detail: d.graded?.detail };
    } catch (e) {
      setError((e as Error).message);
      return { correct: false, parts: [] };
    }
  }

  return (
    <div className="teach-seg pop">
      <TeacherStage teacher={teacher} id={`${lessonId}:seg${index}`} eyebrow={`Part ${index + 1}`} heading={seg.title} text={seg.teach} auto={!alreadyDone} />
      <div className="kcard stage-work">
      {seg.visual && <WidgetView w={seg.visual} onCheck={checkVisual} />}

      {seg.example && (
        <div className="approach">
          <div className="eyebrow">
            Watch one first <SayButton id={`${lessonId}:ex${index}`} text={seg.example} />
          </div>
          <p>{seg.example}</p>
        </div>
      )}

      {seg.probe ? (
        <div className="think">
          <div className="eyebrow">Your turn</div>
          <ProbeView p={seg.probe} submit={submitProbe} locked={alreadyDone} />
        </div>
      ) : (
      <div className="think">
        <div className="eyebrow">Quick think</div>
        <div className="check-text">
          {seg.think.q}{" "}
          <SayButton
            id={`${lessonId}:q${index}`}
            text={`${seg.think.q} ${seg.think.choices.map((c, i) => `${String.fromCharCode(65 + i)}: ${c}.`).join(" ")}`}
          />
        </div>
        <div className="check-choices">
          {seg.think.choices.map((c, i) => (
            <button
              key={i}
              className={`check-choice ${picked === i ? "picked" : ""} ${correctWhy !== null && picked === i ? "right" : ""} ${wrongPicks.includes(i) ? "wrong" : ""} ${coaching?.reveal?.answer === i ? "right" : ""}`}
              disabled={busy || done || wrongPicks.includes(i)}
              onClick={() => answer(i)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      )}

      {correctWhy !== null && (
        <CoachLine
          teacher={teacher}
          id={`${lessonId}:right${index}`}
          tone="good"
          auto={!alreadyDone}
          say={`${wrongPicks.length === 0 ? "Exactly right!" : "You worked it out! That's how learning happens."} ${correctWhy}`}
        >
          ✅ {wrongPicks.length === 0 ? "Exactly right!" : "You worked it out! That's how learning happens."} {correctWhy}
        </CoachLine>
      )}

      {revealed && (
        <CoachLine
          teacher={teacher}
          id={`${lessonId}:revealed${index}`}
          tone="good"
          say="The answer is shown above. Look at how it works; we'll come back to this idea so it sticks."
        />
      )}

      {coaching && correctWhy === null && !revealed && (
        <div className="ladder">
          {coaching.hint && (
            <CoachLine teacher={teacher} id={`${lessonId}:hint${index}:${wrongPicks.length}`} tone="warn" say={coaching.hint}>
              🤔 {coaching.hint}
            </CoachLine>
          )}
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
            <CoachLine teacher={teacher} id={`${lessonId}:rescue${index}:${rescue.tryThis}`} tone="ai" say={`${rescue.explanation} ${rescue.tryThis}`}>
              {rescue.explanation} <strong>{rescue.tryThis}</strong>
            </CoachLine>
          )}
          {coaching.simpler && !coaching.reveal && (
            <div className="approach">
              <div className="eyebrow">Let&apos;s take a smaller step first</div>
              <div className="check-text">{coaching.simpler.q}</div>
              <div className="check-choices">
                {coaching.simpler.choices.map((c, i) => (
                  <button
                    key={i}
                    className={`check-choice ${simpler?.choice === i ? (simpler.correct ? "right" : "wrong") : ""}`}
                    disabled={!!simpler?.correct}
                    onClick={() => answerSimpler(i)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {simpler && <div className={`check-why ${simpler.correct ? "good" : "bad"}`}>{simpler.feedback}</div>}
              {simpler?.correct && <p className="kmuted small">Now try the main question again with that in mind.</p>}
            </div>
          )}
          {coaching.reveal && (
            <CoachLine
              teacher={teacher}
              id={`${lessonId}:reveal${index}`}
              tone="good"
              say={`Here's the answer: ${seg.think.choices[coaching.reveal.answer]}. ${coaching.reveal.why} We'll come back to this idea later so it sticks.`}
            >
              Here&apos;s the answer: <strong>{seg.think.choices[coaching.reveal.answer]}</strong>. {coaching.reveal.why} We&apos;ll come back to
              this idea later so it sticks.
            </CoachLine>
          )}
          {!coaching.reveal && <p className="kmuted small">Give it another try{seg.probe ? ": change your answer above and check again" : ""}. Every miss teaches your brain something.</p>}
        </div>
      )}

      {error && <div className="error">{error}</div>}
      {!done && (
        <div className="btnrow">
          <button className="kbtn ghost" onClick={lost} disabled={busy}>
            😵 I&apos;m lost, show me another way
          </button>
          {nudge && <span className="kmuted small">Taking a while? That&apos;s OK. Want me to explain it another way?</span>}
        </div>
      )}
      <AskTeacher teacher={teacher} ask={async (text) => (await coach<{ answer: string }>({ action: "ask", courseId, lessonId, seg: index, text })).answer} />
      {done && (
        <div className="btnrow">
          <button className="kbtn big" onClick={onDone}>
            Keep going →
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default function TeachPlayer({ courseId, lessonId, teacher, hook, segments, activity, explain, initial, onFinished, adaptation, review, mastery }: Props) {
  const [testOut, setTestOut] = useState(false);
  // Steps: (warm-up), hook, each segment, activity, explain.
  const steps: string[] = [...(review?.length ? ["review"] : []), "hook", ...segments.map((_, i) => `seg${i}`), ...(activity ? ["activity"] : []), ...(explain ? ["explain"] : [])];
  const firstOpen = (() => {
    const offset = review?.length ? 1 : 0;
    const s = initial.segmentsDone.findIndex((d) => !d);
    if (s >= 0) return s === 0 ? 0 : s + 1 + offset;
    if (activity && !initial.activityDone) return 1 + offset + segments.length;
    if (explain && !initial.explainDone) return steps.length - 1;
    return steps.length;
  })();
  const [step, setStep] = useState(firstOpen);
  const [activityDone, setActivityDone] = useState(initial.activityDone);
  const [ex, setEx] = useState<{ text: string; result: { understood: boolean; covered: string[]; missing: string[]; feedback: string; followUp: string; done: boolean } | null }>({
    text: "",
    result: null,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (step >= steps.length) onFinished("taught");
  }, [step, steps.length, onFinished]);

  const next = () => setStep((s) => s + 1);
  const current = steps[step];

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
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const checkActivity: CheckFn = async (answer) => {
    const r = await coach<{ correct: boolean; parts: boolean[]; done: boolean; solution: number[] | null }>({ action: "activity", courseId, lessonId, answer });
    if (r.done) setActivityDone(true);
    return r;
  };

  if (testOut && mastery?.length) {
    return (
      <MasteryCheck
        courseId={courseId}
        lessonId={lessonId}
        probes={mastery}
        testOut
        onPassed={() => onFinished("tested-out")}
        onCancel={() => setTestOut(false)}
      />
    );
  }

  return (
    <div>
      {adaptation?.message && (
        <div className={`adapt-banner ${adaptation.mode}`}>
          🧭 {adaptation.message}
          {adaptation.offerTestOut && mastery?.length ? (
            <button className="kbtn ghost" onClick={() => setTestOut(true)}>
              Test out →
            </button>
          ) : null}
        </div>
      )}
      <div className="teach-progress" aria-label="Lesson progress">
        {steps.map((s, i) => (
          <span key={s} className={i < step ? "done" : i === step ? "on" : ""} title={s} />
        ))}
      </div>

      {current === "review" && review?.length ? <ReviewWarmup courseId={courseId} items={review} onDone={next} /> : null}

      {current === "hook" && (
        <div className="pop">
          <TeacherStage teacher={teacher} id={`${lessonId}:hook`} eyebrow="Let's start with this" text={hook?.text ?? "Ready? Let's dig in."} />
          <div className="kcard stage-work">
            {hook?.visual && <WidgetView w={hook.visual} />}
            <button className="kbtn big" onClick={next}>
              Let&apos;s learn →
            </button>
          </div>
        </div>
      )}

      {current?.startsWith("seg") && (
        <SegmentView
          key={current}
          courseId={courseId}
          lessonId={lessonId}
          index={Number(current.slice(3))}
          seg={segments[Number(current.slice(3))]}
          teacher={teacher}
          alreadyDone={initial.segmentsDone[Number(current.slice(3))]}
          onDone={next}
        />
      )}

      {current === "activity" && activity && (
        <div className="kcard pop">
          <div className="eyebrow">Hands-on: try it yourself</div>
          <WidgetView w={activity} onCheck={checkActivity} />
          {activityDone && (
            <button className="kbtn big" onClick={next}>
              Next →
            </button>
          )}
        </div>
      )}

      {current === "explain" && explain && (
        <div className="pop">
          <TeacherStage
            teacher={teacher}
            id={`${lessonId}:explain`}
            eyebrow="Explain it back"
            text={`${explain.prompt} Use your own words. Real understanding means you can teach it. You can type, or press Talk and tell me out loud.`}
          />
          <div className="kcard stage-work">
          <textarea
            className="kinput"
            rows={6}
            value={ex.text}
            onChange={(e) => setEx({ ...ex, text: e.target.value })}
            placeholder="Explain it like you're teaching a friend…"
            disabled={ex.result?.done}
          />
          {!ex.result?.done && (
            <div className="btnrow">
              <MicButton onText={(t) => setEx((cur) => ({ ...cur, text: appendSpoken(cur.text, t) }))} label="Talk it out" />
            </div>
          )}
          {error && <div className="error">{error}</div>}
          {ex.result && (
            <div className="explain-result">
              <CoachLine
                teacher={teacher}
                id={`${lessonId}:explain-fb:${ex.result.feedback}`}
                tone={ex.result.understood ? "good" : "warn"}
                say={`${ex.result.feedback} ${ex.result.followUp}`}
              >
                {ex.result.feedback} {ex.result.followUp && <strong>{ex.result.followUp}</strong>}
              </CoachLine>
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
            </div>
          )}
          <div className="btnrow">
            {!ex.result?.done && (
              <button className="kbtn big" disabled={busy || ex.text.trim().length < 15} onClick={submitExplain}>
                {busy ? `${teacher.name} is reading…` : ex.result ? "Try again with more" : "Check my explanation"}
              </button>
            )}
            {ex.result?.done && (
              <button className="kbtn big" onClick={next}>
                {ex.result.understood ? "Show what I know →" : "Keep going →"}
              </button>
            )}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
