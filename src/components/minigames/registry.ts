import type { ComponentType } from "react";
import type { MiniGameUIProps } from "./types";
import LemonadeScreen from "./LemonadeScreen";
import PizzaGame from "./PizzaGame";
import RocketGame from "./RocketGame";
import VoyageGame from "./VoyageGame";
import BugHuntGame from "./BugHuntGame";
import ExpeditionGame from "./ExpeditionGame";

import CrittersGame from "./CrittersGame";
import NumberHopGame from "./NumberHopGame";
import CoinShopGame from "./CoinShopGame";
import ArrayGardenGame from "./ArrayGardenGame";
import TreasureGridGame from "./TreasureGridGame";
import WordBuilderGame from "./WordBuilderGame";
import SentenceSmithGame from "./SentenceSmithGame";
import HabitatGame from "./HabitatGame";
import WeatherGame from "./WeatherGame";
import SproutLabGame from "./SproutLabGame";
import CircuitGame from "./CircuitGame";
import MapQuestGame from "./MapQuestGame";
import PalabrasGame from "./PalabrasGame";

/** Each game's screen, by game id. */
export const GAME_UI: Record<string, ComponentType<MiniGameUIProps>> = {
  lemonade: LemonadeScreen,
  pizza: PizzaGame,
  rocket: RocketGame,
  voyage: VoyageGame,
  bughunt: BugHuntGame,
  expedition: ExpeditionGame,
  critters: CrittersGame,
  numberhop: NumberHopGame,
  coinshop: CoinShopGame,
  arraygarden: ArrayGardenGame,
  treasuregrid: TreasureGridGame,
  wordbuilder: WordBuilderGame,
  sentencesmith: SentenceSmithGame,
  habitat: HabitatGame,
  weather: WeatherGame,
  sproutlab: SproutLabGame,
  circuit: CircuitGame,
  mapquest: MapQuestGame,
  palabras: PalabrasGame,
};
