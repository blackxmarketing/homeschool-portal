import type { Metadata } from "next";
import { Fraunces, Lexend } from "next/font/google";
import "./globals.css";
import "./game.css";
import "./teach.css";
import "./kid-theme.css";

// Lexend was designed to reduce visual stress and improve reading speed.
const kidFont = Lexend({ subsets: ["latin"], variable: "--font-kid", display: "swap" });
// A soft, friendly serif for headings.
const displayFont = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["600", "700"] });

export const metadata: Metadata = {
  title: "Learning Portal",
  description: "Mastery-based learning at each kid's own pace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${kidFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
