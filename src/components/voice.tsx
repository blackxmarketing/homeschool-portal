"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Voice for the kid side: the teacher reads lessons aloud (the browser's
 * built-in speech, nothing to install) and kids can talk back with the mic
 * (browser speech-to-text; only the text is saved, never audio).
 */

// ---------------- Settings ----------------

interface VoiceSettings {
  /** Parent switch: teachers can read aloud. */
  speakOn: boolean;
  /** Parent switch: kids can use the microphone. */
  micOn: boolean;
  /** Natural voices (ElevenLabs) are set up on the server. */
  natural?: boolean;
  /** Show the teacher's face (otherwise a voice indicator). */
  faces?: boolean;
}

const VoiceCtx = createContext<VoiceSettings>({ speakOn: true, micOn: true });

export function VoiceProvider({ speakOn, micOn, natural = false, faces = false, children }: VoiceSettings & { children: React.ReactNode }) {
  naturalOn = natural;
  return <VoiceCtx.Provider value={{ speakOn, micOn, natural, faces }}>{children}</VoiceCtx.Provider>;
}

export const useVoiceSettings = () => useContext(VoiceCtx);

/** Male or female teachers each get a matching voice. */
export type VoiceKind = "male" | "female";
const TeacherVoiceCtx = createContext<VoiceKind>("female");

/** Everything inside reads aloud in this teacher's kind of voice. */
export function TeacherVoice({ kind, children }: { kind: VoiceKind; children: React.ReactNode }) {
  return <TeacherVoiceCtx.Provider value={kind}>{children}</TeacherVoiceCtx.Provider>;
}

export const useTeacherVoice = () => useContext(TeacherVoiceCtx);

/** Each kid's own choices, kept on this device. */
export interface VoicePrefs {
  autoRead: boolean;
  rate: number;
  /** Little sounds for right answers and streaks. */
  sounds: boolean;
}

const PREFS_KEY = "voice-prefs";
const DEFAULT_PREFS: VoicePrefs = { autoRead: true, rate: 1, sounds: true };
let prefs: VoicePrefs = DEFAULT_PREFS;
let prefsLoaded = false;
const prefListeners = new Set<() => void>();

function loadPrefs(): VoicePrefs {
  if (!prefsLoaded && typeof window !== "undefined") {
    prefsLoaded = true;
    try {
      const raw = JSON.parse(localStorage.getItem(PREFS_KEY) ?? "null");
      if (raw && typeof raw === "object") {
        prefs = {
          autoRead: typeof raw.autoRead === "boolean" ? raw.autoRead : DEFAULT_PREFS.autoRead,
          rate: [0.8, 1, 1.2].includes(raw.rate) ? raw.rate : DEFAULT_PREFS.rate,
          sounds: typeof raw.sounds === "boolean" ? raw.sounds : DEFAULT_PREFS.sounds,
        };
      }
    } catch {
      // Storage can be blocked; defaults are fine.
    }
  }
  return prefs;
}

export function useVoicePrefs(): [VoicePrefs, (p: Partial<VoicePrefs>) => void] {
  const p = useSyncExternalStore(
    (cb) => {
      prefListeners.add(cb);
      return () => prefListeners.delete(cb);
    },
    loadPrefs,
    () => DEFAULT_PREFS,
  );
  const set = useCallback((next: Partial<VoicePrefs>) => {
    prefs = { ...loadPrefs(), ...next };
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore: the choice still applies for this visit.
    }
    prefListeners.forEach((l) => l());
  }, []);
  return [p, set];
}

// ---------------- Speaking (text to speech) ----------------

export interface SpeechState {
  /** Which piece of text is being read, or null. */
  id: string | null;
  /** Character position of the word being read (when the voice reports it). */
  charIndex: number;
  /** Sentence being read: [start, end) character range. */
  sentence: [number, number];
  /** True when this voice reports word positions. */
  words: boolean;
  paused: boolean;
  /** The last piece of text that was read all the way to the end. */
  lastDone: string | null;
}

const IDLE: SpeechState = { id: null, charIndex: -1, sentence: [-1, -1], words: false, paused: false, lastDone: null };
let speech: SpeechState = IDLE;
const speechListeners = new Set<() => void>();
let runToken = 0;

