import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LessonFlow from "@/components/LessonFlow";
import LessonPlayer from "@/components/LessonPlayer";
import { requireKid } from "@/lib/auth";
import { features, hiddenVideos } from "@/lib/content";
import { interactiveDone, publicThink, publicWidget } from "@/lib/teaching";
import { adaptationFor, lessonView, reviewItems, teachProgress } from "@/lib/store";
import { publicProbe } from "@/lib/probes";
import { avatarFor } from "@/content/avatars";
import { TeacherVoice } from "@/components/voice";
import { photosFor } from "@/lib/media";
import { LANDS } from "@/lib/pixel/world";
import { publicShow } from "@/lib/storyboard";
import type { Beat, Video } from "@/content/courses/types";

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const { kid } = await requireKid();
  if (!features().courses) notFound();
  const { course, lesson } = await params;
  const v = lessonView(kid.id, course, decodeURIComponent(lesson));
  if (!v) notFound();
  if (v.status === "locked") redirect(`/kid/learn/${course}`);

  // Answers and explanations stay on the server; the browser only gets what it needs to show.
  const player = {
    courseId: v.course.id,
    courseTitle: v.course.title,
    hue: v.course.hue,
    teacher: { ...v.course.teacher, look: avatarFor(v.course.id), title: `${v.course.title} teacher` },
    lesson: { ...v.lesson, check: v.lesson.check.map(({ q, choices }) => ({ q, choices })) },
    next: v.next ? { id: v.next.id, title: v.next.title } : null,
    initial: {
      checkPassed: v.checkPassed,
      checkBest: v.checkBest,
      taskStatus: v.taskStatus,
      taskResponse: v.taskResponse,
      taskFeedback: v.taskFeedback,
      done: v.status === "done",
    },
  };
  const L = v.lesson;
  const seed = `${kid.id}:${L.id}`;
  // Slides: real photos are looked up (and cached) on the server.
  const f = features();
  // Lessons are quests in a land of the game world; "back" goes to that land.
  const landFor = LANDS.find((l) => l.courses.includes(v.course.id));
  const photos = f.lessonSlides
    ? await photosFor([...(L.hook?.show ?? []), ...(L.teach ?? []).flatMap((s) => s.show ?? [])].map((b) => b.photo ?? "").filter(Boolean))
    : {};
  const hidden = hiddenVideos();
  const slides = (show: Beat[] | undefined, watch: Video | undefined) =>
    publicShow(f.lessonSlides ? show : undefined, f.lessonVideos && watch && !hidden.has(watch.youtube) ? watch : undefined, photos);
  const state = L.teach?.length ? teachProgress(kid.id, v.course.id, L.id) : null;
  // The learner model decides how to adapt this lesson for this kid.
  const adaptation = state ? adaptationFor(kid.id, v.course.id) : null;
  const fresh = state ? !state.segments.some((s) => s.done || s.misses) : false;
  const review =
    adaptation?.reviewFirst && fresh
      ? reviewItems(kid.id, v.course.id).filter((r) => r.lessonId !== L.id).map((r, i) => ({ ...r, probe: publicProbe(r.probe, `${seed}:review${i}`) }))
      : [];

  return (
    <main className={`wrap ${f.tutorMode && L.teach?.length ? "lesson-tutor" : ""}`} style={{ maxWidth: f.tutorMode && L.teach?.length ? 1240 : 860 }}>
      <div className="topbar">
        <Link href={landFor ? `/kid/land/${landFor.id}` : `/kid/learn/${course}`} className="backlink">
          ← {landFor ? landFor.name : `${v.course.icon} ${v.course.title}`}
        </Link>
        <span className="kmuted small">
          Lesson {v.index + 1} of {v.course.lessons.length}
        </span>
      </div>
      <h1 style={{ marginBottom: 12 }}>{L.title}</h1>
      <TeacherVoice kind={player.teacher.look.voice}>
      {L.teach?.length && state ? (
        <LessonFlow
          player={player}
          tutorMode={f.tutorMode}
          kidName={kid.name}
          interactiveDone={v.status === "done" || interactiveDone(L, state)}
          teach={{
            hook: L.hook
              ? { text: L.hook.text, visual: L.hook.visual ? publicWidget(L.hook.visual, `${seed}:hook`) : undefined, show: slides(L.hook.show, L.hook.watch) }
              : undefined,
            segments: L.teach.map((s, i) => ({
              title: s.title,
              teach: s.teach,
              show: slides(s.show, s.watch),
              visual: s.visual ? publicWidget(s.visual, `${seed}:${i}`) : undefined,
              think: publicThink(s.think),
              ...(s.probe ? { probe: publicProbe(s.probe, `${seed}:p${i}`) } : {}),
              ...(adaptation?.exampleFirst ? { example: s.approaches.example } : {}),
            })),
            activity: L.activity ? publicWidget(L.activity, `${seed}:activity`) : undefined,
            explain: L.explain ? { prompt: L.explain.prompt } : undefined,
            adaptation: adaptation ? { mode: adaptation.mode, message: adaptation.message, offerTestOut: adaptation.offerTestOut && fresh } : undefined,
            review: review.map(({ lessonId, seg, title, probe }) => ({ lessonId, seg, title, probe })),
            mastery: L.mastery?.length ? L.mastery.map((m, i) => publicProbe(m, `${seed}:m${i}`)) : undefined,
            initial: {
              segmentsDone: state.segments.map((s) => !!s.done),
              activityDone: state.activity.done,
              explainDone: state.explain.done,
            },
          }}
        />
      ) : (
        <LessonPlayer {...player} />
      )}
      </TeacherVoice>
    </main>
  );
}
