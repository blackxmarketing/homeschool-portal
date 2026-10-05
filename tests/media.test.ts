import { describe, expect, it } from "vitest";
import { COURSES } from "@/content/courses";
import { MEDIA } from "@/content/media";
import { beatAt, cuePositions, cuesFound, isYoutubeId } from "@/lib/storyboard";
import type { Beat, Video } from "@/content/courses/types";

describe("storyboard cues", () => {
  it("finds cue words in order and falls back safely", () => {
    const text = "Redi set up jars. Some were open. Others had gauze.";
    const beats = [{}, { at: "Some were open" }, { at: "gauze" }];
    expect(cuePositions(text, beats)).toEqual([0, 18, 45]);
    expect(beatAt(cuePositions(text, beats), 20)).toBe(1);
    expect(cuesFound(text, [{}, { at: "missing words" }]).missing).toEqual(["missing words"]);
    expect(cuePositions(text, [{}, { at: "missing words" }])).toEqual([0, 0]);
  });
});

function checkBeats(where: string, text: string, beats: Beat[] | undefined) {
  if (!beats) return;
  expect(beats.length, `${where}: 2-6 slides`).toBeGreaterThanOrEqual(2);
  expect(beats.length, `${where}: 2-6 slides`).toBeLessThanOrEqual(6);
  const found = cuesFound(text, beats);
  expect(found.missing, `${where}: cue words not in the teacher's text`).toEqual([]);
  for (const b of beats) {
    expect(b.caption.length, `${where}: caption`).toBeGreaterThan(2);
    expect(b.caption.length, `${where}: caption under 90 chars`).toBeLessThanOrEqual(90);
    expect(!!(b.photo || b.emoji || b.big), `${where}: slide needs a photo, emoji or big`).toBe(true);
  }
}

function checkVideo(where: string, v: Video | undefined) {
  if (!v) return;
  expect(isYoutubeId(v.youtube), `${where}: youtube id`).toBe(true);
  expect(v.title && v.channel, `${where}: title and channel`).toBeTruthy();
  if (v.start !== undefined && v.end !== undefined) expect(v.end, `${where}: end after start`).toBeGreaterThan(v.start);
}

describe("lesson slides and videos", () => {
  for (const [courseId, media] of Object.entries(MEDIA)) {
    const course = COURSES.find((c) => c.id === courseId);
    it(`${courseId}: media belongs to real lessons and cues match the teacher's words`, () => {
      expect(course).toBeDefined();
      for (const [lessonId, m] of Object.entries(media)) {
        const lesson = course!.lessons.find((l) => l.id === lessonId);
        expect(lesson, `${courseId}: unknown lesson ${lessonId}`).toBeDefined();
        if (m.hook) {
          expect(lesson!.hook, `${lessonId}: has no hook`).toBeDefined();
          checkBeats(`${lessonId} hook`, lesson!.hook!.text, m.hook.show);
          checkVideo(`${lessonId} hook`, m.hook.watch);
        }
        expect((m.teach ?? []).length, `${lessonId}: more media entries than teaching parts`).toBeLessThanOrEqual(lesson!.teach?.length ?? 0);
        (m.teach ?? []).forEach((t, i) => {
          if (!t) return;
          checkBeats(`${lessonId} part ${i + 1}`, lesson!.teach![i].teach, t.show);
          checkVideo(`${lessonId} part ${i + 1}`, t.watch);
        });
      }
    });
  }
});