function setSpeech(next: Partial<SpeechState>) {
  speech = { ...speech, ...next };
  speechListeners.forEach((l) => l());
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
}

/** Voice names browsers use, by kind (Edge's "Natural" voices sound the most human). */
const MALE = /\b(male|guy|andrew|brian|christopher|eric|roger|steffan|davis|tony|jason|ryan|thomas|william|liam|connor|david|mark|james|george|daniel|alex|fred|tom|aaron|arthur|oliver|reed|rocko|evan|nathan|ralph|gordon)\b/;
const FEMALE = /\b(female|aria|jenny|ava|emma|michelle|ana|sara|nancy|jane|libby|sonia|maisie|natasha|clara|zira|hazel|susan|samantha|karen|moira|tessa|fiona|victoria|allison|ava|serena|kate|catherine|google us english|aria|joanna|salli|kimberly|ivy)\b/;

export function voiceKindOf(name: string): VoiceKind | null {
  const n = name.toLowerCase();
  if (/\bfemale\b/.test(n)) return "female";
  if (MALE.test(n)) return "male";
  if (FEMALE.test(n)) return "female";
  return null;
}

/** The most natural-sounding English voice of the right kind. */
export function pickVoice(voices: SpeechSynthesisVoice[], kind: VoiceKind): { voice: SpeechSynthesisVoice | null; matched: boolean } {
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (!en.length) return { voice: null, matched: false };
  const score = (v: SpeechSynthesisVoice) => {
    const n = v.name.toLowerCase();
    let s = 0;
    if (voiceKindOf(v.name) === kind) s += 20;
    if (v.lang.toLowerCase() === "en-us") s += 3;
    if (/natural|neural|online|premium|enhanced/.test(n)) s += 8;
    // Chrome's Google voices sound far less robotic than the old desktop voices.
    if (/^google/.test(n)) s += 6;
    if (/novelty|whisper|bad news|bells|boing|bubbles|cellos|zarvox|trinoids|albert|jester|organ|superstar|wobble|grandpa|grandma|eddy|flo|shelley|sandy|rocko/.test(n)) s -= 40;
    return s;
  };
  const voice = [...en].sort((a, b) => score(b) - score(a))[0];
  return { voice, matched: voiceKindOf(voice.name) === kind };
}

/** Splits text into sentences with their character ranges. */
export function sentences(text: string): [number, number][] {
  const out: [number, number][] = [];
  // A period inside a number (0.62), after a title (Dr. Carver) or inside U.S. doesn't end a sentence.
  const re = /(?:[^.!?]|\.(?=\d)|(?<=\b(?:Dr|Mr|Mrs|Ms|Mt|St|Jr|Sr))\.|(?<=\b[A-Za-z])\.(?=[A-Za-z]\.)|(?<=\b[A-Z]\.[A-Z])\.(?=\s+[a-z]))+(?:[.!?]+["')\]]*|$)\s*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (!m[0]) {
      re.lastIndex++;
      continue;
    }
    if (m[0].trim()) out.push([m.index, m.index + m[0].length]);
  }
  return out.length ? out : [[0, text.length]];
}

/** Reads text aloud, sentence by sentence (long single utterances get cut off in some browsers). */
// ---------------- Natural voices (ElevenLabs, made on the server) ----------------

let naturalOn = false;
let audioEl: HTMLAudioElement | null = null;
let frame = 0;
const clipCache = new Map<string, Promise<{ id: string; starts: number[] } | null>>();

/** Asks the server for the natural voice of this text (made once, then cached). */
export function fetchClip(text: string, kind: VoiceKind): Promise<{ id: string; starts: number[] } | null> {
  const key = `${kind}|${text}`;
  let p = clipCache.get(key);
  if (!p) {
    p = fetch("/api/voice", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text, kind }) })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d && typeof d.id === "string" && Array.isArray(d.starts) ? { id: d.id, starts: d.starts } : null))
      .catch(() => null);
    clipCache.set(key, p);
    // Failures can be retried later.
    p.then((r) => r === null && clipCache.delete(key));
  }
  return p;
}

/** Gets the next line ready ahead of time so it starts without a pause. */
export function prefetchVoice(text: string, kind: VoiceKind) {
  if (naturalOn && text.trim()) void fetchClip(text, kind);
}

