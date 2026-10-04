"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireParent } from "@/lib/auth";
import { allCourses, setContent } from "@/lib/content";
import { parseQuestions, sanitizeTeaching } from "@/lib/courseContent";
import type { Course, Lesson } from "@/content/courses/types";

function s(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function lines(form: FormData, key: string): string[] {
  return s(form, key)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

function save(courses: Course[], to: string): never {
  setContent("courses", courses);
  revalidatePath("/", "layout");
  redirect(to);
}

function slug(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "course";
}

export async function addCourseAction(form: FormData) {
  await requireParent();
  const courses = allCourses();
  const title = s(form, "title");
  if (!title) redirect("/parent/content?error=course#courses");
  let id = slug(title);
  while (courses.some((c) => c.id === id)) id = `${id}-2`;
  courses.push({
    id,
    title,
    icon: s(form, "icon") || "📘",
    hue: 200,
    track: s(form, "track") === "life" ? "life" : "academic",
    subject: (s(form, "subject") || "Other") as Course["subject"],
    blurb: "",
    teacher: { name: "Your teacher", avatar: "🎓", inspiredBy: "", voice: "Warm, encouraging and clear." },
    lessons: [],
  });
  save(courses, `/parent/content/courses/${id}?saved=1`);
}

export async function saveCourseAction(form: FormData) {
  await requireParent();
  const id = s(form, "id");
  const courses = allCourses();
  const course = courses.find((c) => c.id === id);
  if (!course) redirect("/parent/content#courses");
  if (form.get("deleteCourse") === "on") {
    save(
      courses.filter((c) => c.id !== id),
      "/parent/content?saved=courses#courses",
    );
  }
  Object.assign(course, {
    title: s(form, "title") || course.title,
    icon: s(form, "icon"),
    hue: Number(form.get("hue")),
    track: s(form, "track") === "life" ? "life" : "academic",
    subject: s(form, "subject"),
    blurb: s(form, "blurb"),
    teacher: { name: s(form, "teacherName"), avatar: s(form, "teacherAvatar"), inspiredBy: s(form, "inspiredBy"), voice: s(form, "voice") },
  });
  // Lesson order and removals.
  const order = course.lessons
    .map((l, i) => ({ l, pos: Number(form.get(`order.${l.id}`)) || i + 1, del: form.get(`delete.${l.id}`) === "on" }))
    .filter((x) => !x.del)
    .sort((a, b) => a.pos - b.pos)
    .map((x) => x.l);
  course.lessons = order;
  save(courses, `/parent/content/courses/${id}?saved=1`);
}

export async function addLessonAction(form: FormData) {
  await requireParent();
  const courseId = s(form, "courseId");
  const courses = allCourses();
  const course = courses.find((c) => c.id === courseId);
  const title = s(form, "title");
  if (!course || !title) redirect(`/parent/content/courses/${courseId}`);
  let id = `${course.id}.${slug(title)}`;
  while (course.lessons.some((l) => l.id === id)) id = `${id}-2`;
  course.lessons.push({
    id,
    title,
    minutes: 25,
    stage: "grammar",
    read: "Write the lesson here.",
    keyIdeas: [],
    check: [],
  });
  save(courses, `/parent/content/courses/${course.id}/${encodeURIComponent(id)}?saved=1`);
}

export async function saveLessonAction(form: FormData) {
  await requireParent();
  const courseId = s(form, "courseId");
  const lessonId = s(form, "lessonId");
  const courses = allCourses();
  const course = courses.find((c) => c.id === courseId);
  const i = course?.lessons.findIndex((l) => l.id === lessonId) ?? -1;
  if (!course || i < 0) redirect(`/parent/content/courses/${courseId}`);
  const taskKind = s(form, "taskKind");
  const lesson: Lesson = {
    id: lessonId,
    title: s(form, "title") || course.lessons[i].title,
    minutes: Number(form.get("minutes")),
    stage: s(form, "stage") as Lesson["stage"],
    ...(s(form, "subject") ? { subject: s(form, "subject") as Lesson["subject"] } : {}),
    read: s(form, "read"),
    keyIdeas: lines(form, "keyIdeas"),
    check: parseQuestions(s(form, "check")),
    ...(taskKind && s(form, "taskPrompt")
      ? { task: { kind: taskKind as NonNullable<Lesson["task"]>["kind"], prompt: s(form, "taskPrompt"), rubric: lines(form, "taskRubric") } }
      : {}),
  };
  // Interactive teaching (hook, segments, activity, explain): kept as is unless edited in the advanced box.
  const teachingText = s(form, "teaching");
  let teaching = sanitizeTeaching(course.lessons[i] as unknown as Record<string, unknown>);
  if (teachingText) {
    try {
      teaching = sanitizeTeaching(JSON.parse(teachingText));
    } catch {
      redirect(`/parent/content/courses/${course.id}/${encodeURIComponent(lessonId)}?error=json`);
    }
  } else if (form.get("teachingCleared") === "1") {
    teaching = {};
  }
  course.lessons[i] = { ...lesson, ...teaching };
  save(courses, `/parent/content/courses/${course.id}/${encodeURIComponent(lessonId)}?saved=1`);
}
