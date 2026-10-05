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
}

const VoiceCtx = createContext<VoiceSettings>({ speakOn: true, micOn: true });

export function VoiceProvider({ speakOn, micOn, children }: VoiceSettings & { children: React.ReactNode }) {
  return <VoiceCtx.Provider value={{ speakOn, micOn }}>{children}</VoiceCtx.Provider>;
}

export const useVoiceSettings = () => useContext(VoiceCtx);

/** Each kid's own choices, kept on this device. */
export interface VoicePrefs {
  autoRead: boolean;
  rate: number;
}

const PREFS_KEY = "voice-prefs";
const DEFAULT_PREFS: VoicePrefs = { autoRead: true, rate: 1 };
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
}

const IDLE: SpeechState = { id: null, charIndex: -1, sentence: [-1, -1], words: false, paused: false };
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

/** Natural-sounding English voices first. */
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (!voices.length) return null;
  const score = (v: SpeechSynthesisVoice) => {
    const n = v.name.toLowerCase();
    let s = 0;
    if (v.lang.toLowerCase() === "en-us") s += 3;
    if (/natural|neural|online/.test(n)) s += 6;
    if (/aria|jenny|ava|samantha|google us english|michelle|emma|guy|andrew/.test(n)) s += 4;
    if (v.localService) s += 1;
    if (/novelty|whisper|bad news|bells|boing|bubbles|cellos|zarvox|trinoids|albert|jester|organ|superstar|wobble/.test(n)) s -= 20;
    return s;
  };
  return [...voices].sort((a, b) => score(b) - score(a))[0];
}

/** Splits text into sentences with their character ranges. */
export function sentences(text: string): [number, number][] {
  const out: [number, number][] = [];
  const re = /[^.!?]+(?:[.!?]+["')\]]*|$)\s*/g;
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
export function speak(id: string, text: string, rate = loadPrefs().rate) {
  if (!speechSupported() || !text.trim()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const token = ++runToken;
  const parts = sentences(text);
  const voice = pickVoice();
  setSpeech({ id, charIndex: -1, sentence: parts[0], words: false, paused: false });

  const say = (i: number) => {
    if (token !== runToken) return;
    if (i >= parts.length) {
      setSpeech(IDLE);
      return;
    }
    const [start, end] = parts[i];
    const u = new SpeechSynthesisUtterance(text.slice(start, end));
    if (voice) u.voice = voice;
    u.lang = voice?.lang ?? "en-US";
    u.rate = rate;
    u.pitch = 1;
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
  if (speechSupported()) window.speechSynthesis.cancel();
  setSpeech(IDLE);
}

export function pauseSpeaking() {
  if (!speechSupported() || !speech.id) return;
  window.speechSynthesis.pause();
  setSpeech({ paused: true });
}

export function resumeSpeaking() {
  if (!speechSupported() || !speech.id) return;
  window.speechSynthesis.resume();
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
  const spoken = useRef<string | null>(null);
  useVoicesReady();
  useEffect(() => {
    if (!enabled || !text || !speakOn || !p.autoRead || !speechSupported()) return;
    const key = `${id}:${text}`;
    if (spoken.current === key || !canAutoPlay()) return;
    // A short pause lets the screen settle before the teacher starts.
    const t = setTimeout(() => {
      spoken.current = key;
      speak(id, text);
    }, 350);
    return () => clearTimeout(t);
  }, [id, text, enabled, speakOn, p.autoRead]);
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
  const s = useSpeech();
  const [supported, setSupported] = useState(false);
  useEffect(() => setSupported(speechSupported()), []);
  if (!speakOn || !supported || !text) return null;
  const on = s.id === id;
  return (
    <button
      type="button"
      className={`say-btn ${on ? "on" : ""}`}
      onClick={() => (on ? stopSpeaking() : speak(id, text))}
      aria-label={on ? "Stop reading" : "Read this to me"}
      title={on ? "Stop" : "Read this to me"}
    >
      {on ? "■" : "🔊"}
      {label && <span>{on ? "Stop" : label}</span>}
    </button>
  );
}
