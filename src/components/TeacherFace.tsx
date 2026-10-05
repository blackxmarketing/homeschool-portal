"use client";

import { useEffect, useRef, useState } from "react";
import TeacherAvatar from "./TeacherAvatar";
import type { AvatarLook } from "@/content/avatars";

/**
 * The teacher's face. Teachers with a photo-real portrait (public/teachers/)
 * show short looping clips: a quiet "listening" loop, and a talking loop while
 * the teacher reads aloud. Small faces and reduced-motion use the still photo.
 * Teachers without a portrait use the drawn character.
 */
export default function TeacherFace({ look, talking = false, size = 150, still = false }: { look: AvatarLook; talking?: boolean; size?: number; still?: boolean }) {
  const [reduced, setReduced] = useState(false);
  // If the photo can't load, fall back to the drawn teacher.
  const [broken, setBroken] = useState(false);
  const talk = useRef<HTMLVideoElement>(null);
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  // Start the talking clip from the top each time the teacher starts speaking.
  useEffect(() => {
    const v = talk.current;
    if (!v) return;
    if (talking) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else v.pause();
  }, [talking]);

  if (!look.photo || broken) return <TeacherAvatar look={look} talking={talking} size={size} />;
  const base = `/teachers/${look.photo}`;
  const moving = look.clips && !still && !reduced;
  return (
    <div className={`teacher-face ${talking ? "talking" : ""}`} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}.jpg`} alt="Your teacher" width={size} height={size} onError={() => setBroken(true)} />
      {moving && (
        <>
          <video className="tf-idle" src={`${base}-idle.mp4`} poster={`${base}.jpg`} autoPlay muted loop playsInline preload="auto" aria-hidden />
          <video ref={talk} className="tf-talk" src={`${base}-talk.mp4`} muted loop playsInline preload="auto" aria-hidden />
        </>
      )}
    </div>
  );
}
