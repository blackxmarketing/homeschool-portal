import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "./db";
import { getKid, type Kid } from "./store";

const COOKIE = "lp_session";
const PARENT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const KID_TTL_MS = 12 * 60 * 60 * 1000;

export type Session =
  | { role: "parent"; parentId: number; familyId: number; exp: number }
  | { role: "kid"; kidId: number; familyId: number; exp: number };

/** Uses SESSION_SECRET if set; otherwise generates one and keeps it in the database. */
function secret(): string {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const db = getDb();
  const row = db.prepare("SELECT value FROM settings WHERE key = 'session_secret'").get() as { value: string } | undefined;
  if (row) return row.value;
  const value = crypto.randomBytes(32).toString("hex");
  db.prepare("INSERT INTO settings (key, value) VALUES ('session_secret', ?)").run(value);
  return value;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(s: Session): string {
  const payload = Buffer.from(JSON.stringify(s)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSession(token: string | undefined): Session | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const s = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    return s.exp > Date.now() ? s : null;
  } catch {
    return null;
  }
}

type NewSession =
  | { role: "parent"; parentId: number; familyId: number }
  | { role: "kid"; kidId: number; familyId: number };

export async function startSession(s: NewSession): Promise<void> {
  const ttl = s.role === "parent" ? PARENT_TTL_MS : KID_TTL_MS;
  const session = { ...s, exp: Date.now() + ttl } as Session;
  (await cookies()).set(COOKIE, encodeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(ttl / 1000),
  });
}

export async function endSession(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

export async function currentSession(): Promise<Session | null> {
  return decodeSession((await cookies()).get(COOKIE)?.value);
}

export async function requireParent(): Promise<Extract<Session, { role: "parent" }>> {
  const s = await currentSession();
  if (s?.role !== "parent") redirect("/parent/login");
  return s;
}

export async function requireKid(): Promise<{ session: Extract<Session, { role: "kid" }>; kid: Kid }> {
  const s = await currentSession();
  if (s?.role !== "kid") redirect("/");
  const kid = getKid(s.kidId);
  if (!kid) redirect("/");
  return { session: s, kid };
}

/** For API routes: returns the kid session or null (no redirect). */
export async function kidFromRequest(): Promise<Kid | null> {
  const s = await currentSession();
  if (s?.role !== "kid") return null;
  return getKid(s.kidId) ?? null;
}
