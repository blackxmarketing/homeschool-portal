import { describe, expect, it } from "vitest";
import { appendSpoken, sentences } from "@/components/voice";
import { probeSpeech } from "@/components/Probes";
import { AVATARS, avatarFor } from "@/content/avatars";
import { COURSES } from "@/content/courses";
import { sanitize } from "@/lib/content";

describe("read aloud", () => {
  it("splits a lesson into sentences that cover the whole text", () => {
    const text = "Science starts with a question. Is it testable? Yes! Then we measure.";
    const parts = sentences(text);
    expect(parts.map(([a, b]) => text.slice(a, b).trim())).toEqual(["Science starts with a question.", "Is it testable?", "Yes!", "Then we measure."]);
    expect(parts[parts.length - 1][1]).toBe(text.length);
  });

  it("keeps text without end punctuation as one sentence", () => {
    expect(sentences("no punctuation here")).toEqual([[0, 19]]);
    expect(sentences("")).toEqual([[0, 0]]);
  });

  it("reads a fill-in-the-blank question with 'blank' for each gap", () => {
    expect(probeSpeech({ type: "cloze", parts: ["The ", " branch makes laws."], blanks: 1, seconds: 20 })).toBe("Fill in the blanks. The blank branch makes laws.");
    expect(probeSpeech({ type: "number", prompt: "How many?", seconds: 20 })).toBe("How many?");
  });
});

describe("talking back", () => {
  it("adds spoken words with spacing and capital letters", () => {
    expect(appendSpoken("", "plants need light")).toBe("Plants need light");
    expect(appendSpoken("Plants need light.", "they also need water")).toBe("Plants need light. They also need water");
    expect(appendSpoken("Plants need light and", "water")).toBe("Plants need light and water");
    expect(appendSpoken("Same", "   ")).toBe("Same");
  });
});

describe("teacher looks", () => {
  it("gives every course teacher their own look", () => {
    for (const c of COURSES) expect(AVATARS[c.id], c.id).toBeDefined();
  });

  it("falls back to a stable look for unknown teachers", () => {
    expect(avatarFor("someone new")).toBe(avatarFor("someone new"));
    expect(Object.values(AVATARS)).toContain(avatarFor("someone new"));
  });
});

describe("voice switches", () => {
  it("parents can turn read-aloud and the mic on and off", () => {
    const f = sanitize("features", { readAloud: false, kidMic: false, courses: true });
    expect(f.readAloud).toBe(false);
    expect(f.kidMic).toBe(false);
    expect(sanitize("features", {}).readAloud).toBe(true);
    expect(sanitize("features", { kidMic: "yes" }).kidMic).toBe(true);
  });
});
