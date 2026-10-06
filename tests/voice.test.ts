import { describe, expect, it } from "vitest";
import { appendSpoken, pickVoice, sentences, voiceKindOf } from "@/components/voice";
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
    for (const c of COURSES) expect(AVATARS[c.id.replace(/-(45|hs|k|[0-5])$/, "")], c.id).toBeDefined();
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

describe("male and female teacher voices", () => {
  const v = (name: string, lang = "en-US") => ({ name, lang, localService: true, default: false, voiceURI: name }) as SpeechSynthesisVoice;
  const edge = [v("Microsoft Ava Online (Natural) - English (United States)"), v("Microsoft Andrew Online (Natural) - English (United States)"), v("Microsoft Zira - English (United States)"), v("Microsoft David - English (United States)")];
  const chrome = [v("Microsoft David - English (United States)"), v("Microsoft Zira - English (United States)"), v("Google US English"), v("Google UK English Male", "en-GB"), v("Google UK English Female", "en-GB")];

  it("knows which voices are male and female", () => {
    expect(voiceKindOf("Microsoft Andrew Online (Natural) - English (United States)")).toBe("male");
    expect(voiceKindOf("Google UK English Female")).toBe("female");
    expect(voiceKindOf("Google UK English Male")).toBe("male");
    expect(voiceKindOf("Microsoft Zira - English (United States)")).toBe("female");
    expect(voiceKindOf("Samantha")).toBe("female");
    expect(voiceKindOf("Mystery voice")).toBeNull();
  });

  it("picks the most natural voice of the right kind", () => {
    expect(pickVoice(edge, "male").voice?.name).toContain("Andrew");
    expect(pickVoice(edge, "female").voice?.name).toContain("Ava");
    expect(pickVoice(chrome, "male")).toMatchObject({ matched: true });
    expect(voiceKindOf(pickVoice(chrome, "male").voice!.name)).toBe("male");
    expect(voiceKindOf(pickVoice(chrome, "female").voice!.name)).toBe("female");
  });

  it("says when no voice of that kind exists (so the pitch can be shifted)", () => {
    expect(pickVoice([v("Microsoft Zira - English (United States)")], "male")).toMatchObject({ matched: false });
    expect(pickVoice([], "male").voice).toBeNull();
  });

  it("every teacher has a voice", () => {
    for (const [id, look] of Object.entries(AVATARS)) expect(["male", "female"], id).toContain(look.voice);
  });
});
