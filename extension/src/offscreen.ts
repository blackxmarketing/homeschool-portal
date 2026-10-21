/**
 * A hidden page that only plays sound: the teacher's voice clips and a little
 * chime before each line. Chrome lets it play without a click first.
 */
let ctx: AudioContext | null = null;
let current: HTMLAudioElement | null = null;

function chime() {
  ctx ??= new AudioContext();
  [660, 880].forEach((hz, i) => {
    const o = ctx!.createOscillator();
    const g = ctx!.createGain();
    o.type = "sine";
    o.frequency.value = hz;
    const t = ctx!.currentTime + i * 0.18;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    o.connect(g).connect(ctx!.destination);
    o.start(t);
    o.stop(t + 0.45);
  });
}

chrome.runtime.onMessage.addListener((msg: { target?: string; type?: string; src?: string }, _sender, sendResponse) => {
  if (msg.target !== "offscreen") return false;
  if (msg.type === "chime") {
    chime();
    sendResponse({ ok: true });
    return false;
  }
  if (msg.type === "play" && msg.src) {
    current?.pause();
    current = new Audio(msg.src);
    // Let the chime finish first.
    setTimeout(() => {
      current!.play().then(
        () => sendResponse({ ok: true }),
        () => sendResponse({ ok: false }),
      );
    }, 450);
    return true;
  }
  return false;
});
