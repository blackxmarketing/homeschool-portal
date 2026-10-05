import fs from "node:fs";
import { currentSession } from "@/lib/auth";
import { audioPath, isVoiceId } from "@/lib/tts";

/** A saved voice clip (mp3). Clips never change, so browsers may keep them. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await currentSession())) return new Response("Please log in again.", { status: 401 });
  const { id } = await params;
  if (!isVoiceId(id) || !fs.existsSync(audioPath(id))) return new Response("Not found", { status: 404 });
  return new Response(fs.readFileSync(audioPath(id)), {
    headers: { "content-type": "audio/mpeg", "cache-control": "private, max-age=31536000, immutable" },
  });
}
