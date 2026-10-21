"use client";

import type { ComponentProps } from "react";
import { chime, speak } from "@/components/voice";
import MiaHud from "./MiaHud";

/** The timer strip inside the portal: talks with the teacher's voice (natural voice when it's on). */
export default function PortalMiaHud(props: Omit<ComponentProps<typeof MiaHud>, "say" | "api">) {
  return (
    <MiaHud
      {...props}
      say={(text) => {
        chime("pop");
        speak(`mia-${Date.now()}`, text, { kind: "female" });
      }}
    />
  );
}
