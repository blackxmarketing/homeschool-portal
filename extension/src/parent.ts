import { send, type ApiReply, type Status } from "./messages";

/**
 * Parent mode, on the parent's Miacademy pages (parents.miacademy.co): reads the
 * calendar of the child being viewed - this week and the next two - and sends it
 * to the portal, so the kids' checklists come straight from the tasks the parent
 * marked. It only reads (the same calendar Miacademy shows); it never changes anything.
 */

const WEEKS = 3;
const EVERY_MS = 10 * 60 * 1000;

/** Monday of the week, n weeks from now, as YYYY-MM-DD. */
function monday(weeksAhead: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7) + weeksAhead * 7);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** The child whose page this is: Miacademy's own requests carry child="<id>", and the page says "Bryce's curriculum". */
function currentChild(): { id: string; name: string } | null {
  const urls = performance.getEntriesByType("resource").map((e) => e.name);
  let id: string | null = null;
  for (let i = urls.length - 1; i >= 0 && !id; i--) id = /[?&]child=(?:%22|")([0-9a-f-]{36})(?:%22|")/i.exec(urls[i])?.[1] ?? null;
  const heading = [...document.querySelectorAll("h1, h2, h3")]
    .map((h) => (h.textContent ?? "").trim())
    .map((t) => /^(.+?)['’]s (curriculum|courses)$/i.exec(t)?.[1])
    .find(Boolean);
  return id && heading ? { id: id.toLowerCase(), name: heading } : null;
}

async function readCalendar(child: { id: string; name: string }) {
  const weeks: unknown[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const url = `/Controllers.Curriculum.Schedule.CalendarController/GetInitialWeeklyData?child=%22${child.id}%22&subject=null&weekStart=%22${monday(w)}%22&_=`;
    const res = await fetch(url, { credentials: "include", headers: { accept: "application/json" } });
    if (!res.ok) return;
    weeks.push(await res.json());
  }
  await send<ApiReply>({ type: "api", method: "POST", path: "/api/mia/plan", body: { child, weeks } });
}

const lastRead = new Map<string, number>();
async function check() {
  const status = await send<Status>({ type: "status" });
  if (!status.connected || status.kind !== "parent") return;
  const child = currentChild();
  if (!child) return;
  if (Date.now() - (lastRead.get(child.id) ?? 0) < EVERY_MS) return;
  lastRead.set(child.id, Date.now());
  try {
    await readCalendar(child);
  } catch {
    lastRead.delete(child.id);
  }
}

// The parent may switch between children without the page reloading.
void check();
setInterval(() => void check(), 5000);