/** Index of the last character whose start time has passed. */
export function charAt(starts: number[], t: number): number {
  let lo = 0;
  let hi = starts.length - 1;
  let ans = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (starts[mid] <= t) {
      ans = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return ans;
}

function stopAudio() {
  cancelAnimationFrame(frame);
  if (audioEl) {
    audioEl.onended = null;
    audioEl.onerror = null;
    audioEl.pause();
    audioEl = null;
  }
}

function playNatural(id: string, text: string, clip: { id: string; starts: number[] }, rate: number, token: number, fallback: () => void) {
  const parts = sentences(text);
  const a = new Audio(`/api/voice/${clip.id}`);
  audioEl = a;
  a.playbackRate = rate;
  (a as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
  const scale = clip.starts.length && clip.starts.length !== text.length ? text.length / clip.starts.length : 1;
  const tick = () => {
    if (token !== runToken || audioEl !== a) return;
    const i = charAt(clip.starts, a.currentTime);
    if (i >= 0) {
      const ci = Math.min(text.length - 1, Math.round(i * scale));
      const sentence = parts.find(([s0, e0]) => ci >= s0 && ci < e0) ?? parts[0];
      if (ci !== speech.charIndex) setSpeech({ charIndex: ci, sentence, words: true });
    }
    frame = requestAnimationFrame(tick);
  };
  a.onended = () => {
    if (token !== runToken) return;
    cancelAnimationFrame(frame);
    audioEl = null;
    setSpeech({ ...IDLE, lastDone: id });
  };
  a.onerror = () => token === runToken && fallback();
  a.play().then(
    () => (frame = requestAnimationFrame(tick)),
    () => token === runToken && fallback(),
  );
}

export function speak(id: string, text: string, opts: { rate?: number; kind?: VoiceKind } = {}) {
  if (typeof window === "undefined" || !text.trim()) return;
  const rate = opts.rate ?? loadPrefs().rate;
  const kind = opts.kind ?? "female";
  stopAudio();
  if (speechSupported()) window.speechSynthesis.cancel();
  const token = ++runToken;
  if (naturalOn) {
    const parts = sentences(text);
    setSpeech({ id, charIndex: -1, sentence: parts[0], words: true, paused: false, lastDone: null });
    const fallback = () => {
      stopAudio();
      if (token === runToken) speakBrowser(id, text, rate, kind, token);
    };
    fetchClip(text, kind).then((clip) => {
      if (token !== runToken) return;
      if (clip) playNatural(id, text, clip, rate, token, fallback);
      else fallback();
    });
    return;
  }
  speakBrowser(id, text, rate, kind, token);
}

/** The browser's built-in voice (used when natural voices are off or unavailable). */
function speakBrowser(id: string, text: string, rate: number, kind: VoiceKind, token: number) {
  if (!speechSupported()) {
    setSpeech(IDLE);
    return;
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const parts = sentences(text);
  const { voice, matched } = pickVoice(synth.getVoices(), kind);
  // No voice of the right kind on this computer: shift the pitch so it still sounds right.
  const pitch = matched ? 1 : kind === "male" ? 0.75 : 1.2;
  setSpeech({ id, charIndex: -1, sentence: parts[0], words: false, paused: false, lastDone: null });

  const say = (i: number) => {
    if (token !== runToken) return;
    if (i >= parts.length) {
      setSpeech({ ...IDLE, lastDone: id });
      return;
    }
    const [start, end] = parts[i];
    const u = new SpeechSynthesisUtterance(text.slice(start, end));
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-US";
    u.rate = rate;
    u.pitch = pitch;
    u.onstart = () => token === runToken && setSpeech({ sentence: [start, end] });
    u.onboundary = (e) => {
      if (token === runToken && e.name !== "sentence") setSpeech({ charIndex: start + e.charIndex, words: true });
    };
    u.onend = () => say(i + 1);
    // Our own restarts change the token first, so an error here means the browser stopped talking.
    u.onerror = () => token === runToken && setSpeech(IDLE);
    synth.speak(u);
  };
  say(0);
}

export function stopSpeaking() {
  runToken++;
  stopAudio();
  if (speechSupported()) window.speechSynthesis.cancel();
  setSpeech(IDLE);
}

export function pauseSpeaking() {
  if (!speech.id) return;
  if (audioEl) audioEl.pause();
  else if (speechSupported()) window.speechSynthesis.pause();
  setSpeech({ paused: true });
}

export function resumeSpeaking() {
  if (!speech.id) return;
  if (audioEl) void audioEl.play();
  else if (speechSupported()) window.speechSynthesis.resume();
  setSpeech({ paused: false });
}

export function useSpeech(): SpeechState {
  return useSyncExternalStore(
    (cb) => {
      speechListeners.add(cb);
      return () => speechListeners.delete(cb);
    },
    () => speech,
    () => IDLE,
  );
}

/** Some browsers load their voices late; this makes sure they're ready. */
function useVoicesReady() {
  useEffect(() => {
    if (!speechSupported()) return;
    window.speechSynthesis.getVoices();
    const onChange = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener?.("voiceschanged", onChange);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", onChange);
  }, []);
}

/** Stop talking when the page goes away. */
export function useStopOnUnmount() {
  useEffect(() => () => stopSpeaking(), []);
}

/** Browsers only allow speech after the kid has clicked or tapped something. */
function canAutoPlay(): boolean {
  const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } }).userActivation;
  return ua ? ua.hasBeenActive : true;
}

