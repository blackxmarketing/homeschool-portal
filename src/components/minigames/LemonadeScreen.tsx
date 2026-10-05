"use client";

import LemonadeGame from "./LemonadeGame";
import { levelById } from "@/lib/minigames/lemonade";
import type { MiniGameUIProps } from "./types";

export default function LemonadeScreen({ levelId, onFinish }: MiniGameUIProps) {
  const level = levelById(levelId);
  return level ? <LemonadeGame level={level} onFinish={onFinish} /> : null;
}
