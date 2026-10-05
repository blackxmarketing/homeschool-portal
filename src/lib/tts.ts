import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

/**
 * Natural teacher voices from ElevenLabs. Each sentence is made once and
 * saved on the server (DATA_DIR/voice), so the same lesson line is never paid
 * for twice. Turned on by ELEVENLABS_API_KEY in the server's .env; without it
 * the portal falls back to the browser's own voices.
 *
 * Optional settings (.env): ELEVENLABS_VOICE_MALE, ELEVENLABS_VOICE_FEMALE
 * (voice ids), ELEVENLABS_MODEL (default eleven_multilingual_v2) and
 * ELEVENLABS_DAILY_CHARS (new characters a day, default 20000).
 */

export type VoiceKind = "male" | "female";

export interface Spoken {
  /** Cache id; the audio is served at /api/voice/<id>. */
  id: string;
  /** Start time (seconds) of each character, for word-by-word captions. */
  starts: number[];
}

const API = "https://api.elevenlabs.io/v1";
const MAX_CHARS = 1200;

export const ttsEnabled = () => !!process.env.ELEVENLABS_API_KEY;

const dir = () => {
  const d = path.join(process.env.DATA_DIR ?? path.join(process.cwd(), "data"), "voice");
  fs.mkdirSync(d, { recursive: true });
  return d;
};

export const audioPath = (id: string) => path.join(dir(), `${id}.mp3`);
const metaPath = (id: string) => path.join(dir(), `${id}.json`);
export const isVoiceId = (id: string) => /^[a-f0-9]{40}$/.test(id);

// ---------------- Choosing voices ----------------

/** Warm, clear narrators first. Names from ElevenLabs' default voice library. */
const PREFER: Record<VoiceKind, string[]> = {
  male: ["Brian", "Chris", "Eric", "Daniel", "Bill", "Adam", "Roger", "Will", "Liam"],
  female: ["Sarah", "Jessica", "Alice", "Matilda", "Laura", "Lily", "Rachel", "Aria"],
};
const FALLBACK: Record<VoiceKind, string> = { male: "nPczCjzI2devNBz1zQrb", female: "EXAVITQu4vr4xnSDxMaL" };

let voices: Promise<Record<VoiceKind, string>> | null = null;

type ApiVoice = { voice_id: string; name: string; labels?: Record<string, string> };

/** Picks one male and one female voice from the account (once), unless set in .env. */
export function pickVoices(list: ApiVoice[]): Record<VoiceKind, string> {
  const choose = (kind: VoiceKind) => {
    const ofKind = list.filter((v) => (v.labels?.gender ?? "").toLowerCase() === kind);
    for (const name of PREFER[kind]) {
      const v = ofKind.find((x) => x.name.toLowerCase().startsWith(name.toLowerCase()));
      if (v) return v.voice_id;
    }
    const american = ofKind.find((v) => /american/i.test(v.labels?.accent ?? ""));
    return (american ?? ofKind[0])?.voice_id ?? FALLBACK[kind];
  };
  return { male: choose("male"), female: choose("female") };
}

async function voiceIds(): Promise<Record<VoiceKind, string>> {
  const env = { male: process.env.ELEVENLABS_VOICE_MALE, female: process.env.ELEVENLABS_VOICE_FEMALE };
  if (env.male && env.female) return env as Record<VoiceKind, string>;
  voices ??= (async () => {
    try {
      const res = await fetch(`${API}/voices`, { headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY! } });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { voices?: ApiVoice[] };
      return pickVoices(data.voices ?? []);
    } catch {
      voices = null; // try again next time
      return FALLBACK;
    }
  })();
  const picked = await voices;
  return { male: env.male ?? picked.male, female: env.female ?? picked.female };
}

// ---------------- A daily budget, so a bug can never run up a bill ----------------

const budget = { day: "", used: 0 };
function spend(chars: number): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (budget.day !== today) Object.assign(budget, { day: today, used: 0 });
  const limit = Number(process.env.ELEVENLABS_DAILY_CHARS) || 20_000;
  if (budget.used + chars > limit) return false;
  budget.used += chars;
  return true;
}

/** Cleans text for speaking: plain, short enough, no markup. */
export function speakable(text: string): string {
  return text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, MAX_CHARS);
}

/**
 * The teacher saying `text`: from the cache if it was made before, otherwise
 * made now. Null when voices are off, over budget, or ElevenLabs is down
 * (the browser voice is used instead).
 */
export async function speakText(text: string, kind: VoiceKind): Promise<Spoken | null> {
  const clean = speakable(text);
  if (!clean || !ttsEnabled()) return null;
  const ids = await voiceIds();
  const model = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";
  const id = crypto.createHash("sha1").update(`${ids[kind]}|${model}|${clean}`).digest("hex");
  if (fs.existsSync(audioPath(id)) && fs.existsSync(metaPath(id))) {
    return { id, starts: JSON.parse(fs.readFileSync(metaPath(id), "utf8")).starts };
  }
  if (!spend(clean.length)) return null;
  try {
    const res = await fetch(`${API}/text-to-speech/${ids[kind]}/with-timestamps?output_format=mp3_44100_64`, {
      method: "POST",
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, "content-type": "application/json" },
      body: JSON.stringify({
        text: clean,
        model_id: model,
        // Steady and warm, like a patient teacher.
        voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.25, use_speaker_boost: true },
      }),
    });
    if (!res.ok) {
      console.warn(`ElevenLabs error ${res.status}; using the browser voice`);
      return null;
    }
    const data = (await res.json()) as { audio_base64: string; alignment?: { characters: string[]; character_start_times_seconds: number[] } };
    const starts = alignStarts(clean, data.alignment);
    fs.writeFileSync(audioPath(id), Buffer.from(data.audio_base64, "base64"));
    fs.writeFileSync(metaPath(id), JSON.stringify({ text: clean, kind, starts }));
    return { id, starts };
  } catch (err) {
    console.warn("ElevenLabs failed; using the browser voice", err);
    return null;
  }
}

/** Start time for each character of `text` (the alignment can be missing or slightly different). */
export function alignStarts(text: string, alignment?: { characters: string[]; character_start_times_seconds: number[] }): number[] {
  if (alignment && alignment.characters.join("") === text) return alignment.character_start_times_seconds.map((t) => Math.round(t * 1000) / 1000);
  // Fallback: spread the characters evenly over a typical speaking pace.
  return [...text].map((_, i) => Math.round((i / 15) * 1000) / 1000);
}
