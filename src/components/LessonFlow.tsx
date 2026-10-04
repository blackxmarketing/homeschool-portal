"use client";

import { useState } from "react";
import LessonPlayer from "./LessonPlayer";
import TeachPlayer, { type PublicSegment, type TeachInitial } from "./TeachPlayer";
import type { PublicWidget } from "@/lib/teaching";

type PlayerProps = React.ComponentProps<typeof LessonPlayer>;

/**
 * The full teaching model: interactive teaching first (hook, segments with
 * coaching, activity, explain it back), then "show what you know" and the task.
 */
export default function LessonFlow({
  player,
  teach,
  interactiveDone,
}: {
  player: PlayerProps;
  teach: {
    hook?: { text: string; visual?: PublicWidget };
    segments: PublicSegment[];
    activity?: PublicWidget;
    explain?: { prompt: string };
    initial: TeachInitial;
  };
  interactiveDone: boolean;
}) {
  const [teachingDone, setTeachingDone] = useState(interactiveDone);
  if (!teachingDone) {
    return (
      <TeachPlayer
        courseId={player.courseId}
        lessonId={player.lesson.id}
        teacher={player.teacher}
        hook={teach.hook}
        segments={teach.segments}
        activity={teach.activity}
        explain={teach.explain}
        initial={teach.initial}
        onFinished={() => setTeachingDone(true)}
      />
    );
  }
  return <LessonPlayer {...player} startAt="check" />;
}
