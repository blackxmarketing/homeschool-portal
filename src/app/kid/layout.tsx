import { VoiceProvider } from "@/components/voice";
import { features } from "@/lib/content";
import { ttsEnabled } from "@/lib/tts";

/** Kid pages get the bright kid theme (see .kidworld in kid-theme.css) and the teacher's voice. */
export default function KidLayout({ children }: { children: React.ReactNode }) {
  const f = features();
  return (
    <div className="kidworld">
      <VoiceProvider speakOn={f.readAloud} micOn={f.kidMic} natural={ttsEnabled()} faces={f.teacherFaces}>
        {children}
      </VoiceProvider>
    </div>
  );
}
