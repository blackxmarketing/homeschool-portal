"use client";

import { useState } from "react";
import LessonPlayer from "./LessonPlayer";
import TeachPlayer, { type AdaptView, type PublicSegment, type TeachInitial } from "./TeachPlayer";
import TutorSession from "./TutorSession";
import { MasteryCheck } from "./Assess";
import type { PublicWidget } from "@/lib/teaching";
import type { PublicProbe } from "@/lib/probes";
import type { PublicShow } from "@/lib/storyboard";

type PlayerProps = React.ComponentProps<typeof LessonPlayer>;

/**
 * The full teaching model: interactive teaching first (hook, segments with
 * coaching, activity, explain it back), then "show what you know" and the task.
 */
export default function LessonFlow({
  player,
  teach,
  interactiveDone,
  tutorMode = false,
  kidName,
}: {
  player: PlayerProps;
  teach: {
    hook?: { text: string; visual?: PublicWidget; show?: PublicShow };
    segments: PublicSegment[];
    activity?: PublicWidget;
    explain?: { prompt: string };
    initial: TeachInitial;
    adaptation?: AdaptView;
    review?: { lessonId: string; seg: number; title: string; probe: PublicProbe }[];
    mastery?: PublicProbe[];
  };
  interactiveDone: boolean;
  tutorMode?: boolean;
  kidName?: string;
}) {
  const [teachingDone, setTeachingDone] = useState(interactiveDone);
  const [checkPassed, setCheckPassed] = useState(player.initial.checkPassed);
  if (!teachingDone) {
    const Player = tutorMode ? TutorSession : TeachPlayer;
    return (
      <Player
        kidName={kidName}
        courseId={player.courseId}
        lessonId={player.lesson.id}
        teacher={player.teacher}
        hook={teach.hook}
        segments={teach.segments}
        activity={teach.activity}
        explain={teach.explain}
        initial={teach.initial}
        adaptation={teach.adaptation}
        review={teach.review}
        mastery={teach.mastery}
        onFinished={(how) => {
          setTeachingDone(true);
          if (how === "tested-out") setCheckPassed(true);
        }}
      />
    );
  }
  // Interactive "show what you know" replaces the multiple-choice check.
  if (teach.mastery?.length && !checkPassed) {
    return (
      <MasteryCheck
        courseId={player.courseId}
        lessonId={player.lesson.id}
        probes={teach.mastery}
        onPassed={() => setCheckPassed(true)}
      />
    );
  }
  return <LessonPlayer key={String(checkPassed)} {...player} initial={{ ...player.initial, checkPassed }} startAt="check" />;
}
