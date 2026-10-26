import { send, type ApiReply, type Status } from "./messages";

/**
 * Parent mode, on the parent's Miacademy pages (parents.miacademy.co). For the
 * child being viewed it reads, and sends to the portal:
 * - the calendar for this week and the next five (which day each task is on), and
 * - every course page: each task the parent checked (assigned) in each course,
 *   in course order, whether it's done, and each lesson's answer key. That's the
 *   whole class's checklist, ahead of time.
 * It only reads (the same data Miacademy's own pages load); it never changes anything.
 */

const WEEKS = 6;
const EVERY_MS = 10 * 60 * 1000;
/** The course pages are many small requests: read them every few hours, gently. */
const COURSES_EVERY_MS = 3 * 60 * 60 * 1000;
const GAP_MS = 300;
const SUBJECTS = ["LanguageArts", "Math", "Science", "GeographyAndHistory"];

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

const enc = (v: unknown) => encodeURIComponent(JSON.stringify(v));

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let lastFetch = 0;

/** One request at a time, gently spaced, waiting and trying again if Miacademy says "too many requests". */
async function getJson<T>(url: string): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const wait = lastFetch + GAP_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastFetch = Date.now();
    const res = await fetch(url, { credentials: "include", headers: { accept: "application/json" } });
    if (res.status === 429 && attempt < 5) {
      await sleep(5000 * 2 ** attempt);
      continue;
    }
    if (!res.ok) throw new Error(`${res.status}`);
    return (await res.json()) as T;
  }
}

async function readCalendar(child: { id: string }): Promise<unknown[]> {
  const weeks: unknown[] = [];
  for (let w = 0; w < WEEKS; w++)
    weeks.push(await getJson(`/Controllers.Curriculum.Schedule.CalendarController/GetInitialWeeklyData?child=%22${child.id}%22&subject=null&weekStart=%22${monday(w)}%22&_=`));
  return weeks;
}

// ---- The course pages ----

interface State {
  IsAssigned?: boolean;
  IsCompleted?: boolean;
  IsExcused?: boolean;
}
interface CourseTask {
  taskId: string;
  course: string;
  subject: string;
  unitTitle: string;
  lessonTitle: string;
  name: string;
  type: string;
  completed: boolean;
  pdfUrl: string | null;
  keyUrl: string | null;
  seq: number;
}

/** Miacademy's paged lists (units of a course, lessons of a unit). */
const range = async (dataUrl: string, limit: number) =>
  (
    await getJson<{ Items?: string[] }>(
      `/Control.Vue.Stores.Shared.AjaxHelpers/GetRangeAsync?dataUrl=${enc(dataUrl)}&offset=0&limit=${limit}&offsetPrecision=%22Unfiltered%22&limitPrecision=%22AlmostExact%22&_=`,
    )
  ).Items ?? [];
/** Miacademy's details for a list of ids. */
const convert = <T>(ids: string[], converterUrl: string) =>
  getJson<T[]>(`/Control.Vue.Stores.Shared.AjaxHelpers/ConvertAsync?data=${enc(ids)}&converterUrl=${enc(converterUrl)}&_=`);

