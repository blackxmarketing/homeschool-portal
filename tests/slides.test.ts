import { describe, expect, it } from "vitest";
import { sanitizeShow, sanitizeTeaching, sanitizeVideo, withDefaultMedia, youtubeId } from "@/lib/courseContent";
import { sanitize } from "@/lib/content";
import { cleanCredit, publicShow } from "@/lib/storyboard";
import { COURSES } from "@/content/courses";
import type { Course } from "@/content/courses/types";

describe("slides from the lesson editor", () => {
  it("keeps good slides and drops broken ones", () => {
    const show = sanitizeShow([
      { caption: "Redi's jars", photo: "Francesco Redi" },
      { at: "gauze", caption: "Covered jar", emoji: "🫙" },
      { at: "nothing", caption: "" },
      { caption: "No picture" },
      "junk",
    ]);
    expect(show).toEqual([
      { caption: "Redi's jars", photo: "Francesco Redi" },
      { at: "gauze", caption: "Covered jar", emoji: "🫙" },
    ]);
    expect(sanitizeShow([])).toEqual([]);
    expect(sanitizeShow("nope")).toBeNull();
  });

  it("accepts any YouTube link a parent pastes", () => {
    for (const link of [
      "dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s",
      "https://youtu.be/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "https://www.youtube.com/shorts/dQw4w9WgXcQ",
    ])
      expect(youtubeId(link), link).toBe("dQw4w9WgXcQ");
    expect(youtubeId("https://example.com/video")).toBeNull();
    expect(sanitizeVideo({ youtube: "https://youtu.be/dQw4w9WgXcQ", title: "T", channel: "C", start: 30, end: 10 })).toEqual({
      youtube: "dQw4w9WgXcQ",
      title: "T",
      channel: "C",
      start: 30,
    });
  });

  it("keeps slides and videos when a parent edits the teaching JSON", () => {
    const lesson = COURSES.flatMap((c) => c.lessons).find((l) => l.teach?.length)!;
    const raw = JSON.parse(
      JSON.stringify({
        hook: { ...lesson.hook, show: [{ caption: "Hi", big: "1668" }, { at: "x", caption: "Jar", emoji: "🫙" }], watch: { youtube: "dQw4w9WgXcQ", title: "T", channel: "C" } },
        teach: lesson.teach,
      }),
    );
    const t = sanitizeTeaching(raw);
    expect(t.hook?.show).toHaveLength(2);
    expect(t.hook?.watch?.youtube).toBe("dQw4w9WgXcQ");
  });
});

describe("new slides reach parents' saved courses", () => {
  const base: Course = JSON.parse(JSON.stringify(COURSES[0]));
  const lesson = base.lessons.find((l) => l.teach?.length)!;
  const withSlides: Course = {
    ...base,
    lessons: base.lessons.map((l) =>
      l.id === lesson.id ? { ...l, teach: l.teach!.map((s) => ({ ...s, show: [{ caption: "New", emoji: "✨" }] })) } : l,
    ),
  };
  const strip = (c: Course): Course => ({ ...c, lessons: c.lessons.map((l) => ({ ...l, teach: l.teach?.map(({ show: _s, watch: _w, ...s }) => s) })) });

  it("adds default slides where the teacher's words are unchanged", () => {
    const merged = withDefaultMedia([strip(base)], [withSlides]);
    expect(merged[0].lessons.find((l) => l.id === lesson.id)!.teach![0].show).toEqual([{ caption: "New", emoji: "✨" }]);
  });

  it("leaves parts alone that the parent rewrote or cleared", () => {
    const edited = strip(base);
    const l = edited.lessons.find((x) => x.id === lesson.id)!;
    l.teach![0] = { ...l.teach![0], teach: "My own words." };
    if (l.teach![1]) l.teach![1] = { ...l.teach![1], show: [] };
    const merged = withDefaultMedia([edited], [withSlides]).find((c) => c.id === base.id)!.lessons.find((x) => x.id === lesson.id)!;
    expect(merged.teach![0].show).toBeUndefined();
    if (merged.teach![1]) expect(merged.teach![1].show).toEqual([]);
  });
});

describe("what the browser gets", () => {
  it("uses found photos and keeps the caption when a photo is missing", () => {
    const photo = { src: "https://upload.wikimedia.org/x.jpg", width: 960, height: 600, credit: "NASA", license: "Public domain", link: "https://commons.wikimedia.org/wiki/File:x.jpg" };
    const show = publicShow(
      [
        { caption: "Found", photo: "Moon" },
        { at: "later", caption: "Missing", photo: "Nope" },
      ],
      undefined,
      { Moon: photo, Nope: null },
    );
    expect(show?.beats).toEqual([{ caption: "Found", photo }, { at: "later", caption: "Missing" }]);
    expect(publicShow([], undefined, {})).toBeUndefined();
  });

  it("tidies photo credits", () => {
    expect(cleanCredit("Unknown authorUnknown author")).toBe("Wikimedia Commons");
    expect(cleanCredit("Jane DoeJane Doe")).toBe("Jane Doe");
    expect(cleanCredit("NASA")).toBe("NASA");
  });

  it("parents can hide videos", () => {
    expect(sanitize("hiddenVideos", ["dQw4w9WgXcQ", "bad id", "dQw4w9WgXcQ", 5])).toEqual(["dQw4w9WgXcQ"]);
    expect(sanitize("features", {}).lessonSlides).toBe(true);
  });
});
