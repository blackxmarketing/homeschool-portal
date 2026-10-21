import type { Metadata } from "next";
import { Fraunces, Fredoka, Lexend, Press_Start_2P } from "next/font/google";
import "./globals.css";
import "./game.css";
import "./teach.css";
import "./kid-theme.css";
import "./game-theme.css";
import "./minigames.css";
import "./explore.css";
import "./present.css";
import "./miacademy.css";

// Lexend was designed to reduce visual stress and improve reading speed.
const kidFont = Lexend({ subsets: ["latin"], variable: "--font-kid", display: "swap" });
// A soft, friendly serif for headings.
// Chunky pixel letters for game titles (short text only; reading stays in Lexend).
const pixelFont = Press_Start_2P({ subsets: ["latin"], variable: "--font-pixel", display: "swap", weight: "400" });
// Round, bubbly letters for the Miacademy timer strip.
const funFont = Fredoka({ subsets: ["latin"], variable: "--font-fun", display: "swap", weight: ["500", "600", "700"] });
const displayFont = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Learning Portal",
  description: "Mastery-based learning at each kid's own pace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kidFont.variable} ${displayFont.variable} ${pixelFont.variable} ${funFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
