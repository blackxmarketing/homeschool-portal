import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import type { Segment, Widget } from "@/content/courses/types";
import { sanitizeWidget } from "@/lib/courseContent";
import {
  checkActivity,
  coachingFor,
  emptySegment,
  interactiveDone,
  isActivity,
  keywordExplainCheck,
  LADDER,
  parseState,
  publicWidget,
} from "@/lib/teaching";

const seg: Segment = {
  title: "Compound interest",
  teach: "You earn interest on your interest.",
  think: { q: "Which grows faster?", choices: ["Simple", "Compound", "Same"], answer: 1, why: "Interest on interest.", hints: ["Simple only pays on the start.", "", "Look at year 10."] },
  approaches: {
    analogy: "Like a snowball rolling downhill.",
    example: "$100 at 10%: $110, then $121.",
    simpler: { q: "Is 121 more than 120?", choices: ["Yes", "No"], answer: 0, why: "121 > 120.", hints: ["", "Count up from 120."] },
  },
};

describe("coaching ladder", () => {
  it("gives more help with each miss", () => {
    const st = emptySegment();
    st.rung = 1;
    let c = coachingFor(seg, st, 0);
    expect(c.hint).toBe("Simple only pays on the start.");
    expect(c.analogy).toBeNull();
    st.rung = LADDER.analogy;
    c = coachingFor(seg, st, 2);
    expect(c.analogy).toBe(seg.approaches.analogy);
    expect(c.example).toBeNull();
    st.rung = LADDER.example;
    c = coachingFor(seg, st, 2);
    expect(c.example).toBe(seg.approaches.example);
    expect(c.simpler).toEqual({ q: "Is 121 more than 120?", choices: ["Yes", "No"] });
    expect(c.reveal).toBeNull();
    st.rung = LADDER.reveal;
    expect(coachingFor(seg, st, 2).reveal).toEqual({ answer: 1, why: "Interest on interest." });
  });

  it("never sends the answer in the simpler step", () => {
    const st = { ...emptySegment(), rung: LADDER.example };
    expect(JSON.stringify(coachingFor(seg, st, 0).simpler)).not.toContain("answer");
  });

  it("parses saved state safely", () => {
    expect(parseState("garbage", 2).segments).toHaveLength(2);
    const s = parseState(JSON.stringify({ segments: [{ misses: 2, done: "passed" }] }), 3);
    expect(s.segments[0]).toMatchObject({ misses: 2, done: "passed", rung: 0 });
    expect(s.segments[2].done).toBe("");
  });
});

describe("activities", () => {
  const sort: Widget = { type: "sort", prompt: "Needs or wants?", buckets: ["Need", "Want"], items: [{ text: "Food", bucket: 0 }, { text: "Game", bucket: 1 }, { text: "Coat", bucket: 0 }] };
  const sequence: Widget = { type: "sequence", prompt: "Order", steps: ["a", "b", "c", "d"] };
  const highlight: Widget = { type: "highlight", prompt: "Pick", sentences: ["x", "y", "z"], correct: [1] };

  it("hides answers from the browser", () => {
    const ps = publicWidget(sort, "seed");
    expect(ps.type === "sort" && ps.items.every((it) => !("bucket" in it))).toBe(true);
    const pq = publicWidget(sequence, "seed");
    expect(pq.type === "sequence" && pq.steps.map((s) => s.id)).not.toEqual([0, 1, 2, 3]);
    expect(JSON.stringify(publicWidget(highlight, "s"))).not.toContain("correct");
    expect(publicWidget(sequence, "same")).toEqual(publicWidget(sequence, "same"));
  });

  it("grades each kind and shows which parts are right", () => {
    expect(checkActivity(sort, [0, 1, 0])).toEqual({ correct: true, parts: [true, true, true] });
    expect(checkActivity(sort, [0, 0, 0])).toEqual({ correct: false, parts: [true, false, true] });
    expect(checkActivity(sequence, [0, 1, 2, 3]).correct).toBe(true);
    expect(checkActivity(sequence, [1, 0, 2, 3]).parts).toEqual([false, false, true, true]);
    expect(checkActivity(highlight, [1]).correct).toBe(true);
    expect(checkActivity(highlight, [0, 1]).correct).toBe(false);
  });

  it("finishes teaching only when every part is done", () => {
    const lesson = { teach: [seg, seg], activity: sort, explain: { prompt: "p", keyPoints: ["k"] } } as never;
    const st = parseState(null, 2);
    expect(interactiveDone(lesson, st)).toBe(false);
    st.segments[0].done = "passed";
    st.segments[1].done = "supported";
    st.activity.done = true;
    expect(interactiveDone(lesson, st)).toBe(false);
    st.explain.done = true;
    expect(interactiveDone(lesson, st)).toBe(true);
  });
});

describe("explain it back without AI", () => {
  it("finds key points in the kid's own words", () => {
    const r = keywordExplainCheck("You earn interest on the interest, so your savings snowball and grow faster over time.", [
      "Interest is earned on earlier interest",
      "Growth speeds up over time",
      "Starting early matters",
    ]);
    expect(r.covered).toContain("Interest is earned on earlier interest");
    expect(r.covered).toContain("Growth speeds up over time");
    expect(r.missing).toContain("Starting early matters");
  });
});

describe("course teaching content", () => {
  for (const course of COURSES) {
    for (const lesson of course.lessons) {
      it(`${lesson.id} has a complete teaching model`, () => {
        expect(lesson.hook?.text, "hook").toBeTruthy();
        expect(lesson.teach?.length, "segments").toBeGreaterThanOrEqual(3);
        for (const s of lesson.teach ?? []) {
          const words = s.teach.split(/\s+/).length;
          expect(words, `${s.title} length`).toBeGreaterThanOrEqual(40);
          expect(words, `${s.title} length`).toBeLessThanOrEqual(170);
          for (const q of [s.think, s.approaches.simpler]) {
            expect(q.answer, q.q).toBeGreaterThanOrEqual(0);
            expect(q.answer, q.q).toBeLessThan(q.choices.length);
            expect(q.hints.length, `${q.q} hints`).toBe(q.choices.length);
            q.hints.forEach((h, i) => (i === q.answer ? expect(h, q.q).toBe("") : expect(h.length, `${q.q} hint ${i}`).toBeGreaterThan(10)));
          }
          expect(s.approaches.analogy.length).toBeGreaterThan(30);
          expect(s.approaches.example.length).toBeGreaterThan(30);
          if (s.visual) expect(sanitizeWidget(s.visual), `${s.title} visual`).toEqual(s.visual);
        }
        expect(isActivity(lesson.activity), "activity").toBe(true);
        expect(sanitizeWidget(lesson.activity), "activity valid").toEqual(lesson.activity);
        if (lesson.activity?.type === "sort") for (const it of lesson.activity.items) expect(it.bucket).toBeLessThan(lesson.activity.buckets.length);
        if (lesson.activity?.type === "highlight") for (const i of lesson.activity.correct) expect(i).toBeLessThan(lesson.activity.sentences.length);
        expect(lesson.explain?.keyPoints.length, "explain").toBeGreaterThanOrEqual(2);
      });
    }
  }
});