/**
 * Speaks `text` once when it appears, if read-aloud is on and the kid has
 * auto-read turned on.
 */
export function useAutoRead(id: string, text: string | null | undefined, enabled = true) {
  const { speakOn } = useVoiceSettings();
  const [p] = useVoicePrefs();
  const kind = useTeacherVoice();
  const spoken = useRef<string | null>(null);
  useVoicesReady();
  useEffect(() => {
    if (!enabled || !text || !speakOn || !p.autoRead || !speechSupported()) return;
    const key = `${id}:${text}`;
    if (spoken.current === key || !canAutoPlay()) return;
    // A short pause lets the screen settle before the teacher starts.
    const t = setTimeout(() => {
      spoken.current = key;
      speak(id, text, { kind });
    }, 350);
    return () => clearTimeout(t);
  }, [id, text, enabled, speakOn, p.autoRead, kind]);
}

// ---------------- Listening (speech to text) ----------------

interface RecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function recognitionCtor(): (new () => RecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: new () => RecognitionLike; webkitSpeechRecognition?: new () => RecognitionLike };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function micSupported(): boolean {
  return !!recognitionCtor();
}

const MIC_ERRORS: Record<string, string> = {
  "not-allowed": "The microphone is blocked. Ask a parent to allow it in the browser (the lock icon next to the address).",
  "service-not-allowed": "The microphone is blocked. Ask a parent to allow it in the browser (the lock icon next to the address).",
  "no-speech": "I didn't hear anything. Try again a little louder.",
  "audio-capture": "No microphone found. You can type instead.",
  network: "Speech needs the internet. You can type instead.",
};

/**
 * Turns the kid's speech into text. Final words go to `onText`; words still
 * being recognized show up in `interim`.
 */
export function useDictation(onText: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const rec = useRef<RecognitionLike | null>(null);
  const cb = useRef(onText);
  useEffect(() => {
    cb.current = onText;
  }, [onText]);

  useEffect(() => () => rec.current?.abort(), []);

  const stop = useCallback(() => {
    rec.current?.stop();
  }, []);

  const start = useCallback(() => {
    const Ctor = recognitionCtor();
    if (!Ctor) {
      setError("Talking isn't supported in this browser. Try Chrome, Edge or Safari, or type instead.");
      return;
    }
    // The teacher stops talking so the mic doesn't hear them.
    stopSpeaking();
    setError(null);
    setInterim("");
    const r = new Ctor();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-US";
    r.onresult = (e) => {
      let live = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        const t = res[0].transcript;
        if (res.isFinal) cb.current(t.trim());
        else live += t;
      }
      setInterim(live);
    };
    r.onerror = (e) => {
      if (e.error !== "aborted") setError(MIC_ERRORS[e.error] ?? "The microphone stopped. Try again, or type instead.");
    };
    r.onend = () => {
      setListening(false);
      setInterim("");
      rec.current = null;
    };
    rec.current = r;
    try {
      r.start();
      setListening(true);
    } catch {
      setError("The microphone couldn't start. Try again.");
    }
  }, []);

  return { listening, interim, error, start, stop };
}

