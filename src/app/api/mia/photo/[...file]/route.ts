import fs from "node:fs";
import path from "node:path";
import { currentSession } from "@/lib/auth";
import { getKid } from "@/lib/store";
import { miaPhotoDir } from "@/lib/miaPhotos";

/** A parent looks at a kid's checklist photo: /api/mia/photo/<kidId>/<file>. */
export async function GET(_req: Request, { params }: { params: Promise<{ file: string[] }> }) {
  const s = await currentSession();
  if (s?.role !== "parent") return new Response("Please log in again.", { status: 401 });
  const parts = (await params).file;
  if (parts.length !== 2 || !/^\d+$/.test(parts[0]) || !/^[\w.-]+\.(jpg|png|webp)$/.test(parts[1])) return new Response("Not found", { status: 404 });
  const kid = getKid(Number(parts[0]));
  if (!kid || kid.family_id !== s.familyId) return new Response("Not found", { status: 404 });
  const file = path.join(miaPhotoDir(), parts[0], parts[1]);
  if (!fs.existsSync(file)) return new Response("Not found", { status: 404 });
  const type = file.endsWith(".png") ? "image/png" : file.endsWith(".webp") ? "image/webp" : "image/jpeg";
  return new Response(fs.readFileSync(file), { headers: { "content-type": type, "cache-control": "private, max-age=86400" } });
}
