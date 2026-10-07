/**
 * The cast and settings that lesson and game variations draw from.
 *
 * When a kid retries something, the numbers change and so do the people,
 * places and props in the story. These are the pools those come from. Edit
 * them on the Content page: anything here can appear in a question your kids
 * read, so keep names ordinary and settings concrete.
 *
 * Classical and modern names only, and everyday places and objects. No
 * present-day politics and nothing from films, games or television, same as
 * the rest of the content.
 */

export interface CastPool {
  /** First names for the people in a problem. */
  people: string[];
  /** Animals, for the younger grades' stories. */
  creatures: string[];
  /** Where a story happens. */
  places: string[];
  /** Countable props: "14 lanterns", "6 baskets". */
  things: string[];
}

/** The kinds of lesson that want their own flavour of cast. */
export const VARIANT_THEMES = ["math", "money", "science", "history", "language", "leadership"] as const;
export type VariantTheme = (typeof VARIANT_THEMES)[number];

export interface VariantContent {
  /** Used by every lesson, and the whole pool for plain math. */
  base: CastPool;
  /** Extra cast for a kind of lesson, added on top of the base pool. */
  byTheme: Record<VariantTheme, Partial<CastPool>>;
}

export const VARIANT_CONTENT: VariantContent = {
  base: {
    people: [
      "Maya", "Leo", "Ava", "Eli", "Zoe", "Sam", "Nora", "Kai", "Ruby", "Finn",
      "Clara", "Milo", "Iris", "Theo", "Hazel", "Owen", "June", "Felix", "Cora", "Jonas",
      "Lydia", "Caleb", "Elena", "Isaac", "Marta", "Silas", "Rosa", "Abel", "Greta", "Emmett",
    ],
    creatures: [
      "ducklings", "foxes", "rabbits", "otters", "hedgehogs", "sparrows",
      "turtles", "goats", "beavers", "owls", "frogs", "bees", "lambs", "cranes",
    ],
    places: [
      "the market", "the orchard", "the mill", "the harbor", "the workshop",
      "the library", "the observatory", "the bakery", "the greenhouse",
      "the stone bridge", "the lighthouse", "the courtyard",
    ],
    things: [
      "apples", "bricks", "lanterns", "seeds", "coins", "books", "baskets",
      "ropes", "planks", "jars", "candles", "stamps", "marbles", "tiles",
    ],
  },
  byTheme: {
    math: {},
    money: {
      places: ["the lemonade stand", "the bike repair bench", "the print shop", "the flower cart", "the tutoring desk", "the farm stand"],
      things: ["cups", "loaves", "repairs", "bouquets", "prints", "deliveries", "hours"],
    },
    science: {
      places: ["the lab bench", "the tide pool", "the weather station", "the garden bed", "the ridge", "the creek"],
      things: ["samples", "seedlings", "magnets", "beakers", "readings", "crystals", "specimens"],
    },
    history: {
      places: ["the trade road", "the river port", "the archive", "the fairground", "the guild hall", "the watchtower"],
      things: ["maps", "letters", "ledgers", "charters", "crates", "banners"],
    },
    language: {
      places: ["the reading room", "the print shop", "the writing desk", "the storyteller's bench"],
      things: ["sentences", "verses", "titles", "paragraphs", "notes", "letters"],
    },
    leadership: {
      places: ["the build site", "the team shed", "the volunteer table", "the rowing crew", "the trail camp"],
      things: ["tasks", "shifts", "supplies", "plans", "tools", "signups"],
    },
  },
};

/** The full pool a lesson of this kind draws from: the base cast plus its own extras. */
export function castFor(content: VariantContent, theme: VariantTheme): CastPool {
  const extra = content.byTheme[theme] ?? {};
  return {
    people: [...content.base.people, ...(extra.people ?? [])],
    creatures: [...content.base.creatures, ...(extra.creatures ?? [])],
    places: [...content.base.places, ...(extra.places ?? [])],
    things: [...content.base.things, ...(extra.things ?? [])],
  };
}