/** Adds spoken words to existing text with sensible spacing and a capital letter. */
export function appendSpoken(current: string, spoken: string): string {
  const s = spoken.trim();
  if (!s) return current;
  const base = current.replace(/\s+$/, "");
  const startsSentence = !base || /[.!?]$/.test(base);
  const piece = startsSentence ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  return base ? `${base} ${piece}` : piece;
}

/**
 * The mic button. Shows what it's hearing as the kid talks. Hidden when the
 * parent turned the mic off.
 */
export function MicButton({
  onText,
  disabled,
  label = "Talk",
  compact = false,
}: {
  onText: (text: string) => void;
  disabled?: boolean;
  label?: string;
  compact?: boolean;
}) {
  const { micOn } = useVoiceSettings();
  const d = useDictation(onText);
  const [supported, setSupported] = useState(true);
  useEffect(() => setSupported(micSupported()), []);
  if (!micOn) return null;
  if (!supported) {
    return compact ? null : <span className="kmuted small">🎤 Talking works in Chrome, Edge or Safari.</span>;
  }
  return (
    <span className="mic-wrap">
      <button
        type="button"
        className={`mic-btn ${d.listening ? "listening" : ""}`}
        onClick={d.listening ? d.stop : d.start}
        disabled={disabled}
        aria-pressed={d.listening}
        title={d.listening ? "Stop listening" : "Talk instead of typing"}
      >
        {d.listening ? "■ Done talking" : `🎤 ${label}`}
      </button>
      {d.listening && <span className="mic-interim">{d.interim || "Listening…"}</span>}
      {d.error && <span className="error small">{d.error}</span>}
    </span>
  );
}

/** A small "read this to me" button for any piece of teacher text. */
export function SayButton({ id, text, label }: { id: string; text: string; label?: string }) {
  const { speakOn } = useVoiceSettings();
  const kind = useTeacherVoice();
  const s = useSpeech();
  const [supported, setSupported] = useState(false);
  useEffect(() => setSupported(speechSupported()), []);
  if (!speakOn || !supported || !text) return null;
  const on = s.id === id;
  return (
    <button
      type="button"
      className={`say-btn ${on ? "on" : ""}`}
      onClick={() => (on ? stopSpeaking() : speak(id, text, { kind }))}
      aria-label={on ? "Stop reading" : "Read this to me"}
      title={on ? "Stop" : "Read this to me"}
    >
      {on ? "■" : "🔊"}
      {label && <span>{on ? "Stop" : label}</span>}
    </button>
  );
}

// ---------------- Little sounds ----------------

let audio: AudioContext | null = null;

