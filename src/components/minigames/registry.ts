import type { ComponentType } from "react";
import type { MiniGameUIProps } from "./types";
import LemonadeScreen from "./LemonadeScreen";
import PizzaGame from "./PizzaGame";
import RocketGame from "./RocketGame";
import VoyageGame from "./VoyageGame";
import BugHuntGame from "./BugHuntGame";
import ExpeditionGame from "./ExpeditionGame";

/** Each game's screen, by game id. */
export const GAME_UI: Record<string, ComponentType<MiniGameUIProps>> = {
  lemonade: LemonadeScreen,
  pizza: PizzaGame,
  rocket: RocketGame,
  voyage: VoyageGame,
  bughunt: BugHuntGame,
  expedition: ExpeditionGame,
};
