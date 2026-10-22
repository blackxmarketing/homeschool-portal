"use client";

import { useEffect, useRef, useState } from "react";
import type { LessonItem } from "@/lib/miaLessons";
import type { MiaChecklist } from "@/lib/store";
import type { MiaApi } from "./MiaHud";

/**
 * The step-by-step checklist under an open timer: the next three activities
 * of the kid's Miacademy lesson, the top one big and bright, the other two dim.
 * Finishing one makes it pop away and the next one slides up.
 */

const ICON: Record<LessonItem["check"], string> = { video: "🎬", quiz: "✏️", photo: "📝", parent: "🧰" };

type Entry = MiaChecklist["upcoming"][number];

export default function Checklist({
  checklist,
  color,
  running,
  api,
  say,
  onChecklists,
  onSupplies,
}: {
  checklist: MiaChecklist;
  color: string;
  /** The subject's timer is running (activities can be checked off). */
  running: boolean;
  api: MiaApi;
  say: (text: string) => void;
  onChecklists: (c: Record<string, MiaChecklist | null>) => void;
  /** Pause the timer to gather supplies for this activity. */
  onSupplies: (lessonId: number, itemId: string) => void;
}) {
  const [photoFor, setPhotoFor] = useState<Entry | null>(null);
  const [leaving, setLeaving] = useState<string | null>(null);

  const waiting = checklist.upcoming.filter((e) => e.state.waitingForParent);
  const todo = checklist.upcoming.filter((e) => !e.state.waitingForParent);
  const top = todo[0];

  // Hands-on activities: pause the timer while supplies are gathered (once; a grown-up restarts it).
  const askedSupplies = useRef(new Set<string>());
  useEffect(() => {
    if (!running || !top || top.item.check !== "parent" || top.state.suppliesReady) return;
    const key = `${top.lessonId}:${top.item.id}`;
    if (askedSupplies.current.has(key)) return;
    askedSupplies.current.add(key);
    onSupplies(top.lessonId, top.item.id);
    say(`Time to gather your supplies for ${top.item.title}. Your timer is paused, and a grown-up will help.`);
  }, [running, top, onSupplies, say]);

  // Pop the finished activity away, then show the new list.
  async function finished(entry: Entry, next: Record<string, MiaChecklist | null>) {
    setLeaving(`${entry.lessonId}:${entry.item.id}`);
    say(nextLine(next[checklist.subject]));
    await new Promise((r) => setTimeout(r, 650));
    setLeaving(null);
    onChecklists(next);
  }

  async function done(entry: Entry) {
    const { ok, data } = await api({ lessonId: entry.lessonId, itemId: entry.item.id }, "/api/mia/item");
    const next = (data as { checklists?: Record<string, MiaChecklist | null> }).checklists;
    if (ok && next) await finished(entry, next);
  }

  const week = (
    <div className="mia-week">
      <div className="mia-week-row">
        <span>This week</span>
        <span>
          {Math.min(checklist.doneThisWeek, checklist.target)} of {checklist.target} lesson{checklist.target > 1 ? "s" : ""}
          {checklist.doneThisWeek >= checklist.target ? " ✓" : ""}
        </span>
      </div>
      <div className="mia-bar">
        <i style={{ width: `${Math.min(100, (checklist.doneThisWeek / checklist.target) * 100)}%` }} />
      </div>
    </div>
  );

  let body: React.ReactNode;
  if (checklist.needsPdf)
    body = <div className="mia-cl-note">📄 Open your Student PDF in Miacademy, and your checklist will show up here.</div>;
  else if (checklist.reading && !top) body = <div className="mia-cl-note">⏳ Getting your checklist ready…</div>;
  else if (checklist.failed && !top)
    body = <div className="mia-cl-note">😕 I couldn&apos;t load this lesson&apos;s checklist. Open your Student PDF in Miacademy again, or ask a grown-up.</div>;
  else if (!top && !waiting.length) body = <div className="mia-cl-note">🎉 You finished every activity! Pick your next lesson in Miacademy.</div>;
  else
    body = (
      <div className="mia-tasks">
        {todo.map((e, i) => {
          const key = `${e.lessonId}:${e.item.id}`;
          if (i > 0)
            return (
              <div key={key} className="mia-task dim">
                <span>{ICON[e.item.check]}</span> {e.item.title}
              </div>
            );
          return (
            <div key={key} className={`mia-task top ${leaving === key ? "poof" : ""}`} style={{ ["--c" as string]: color }}>
              <TopTask entry={e} running={running} onPhoto={() => setPhotoFor(e)} />
            </div>
          );
        })}
        {waiting.map((e) => (
          <div key={`w${e.lessonId}:${e.item.id}`} className="mia-task waiting">
            ⏳ {e.item.title}: waiting for a grown-up to approve
          </div>
        ))}
      </div>
    );

  return (
    <div className="mia-checklist" style={{ ["--c" as string]: color }}>
      <div className="mia-cl-head">
        <span>📝 {checklist.lessonTitle ?? "Your checklist"}</span>
        {checklist.left > 0 && <span className="mia-cl-left">{checklist.left} to go</span>}
      </div>
      {body}
      {week}
      {photoFor && (
        <PhotoCheck
          entry={photoFor}
          color={color}
          api={api}
          say={say}
          onClose={() => setPhotoFor(null)}
          onDone={async (next, fixed) => {
            setPhotoFor(null);
            if (fixed) await done(photoFor);
            else if (next) onChecklists(next);
          }}
        />
      )}
    </div>
  );
}