/** A short, soft chime: "right" (two rising notes), "streak" (three) or "oops" (one low note). */
export function chime(kind: "right" | "streak" | "oops" | "caught" | "growl" | "died" | "medal" | "pop" | "star", step = 0) {
  if (typeof window === "undefined" || !loadPrefs().sounds) return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    audio ??= new Ctx();

    if (kind === "star") {
      // A star landing on the board. Each one a note higher than the last, so
      // three of them arriving is a little tune.
      const t = audio.currentTime;
      const hz = [784, 988, 1319][Math.min(2, Math.max(0, Math.floor(step)))];
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(hz, t);
      o.frequency.setValueAtTime(hz * 2, t + 0.07);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      o.connect(g).connect(audio.destination);
      o.start(t);
      o.stop(t + 0.48);
      return;
    }

    if (kind === "medal") {
      // Mastering a level: the one fanfare in the game. A rising run up to the
      // octave, held, with a shimmer over the top of it.
      const t = audio.currentTime;
      const tune = [523, 659, 784, 1047];
      tune.forEach((hz, i) => {
        const o = audio!.createOscillator();
        const g = audio!.createGain();
        const at = t + i * 0.13;
        o.type = "square";
        o.frequency.setValueAtTime(hz, at);
        g.gain.setValueAtTime(0.0001, at);
        g.gain.exponentialRampToValueAtTime(0.1, at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, at + (i === tune.length - 1 ? 0.9 : 0.22));
        o.connect(g).connect(audio!.destination);
        o.start(at);
        o.stop(at + (i === tune.length - 1 ? 0.95 : 0.25));
      });
      const s = audio.createOscillator();
      const sg = audio.createGain();
      s.type = "triangle";
      s.frequency.setValueAtTime(1568, t + 0.4);
      s.frequency.linearRampToValueAtTime(2093, t + 1.2);
      sg.gain.setValueAtTime(0.0001, t + 0.4);
      sg.gain.exponentialRampToValueAtTime(0.035, t + 0.5);
      sg.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
      s.connect(sg).connect(audio.destination);
      s.start(t + 0.4);
      s.stop(t + 1.35);
      return;
    }

    if (kind === "pop") {
      // One firework going off: a crack and a tail of sparks.
      const t = audio.currentTime;
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(880, t);
      o.frequency.exponentialRampToValueAtTime(140, t + 0.18);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g).connect(audio.destination);
      o.start(t);
      o.stop(t + 0.32);
      for (let i = 0; i < 5; i++) {
        const sp = audio.createOscillator();
        const sg2 = audio.createGain();
        const at = t + 0.08 + i * 0.05;
        sp.type = "triangle";
        sp.frequency.setValueAtTime(1200 + Math.random() * 1400, at);
        sg2.gain.setValueAtTime(0.0001, at);
        sg2.gain.exponentialRampToValueAtTime(0.03, at + 0.01);
        sg2.gain.exponentialRampToValueAtTime(0.0001, at + 0.12);
        sp.connect(sg2).connect(audio.destination);
        sp.start(at);
        sp.stop(at + 0.14);
      }
      return;
    }

    if (kind === "died") {
      // A life gone: a little hop of a tune and then the floor falls out of
      // it. Short, and clearly an end rather than a telling-off.
      const t = audio.currentTime;
      const o = audio.createOscillator();
      const g = audio.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(523, t);
      o.frequency.setValueAtTime(392, t + 0.1);
      o.frequency.setValueAtTime(622, t + 0.2);
      o.frequency.exponentialRampToValueAtTime(110, t + 0.75);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.03);
      g.gain.setValueAtTime(0.12, t + 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
      o.connect(g).connect(audio.destination);
      o.start(t);
      o.stop(t + 0.82);
      return;
    }

    if (kind === "growl") {
      // A step of something large and unfriendly, somewhere behind you. Short
      // and low enough to sit under a kid answering out loud rather than
      // talking over them.
      const o = audio.createOscillator();
      const g = audio.createGain();
      const t = audio.currentTime;
      o.type = "sawtooth";
      o.frequency.setValueAtTime(96, t);
      o.frequency.linearRampToValueAtTime(58, t + 0.16);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.07, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(g).connect(audio.destination);
      o.start(t);
      o.stop(t + 0.22);
      return;
    }

    if (kind === "caught") {
      // Something got you: a growl that slides downwards. Deliberately not the
      // same as a wrong answer - one of them means you miscounted, the other
      // means a monster is standing on your head, and a kid should be able to
      // tell which without looking up.
      const o = audio.createOscillator();
      const g = audio.createGain();
      const t = audio.currentTime;
      o.type = "sawtooth";
      o.frequency.setValueAtTime(300, t);
      o.frequency.exponentialRampToValueAtTime(70, t + 0.42);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.16, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
      o.connect(g).connect(audio.destination);
      o.start(t);
      o.stop(t + 0.46);
      return;
    }

    const notes = kind === "right" ? [660, 880] : kind === "streak" ? [660, 880, 1175] : [220];
    notes.forEach((f, i) => {
      const o = audio!.createOscillator();
      const g = audio!.createGain();
      const t = audio!.currentTime + i * 0.11;
      o.type = kind === "oops" ? "triangle" : "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      o.connect(g).connect(audio!.destination);
      o.start(t);
      o.stop(t + 0.3);
    });
  } catch {
    // Sound is a bonus; never let it break the lesson.
  }
}

/**
 * A cheerful little chiptune that loops while a Miacademy break is on (an
 * original tune, played by the browser: square-wave melody, triangle bass).
 * Quiet, so the teacher's "30 seconds left" still comes through. Returns stop().
 */
