import { describe, expect, it } from "vitest";
import { alignStarts, isVoiceId, pickVoices, speakable } from "@/lib/tts";
import { charAt } from "@/components/voice";

describe("natural voices", () => {
  it("picks a warm male and female narrator from the account's voices", () => {
    const list = [
      { voice_id: "f1", name: "Jessica", labels: { gender: "female", accent: "american" } },
      { voice_id: "f2", name: "Sarah", labels: { gender: "female", accent: "american" } },
      { voice_id: "m1", name: "George", labels: { gender: "male", accent: "british" } },
      { voice_id: "m2", name: "Brian", labels: { gender: "male", accent: "american" } },
    ];
    expect(pickVoices(list)).toEqual({ male: "m2", female: "f2" });
    expect(pickVoices([{ voice_id: "x", name: "Zed", labels: { gender: "male", accent: "american" } }]).male).toBe("x");
    // No voices listed: sensible defaults.
    expect(pickVoices([]).male).toMatch(/^\w{20}$/);
  });

  it("cleans text before it's spoken", () => {
    expect(speakable("  Hello   <b>there</b>\n friend ")).toBe("Hello there friend");
    expect(speakable("x".repeat(5000)).length).toBe(1200);
  });

  it("uses the word timings when they match, and a steady pace otherwise", () => {
    expect(alignStarts("Hi", { characters: ["H", "i"], character_start_times_seconds: [0, 0.1234] })).toEqual([0, 0.123]);
    expect(alignStarts("Hey", { characters: ["X"], character_start_times_seconds: [0] })).toHaveLength(3);
  });

  it("finds the word being spoken from the audio time", () => {
    const starts = [0, 0.1, 0.2, 0.5, 0.9];
    expect(charAt(starts, 0)).toBe(0);
    expect(charAt(starts, 0.55)).toBe(3);
    expect(charAt(starts, 5)).toBe(4);
    expect(charAt(starts, -1)).toBe(-1);
  });

  it("only serves saved clips by their id", () => {
    expect(isVoiceId("a".repeat(40))).toBe(true);
    expect(isVoiceId("../../etc/passwd")).toBe(false);
  });
});