function nextLine(next: MiaChecklist | null | undefined): string {
  const top = next?.upcoming.find((e) => !e.state.waitingForParent);
  return top ? `Nice! Next up: ${top.item.title}.` : "Nice! You finished every activity in this lesson!";
}

function TopTask({ entry, running, onPhoto }: { entry: Entry; running: boolean; onPhoto: () => void }) {
  const { item, state } = entry;
  const pages = item.pages.length ? ` · page${item.pages.length > 1 ? "s" : ""} ${item.pages[0]}${item.pages.length > 1 ? `-${item.pages.at(-1)}` : ""}` : "";
  const kind =
    item.check === "video" ? "🎬 Online in Miacademy" : item.check === "quiz" ? "✏️ Online quiz" : item.check === "parent" ? `🧰 Hands-on${pages}` : `📄 PDF${pages}`;
  let action: React.ReactNode = null;
  if (item.check === "video") action = <div className="mia-hint">Watch it in Miacademy. It checks off by itself!</div>;
  else if (item.check === "quiz") action = <div className="mia-hint">Take the quiz in Miacademy. It checks off when you finish.</div>;
  else if (item.check === "parent" && !state.suppliesReady)
    action = (
      <div className="mia-hint">
        <b>Gather:</b> {item.supplies.length ? item.supplies.join(", ") : "your supplies"}
      </div>
    );
  else if (!running) action = <div className="mia-hint">Press Start to work on this.</div>;
  else
    action = (
      <button className="mia-btn small" onClick={onPhoto}>
        📸 {item.check === "parent" ? "I'm done! Take a photo" : "I'm done! Check my work"}
      </button>
    );
  return (
    <>
      <div className="mia-kind">{kind}</div>
      <div className="mia-task-title">{item.title}</div>
      {action}
    </>
  );
}