export function breakMusic(): () => void {
  if (typeof window === "undefined" || !loadPrefs().sounds) return () => {};
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return () => {};
  audio ??= new Ctx();
  const ctx = audio;
  void ctx.resume();
  // MIDI notes, one per eighth note (null = rest); bass is one note per quarter.
  const MELODY = [72, 76, 79, 76, 74, 77, 81, 77, 76, 79, 84, 79, 77, 76, 74, null, 72, 76, 79, 76, 74, 77, 81, 79, 84, 83, 81, 79, 77, 74, 72, null];
  const BASS = [48, 55, 48, 55, 53, 48, 55, 43, 48, 55, 48, 55, 53, 55, 48, 48];
  const STEP = 0.2;
  const hz = (n: number) => 440 * 2 ** ((n - 69) / 12);
  const out = ctx.createGain();
  out.gain.setValueAtTime(0.0001, ctx.currentTime);
  out.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 0.6);
  out.connect(ctx.destination);
  const note = (type: OscillatorType, n: number, at: number, len: number, vol: number) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(hz(n), at);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + len);
    o.connect(g).connect(out);
    o.start(at);
    o.stop(at + len + 0.02);
  };
  let step = 0;
  let next = ctx.currentTime + 0.1;
  const tick = () => {
    while (next < ctx.currentTime + 0.3) {
      const m = MELODY[step % MELODY.length];
      if (m !== null) note("square", m, next, STEP * 0.8, 0.025);
      if (step % 2 === 0) note("triangle", BASS[(step / 2) % BASS.length], next, STEP * 1.8, 0.06);
      step++;
      next += STEP;
    }
  };
  tick();
  const timer = window.setInterval(tick, 50);
  return () => {
    window.clearInterval(timer);
    const t = ctx.currentTime;
    out.gain.cancelScheduledValues(t);
    out.gain.setValueAtTime(Math.max(out.gain.value, 0.0001), t);
    out.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    window.setTimeout(() => out.disconnect(), 400);
  };
}

/**
 * Money sounds for the buddy bank: "ching" (a cash register, when a weekly
 * ring fills) and "clink" (the coin landing in the bank).
 */
export function moneySound(kind: "ching" | "clink") {
  if (typeof window === "undefined" || !loadPrefs().sounds) return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    audio ??= new Ctx();
    const ctx = audio;
    void ctx.resume();
    const t = ctx.currentTime;
    const ping = (hz: number, at: number, len: number, vol: number, type: OscillatorType = "square") => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(hz, at);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(vol, at + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, at + len);
      o.connect(g).connect(ctx.destination);
      o.start(at);
      o.stop(at + len + 0.02);
    };
    if (kind === "clink") {
      ping(1976, t, 0.12, 0.05);
      ping(2637, t + 0.06, 0.25, 0.04);
      return;
    }
    // "Cha-": the drawer's short rattle; "-ching!": a bright bell with a shimmer.
    for (let i = 0; i < 4; i++) ping(180 + i * 40, t + i * 0.025, 0.04, 0.05);
    ping(1319, t + 0.14, 0.5, 0.06);
    ping(1760, t + 0.14, 0.6, 0.05);
    ping(2637, t + 0.2, 0.7, 0.03, "triangle");
    ping(3136, t + 0.26, 0.5, 0.02, "triangle");
  } catch {
    // No sound is fine.
  }
}

/** The checklist's "check!": a quick tick and a bright two-note ding. */
/** On a tap: get sound ready, so a "ding" that comes after a network wait still plays. */
export function primeSound() {
  if (typeof window === "undefined") return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    audio ??= new Ctx();
    void audio.resume();
  } catch {
    // No sound is fine.
  }
}

export function checkSound() {
  if (typeof window === "undefined" || !loadPrefs().sounds) return;
  try {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    audio ??= new Ctx();
    const ctx = audio;
    void ctx.resume();
    const t = ctx.currentTime;
    const ping = (hz: number, at: number, len: number, vol: number, type: OscillatorType) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(hz, at);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(vol, at + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, at + len);
      o.connect(g).connect(ctx.destination);
      o.start(at);
      o.stop(at + len + 0.02);
    };
    ping(220, t, 0.04, 0.06, "square");
    ping(1047, t + 0.05, 0.18, 0.06, "square");
    ping(1568, t + 0.13, 0.35, 0.06, "square");
  } catch {
    // No sound is fine.
  }
}