async function readCourses(child: { id: string }): Promise<CourseTask[]> {
  const c = `%22${child.id}%22`;
  const enrolled = await getJson<{ Subject: string; Courses: string[] }[]>(
    `/Controllers.Curriculum.Configuration.CourseEnrollmentController/GetEnrolledCourses?child=${c}&subjects=${enc(SUBJECTS)}&_=`,
  );
  const subjectOf = new Map(enrolled.flatMap((s) => s.Courses.map((id) => [id, s.Subject] as const)));
  const courses = await getJson<{ Title: string; Course: string }[]>(
    `/Controllers.Curriculum.Configuration.CourseEnrollmentController/ConvertEnrolledCourses?child=${c}&courses=${enc([...subjectOf.keys()])}&_=`,
  );
  const out: CourseTask[] = [];
  for (const [ci, course] of courses.entries()) {
    const units = await range(`/Controllers.Curriculum.Configuration.UnitController/GetUnits?child=${c}&course=%22${course.Course}%22&_=`, 80);
    for (const [ui, unit] of units.entries()) {
      // Only units with something checked that isn't done yet.
      const unitState = await getJson<State>(`/Controllers.Curriculum.Configuration.UnitController/GetState?child=${c}&unit=%22${unit}%22&_=`);
      if (!unitState.IsAssigned) continue;
      const [unitInfo] = await convert<{ Title: string; LessonPdfs?: { LessonTitle: string; AnswerKeysPdfs?: { Title: string; Url: string }[] }[] }>(
        [unit],
        `/Controllers.Curriculum.Configuration.UnitController/ConvertUnit?child=${c}&unit=PLH_ONE_&_=`,
      );
      const keyFor = (lesson: string) =>
        unitInfo?.LessonPdfs?.find((p) => p.LessonTitle === lesson)?.AnswerKeysPdfs?.find((k) => /answer key/i.test(k.Title))?.Url ?? null;
      const lessons = await range(`/Controllers.Curriculum.Configuration.LessonController/GetLessons?child=${c}&unit=%22${unit}%22&_=`, 100);
      const lessonInfo = lessons.length
        ? await convert<{ Name: string }>(lessons, `/Controllers.Curriculum.Configuration.LessonController/ConvertLesson?child=${c}&lesson=PLH_ONE_&_=`)
        : [];
      for (const [li, lesson] of lessons.entries()) {
        const state = await getJson<State>(`/Controllers.Curriculum.Configuration.LessonController/GetState?child=${c}&lesson=%22${lesson}%22&_=`);
        if (!state.IsAssigned && !state.IsCompleted) continue;
        const tasks = await getJson<{ Uuid: string; TaskData: { Name: string; TaskType: string; PreviewData?: { Url?: string } | null }; State: State }[]>(
          `/Controllers.Curriculum.Configuration.TaskController/GetConvertedTasks?lesson=%22${lesson}%22&child=${c}&_=`,
        );
        const title = lessonInfo[li]?.Name ?? "";
        for (const [ti, t] of tasks.entries()) {
          if (t.State?.IsExcused || !(t.State?.IsAssigned || t.State?.IsCompleted)) continue;
          out.push({
            taskId: t.Uuid,
            course: course.Title,
            subject: subjectOf.get(course.Course) ?? "",
            unitTitle: unitInfo?.Title ?? "",
            lessonTitle: title,
            name: t.TaskData?.Name ?? "",
            type: t.TaskData?.TaskType ?? "",
            completed: !!t.State?.IsCompleted,
            pdfUrl: t.TaskData?.TaskType === "Pdf" ? (t.TaskData.PreviewData?.Url ?? null) : null,
            keyUrl: keyFor(title),
            seq: ci * 1_000_000 + ui * 10_000 + li * 100 + ti,
          });
        }
      }
    }
  }
  return out;
}

const lastCourses = new Map<string, number>();

async function readChild(child: { id: string; name: string }) {
  const weeks = await readCalendar(child);
  await send<ApiReply>({ type: "api", method: "POST", path: "/api/mia/plan", body: { child, weeks } });
  // Then the course pages (slower). If they fail, the calendar has already gone through.
  if (Date.now() - (lastCourses.get(child.id) ?? 0) < COURSES_EVERY_MS) return;
  lastCourses.set(child.id, Date.now());
  const courses = await readCourses(child).catch(() => {
    lastCourses.delete(child.id);
    return undefined;
  });
  if (courses) await send<ApiReply>({ type: "api", method: "POST", path: "/api/mia/plan", body: { child, weeks, courses } });
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
    await readChild(child);
  } catch {
    lastRead.delete(child.id);
  }
}

// The parent may switch between children without the page reloading.
void check();
setInterval(() => void check(), 5000);