/** Take a photo of the work, then: worksheets are checked against the answer key; hands-on ones go to a grown-up. */
function PhotoCheck({
  entry,
  color,
  api,
  say,
  onClose,
  onDone,
}: {
  entry: Entry;
  color: string;
  api: MiaApi;
  say: (text: string) => void;
  onClose: () => void;
  onDone: (next: Record<string, MiaChecklist | null> | null, fixed: boolean) => void;
}) {
  type Result = { right: number; total: number; wrong: { question: string; answer: string }[]; message: string };
  const [step, setStep] = useState<"camera" | "checking" | "result" | "sent" | "unreadable">("camera");
  const [result, setResult] = useState<Result | null>(null);
  const [message, setMessage] = useState("");
  const [camError, setCamError] = useState(false);
  const [shot, setShot] = useState<string | null>(null);
  const [next, setNext] = useState<Record<string, MiaChecklist | null> | null>(null);
  const [tries, setTries] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (step !== "camera") return;
    let cancelled = false;
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 } } })
      .then((s) => {
        if (cancelled) return s.getTracks().forEach((t) => t.stop());
        stream.current = s;
        if (video.current) video.current.srcObject = s;
      })
      .catch(() => setCamError(true));
    if (!navigator.mediaDevices) setCamError(true);
    say(entry.item.check === "parent" ? "Show your work to the camera and take a photo for a grown-up." : "Hold your page up to the camera, nice and flat.");
    return () => {
      cancelled = true;
      stream.current?.getTracks().forEach((t) => t.stop());
      stream.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  async function send(dataUrl: string) {
    setShot(dataUrl);
    setStep("checking");
    stream.current?.getTracks().forEach((t) => t.stop());
    const [head, data] = dataUrl.split(",");
    const mediaType = /image\/(png|webp)/.exec(head)?.[0] ?? "image/jpeg";
    const { ok, data: res } = await api({ lessonId: entry.lessonId, itemId: entry.item.id, image: data, mediaType }, "/api/mia/photo");
    const r = res as Partial<Result> & { readable?: boolean; waitingForParent?: boolean; error?: string; checklists?: Record<string, MiaChecklist | null> };
    if (r.checklists) setNext(r.checklists);
    if (!ok) {
      setMessage(r.error ?? "That didn't work. Try again.");
      setStep("unreadable");
    } else if (r.waitingForParent) {
      setStep("sent");
      say("Sent to a grown-up! Great work.");
    } else if (r.readable === false) {
      setMessage(r.message ?? "I couldn't read that. Try again with the whole page showing.");
      setStep("unreadable");
      say(r.message ?? "I couldn't read that. Let's try again.");
    } else {
      setResult(r as Result);
      setTries((t) => t + 1);
      setStep("result");
      say(
        (r.message ? `${r.message} ` : "") +
          (r.wrong?.length
            ? `Grab your pen and fix ${r.wrong.map((w) => w.question).join(", ")}. Then take another photo so I can check.`
            : tries > 0
              ? "All fixed! Great job."
              : "Every answer is right!"),
      );
    }
  }

  function snap() {
    const v = video.current;
    if (!v || !v.videoWidth) return;
    const scale = Math.min(1, 1600 / Math.max(v.videoWidth, v.videoHeight));
    const c = document.createElement("canvas");
    c.width = Math.round(v.videoWidth * scale);
    c.height = Math.round(v.videoHeight * scale);
    c.getContext("2d")!.drawImage(v, 0, 0, c.width, c.height);
    void send(c.toDataURL("image/jpeg", 0.85));
  }

  function pickFile(f: File | undefined) {
    if (!f) return;
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      void send(c.toDataURL("image/jpeg", 0.85));
    };
    img.src = URL.createObjectURL(f);
  }

  let inner: React.ReactNode;
  if (step === "camera")
    inner = (
      <>
        <h2>📸 {entry.item.title}</h2>
        {!camError ? <video ref={video} className="mia-cam" autoPlay playsInline muted /> : <p className="mia-cl-note">The camera isn&apos;t working, so pick a photo instead.</p>}
        <div className="mia-row">
          {!camError && (
            <button className="mia-btn big" onClick={snap}>
              Take the photo
            </button>
          )}
          <label className="mia-btn ghost">
            Choose a photo
            <input type="file" accept="image/*" hidden onChange={(e) => pickFile(e.target.files?.[0])} />
          </label>
        </div>
        <button className="mia-link" onClick={onClose}>
          Not yet
        </button>
      </>
    );
  else if (step === "checking")
    inner = (
      <>
        {shot && <img className="mia-shot" src={shot} alt="Your photo" />}
        <h2>Checking your work…</h2>
        <div className="mia-spinner" />
      </>
    );
  else if (step === "sent")
    inner = (
      <>
        <h2>⏳ Sent to a grown-up!</h2>
        <p>They&apos;ll take a look and check it off. Keep going with the next activity.</p>
        <button className="mia-btn big" onClick={() => onDone(next, false)}>
          OK!
        </button>
      </>
    );
  else if (step === "unreadable")
    inner = (
      <>
        <h2>Let&apos;s try that again</h2>
        <p>{message}</p>
        <div className="mia-row">
          <button className="mia-btn" onClick={() => setStep("camera")}>
            Take another photo
          </button>
          <button className="mia-link" onClick={onClose}>
            Not yet
          </button>
        </div>
      </>
    );
  else if (result)
    inner = (
      <>
        {shot && <img className="mia-shot small" src={shot} alt="Your photo" />}
        <h2>{tries > 1 ? (result.wrong.length ? "Almost there!" : "All fixed!") : `You got ${result.right} of ${result.total} right!`}</h2>
        {result.wrong.length ? (
          <>
            <p>🖊️ Grab a pen or marker and fix {tries > 1 ? "these ones still" : "these"}:</p>
            <div className="mia-fixes">
              {result.wrong.map((w, i) => (
                <div key={i} className="mia-fix">
                  <b>{w.question}</b> → {w.answer}
                </div>
              ))}
            </div>
            <button className="mia-btn big" onClick={() => setStep("camera")}>
              📸 I fixed them. Check again!
            </button>
            {tries >= 3 && (
              <button className="mia-link" onClick={() => onDone(next, true)}>
                Still stuck? Finish, and a grown-up will look at it
              </button>
            )}
          </>
        ) : (
          <>
            <p>🎉 {tries > 1 ? "You fixed everything!" : "Every answer is right!"}</p>
            <button className="mia-btn big" onClick={() => onDone(next, true)}>
              Done ✓
            </button>
          </>
        )}
      </>
    );

  return (
    <div className="mia-scrim" style={{ ["--c" as string]: color }}>
      <div className="mia-chooser">{inner}</div>
    </div>
  );
}
