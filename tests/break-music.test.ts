import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/** A stand-in for the browser's audio: counts the notes scheduled and checks they stop. */
class FakeParam {
  value = 1;
  setValueAtTime() {}
  exponentialRampToValueAtTime() {}
  cancelScheduledValues() {}
}
class FakeNode {
  connect(n: unknown) {
    return n;
  }
  disconnect() {
    FakeCtx.disconnected++;
  }
}
class FakeCtx {
  static notes: { type: string; at: number }[] = [];
  static disconnected = 0;
  currentTime = 0;
  destination = new FakeNode();
  resume() {
    return Promise.resolve();
  }
  createGain() {
    return Object.assign(new FakeNode(), { gain: new FakeParam() });
  }
  createOscillator() {
    const o = Object.assign(new FakeNode(), {
      type: "sine",
      frequency: new FakeParam(),
      start: (at: number) => FakeCtx.notes.push({ type: o.type, at }),
      stop() {},
    });
    return o;
  }
}

describe("break music", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    FakeCtx.notes = [];
    FakeCtx.disconnected = 0;
    vi.stubGlobal("window", { AudioContext: FakeCtx, setInterval, clearInterval, setTimeout });
    vi.stubGlobal("localStorage", { getItem: () => null });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it("plays a melody and bass while the break is on, and goes quiet when it ends", async () => {
    const { breakMusic } = await import("@/components/voice");
    const stop = breakMusic();
    expect(FakeCtx.notes.some((n) => n.type === "square")).toBe(true);
    expect(FakeCtx.notes.some((n) => n.type === "triangle")).toBe(true);
    stop();
    const count = FakeCtx.notes.length;
    vi.advanceTimersByTime(5000);
    expect(FakeCtx.notes.length).toBe(count); // nothing more is scheduled
    expect(FakeCtx.disconnected).toBe(1);
  });

  it("stays silent when sounds are turned off", async () => {
    vi.stubGlobal("localStorage", { getItem: () => JSON.stringify({ sounds: false }) });
    const { breakMusic } = await import("@/components/voice");
    breakMusic()();
    expect(FakeCtx.notes).toEqual([]);
  });
});
