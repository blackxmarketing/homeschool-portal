import type { CourseMedia } from "./types";

/** Slides and videos for the history-45 lessons, keyed by lesson id. */
export const history45Media: CourseMedia = {
  "history-45.egypt": {
    hook: {
      show: [
        { photo: "Great Pyramid of Giza", caption: "The Great Pyramid of Giza still stands after about 4,500 years." },
        { at: "no trucks, no cranes", emoji: "🚫🚚🏗️", caption: "No trucks, no cranes, no iron tools. Just people, ropes and sledges." },
        { at: "weighed more than a car", emoji: "🪨🚗", caption: "Many blocks weighed more than a car!" },
        { at: "Who built it", emoji: "🤔", caption: "Who built it, and why?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏜️☀️", caption: "Most of Egypt is hot, dry desert." },
          { at: "the longest river in Africa", photo: "File:Nile River and delta from orbit.jpg", caption: "From space, the Nile looks like a green ribbon through the desert." },
          { at: "flood its banks", emoji: "🌧️🌊", caption: "Rains far to the south made the Nile flood every summer." },
          { at: "called their land Kemet", big: "Kemet", caption: "Kemet means \"the black land,\" named for the rich black mud." },
          { at: "also a highway", emoji: "⛵🌾", caption: "Boats carried grain, stone and people up and down the river." },
        ],
      },
      {
        show: [
          { emoji: "👑", caption: "Egypt's kings were called pharaohs." },
          { at: "pyramids at Giza", photo: "Giza pyramid complex", caption: "The pyramids at Giza, tombs built for pharaohs." },
          { at: "about 4,500 years ago", big: "4,500 years ago", caption: "The Great Pyramid was built for the pharaoh Khufu." },
          { at: "two million stone blocks", big: "2,000,000+", caption: "More than two million stone blocks!" },
          { at: "3,800 years", emoji: "🏆", caption: "The tallest building on Earth for about 3,800 years." },
        ],
      },
      {
        show: [
          { photo: "Cartouche", caption: "Hieroglyphs from a pharaoh's tomb. The ovals hold the king's names." },
          { at: "Scribes trained for years", emoji: "✍️📜", caption: "Scribes spent years learning hundreds of signs." },
          { at: "made from river reeds", emoji: "🌿📜", caption: "Papyrus was paper made from reeds that grew by the Nile." },
          { at: "dug up the Rosetta Stone", photo: "Rosetta Stone", caption: "The Rosetta Stone: one message in Egyptian writing and Greek." },
          { at: "cracked the code", big: "1822", caption: "Champollion cracked the code of the hieroglyphs." },
        ],
      },
    ],
  },

  "history-45.greece": {
    hook: {
      show: [
        { emoji: "🏃💨", caption: "A runner races for the finish line at Olympia." },
        { at: "776 BC", big: "776 BC", caption: "The first Olympic Games we have records of." },
        { at: "crown of olive leaves", emoji: "🌿👑", caption: "The prize: a simple crown of olive leaves." },
        { at: "matter so much", emoji: "🤔", caption: "Why would leaves matter so much?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🏛️🏛️🏛️", caption: "Greece was made of many small city-states." },
          { at: "traveled to Olympia", photo: "Olympia, Greece", caption: "The ruins of Olympia, where the Games were held." },
          { at: "two football fields", emoji: "🏃🏈🏈", caption: "The first race was about as long as two football fields." },
          { at: "A sacred truce", emoji: "🕊️", caption: "A sacred truce let travelers come to the Games safely." },
          { at: "crown of olive leaves", emoji: "🌿👑", caption: "Winners were crowned with olive leaves." },
        ],
      },
      {
        show: [
          { emoji: "📖✨", caption: "Myths are stories about gods and heroes." },
          { at: "lived on Mount Olympus", photo: "Mount Olympus", caption: "Mount Olympus, the highest mountain in Greece." },
          { at: "hurled thunderbolts", emoji: "⚡", caption: "Zeus, king of the gods, hurled thunderbolts." },
          { at: "goddess of wisdom", emoji: "🦉", caption: "Athena, goddess of wisdom. Her symbol was the owl." },
          { at: "told of Odysseus", emoji: "⛵🌊", caption: "Odysseus spent ten years sailing home." },
        ],
      },
      {
        show: [
          { emoji: "👑", caption: "Most ancient lands were ruled by kings." },
          { at: "Around 508 BC", big: "508 BC", caption: "Athens tried something new." },
          { at: "called the Pnyx", photo: "Pnyx", caption: "The Pnyx, the rocky hill where citizens met to vote." },
          { at: "raising their hands", emoji: "✋✋✋", caption: "Citizens voted by raising their hands." },
          { at: "rule by the people", big: "Demos + Kratos", caption: "People + Rule = Democracy" },
        ],
      },
    ],
  },

  "history-45.explorers": {
    hook: {
      show: [
        { big: "1522", caption: "A battered ship sails into a harbor in Spain." },
        { at: "five ships and about 270 men", big: "5 ships, 270 men", caption: "That is how many set out three years earlier." },
        { at: "one ship and 18", big: "1 ship, 18 men", caption: "That is how many came home." },
        { at: "no one had ever done", emoji: "🌍❓", caption: "What had they done?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "🌊🌊🌊", caption: "In the middle of the ocean, all you can see is water." },
          { at: "A compass", emoji: "🧭", caption: "A compass needle points north, even on cloudy nights." },
          { at: "the North Star", emoji: "⭐", caption: "The North Star's height told sailors how far north they were." },
          { at: "Maps showed", emoji: "🗺️", caption: "Maps showed coastlines and safe harbors." },
          { at: "called caravels", photo: "Caravel", caption: "A copy of the Pinta, a caravel from Columbus's voyage." },
        ],
      },
      {
        show: [
          { big: "1492", caption: "Columbus sailed the ocean in 1492." },
          { at: "Christopher Columbus", photo: "Christopher Columbus", caption: "A portrait said to show Columbus, painted in 1519." },
          { at: "three ships", emoji: "⛵⛵⛵", caption: "The Niña, the Pinta and the Santa María." },
          { at: "the Earth was round", emoji: "🌍", caption: "He knew the Earth was round, but guessed it was much smaller." },
          { at: "Taino people", emoji: "🏝️", caption: "The Taíno people already lived on the islands." },
        ],
      },
      {
        show: [
          { photo: "Ferdinand Magellan", caption: "Ferdinand Magellan, as painted many years after his voyage." },
          { at: "Strait of Magellan", emoji: "⛈️🌊", caption: "A narrow, stormy passage at the tip of South America." },
          { at: "named it the Pacific", big: "Pacific = Peaceful", caption: "The calm ocean got a peaceful name." },
          { at: "the Victoria", emoji: "⛵", caption: "Only the Victoria made it all the way home." },
          { at: "sailed around the world", emoji: "🌍🔄", caption: "The first trip all the way around the world!" },
        ],
      },
    ],
  },

  "history-45.colonies": {
    hook: {
      show: [
        { big: "1607", caption: "English settlers arrive in Virginia." },
        { at: "three small ships", emoji: "⛵⛵⛵", caption: "Three small ships crossed the Atlantic to Virginia." },
        { at: "finding gold", emoji: "💰❓", caption: "They dreamed of gold." },
        { at: "how did the colony survive", emoji: "🤔", caption: "How did the colony survive?" },
      ],
    },
    teach: [
      {
        show: [
          { photo: "Jamestown Settlement", caption: "A rebuilt Jamestown fort at a history museum in Virginia today." },
          { at: "after King James", emoji: "👑", caption: "Jamestown was named after King James of England." },
          { at: "Captain John Smith", emoji: "🪓🌽", caption: "Captain John Smith: \"If you do not work, you do not eat.\"" },
          { at: "the Starving Time", emoji: "❄️🍽️", caption: "The terrible winter of 1609 to 1610." },
          { at: "grew tobacco", emoji: "🌿💰", caption: "Tobacco sold well in England and saved the colony." },
        ],
      },
      {
        show: [
          { big: "1620", caption: "The Pilgrims cross the ocean." },
          { at: "called the Mayflower", photo: "Mayflower II", caption: "Mayflower II, a copy of the Pilgrims' ship." },
          { at: "Mayflower Compact", emoji: "📜✍️", caption: "A promise to make fair laws together and obey them." },
          { at: "plant corn", emoji: "🌽🐟", caption: "Squanto showed them how to plant corn, with fish to feed the soil." },
          { at: "harvest feast", emoji: "🍂🍗", caption: "A three-day harvest feast in the fall of 1621." },
        ],
      },
      {
        show: [
          { big: "13", caption: "Thirteen colonies, from New Hampshire to Georgia." },
          { at: "candles, soap and clothes", emoji: "🕯️🧼🧵", caption: "Families made candles, soap and clothes at home." },
          { at: "churning butter", emoji: "🧈", caption: "Children helped by churning butter and hauling water." },
          { at: "a hornbook", photo: "Hornbook", caption: "An old painting from 1661 of a child holding a hornbook." },
          { at: "as an apprentice", emoji: "🔨", caption: "Apprentices learned a trade by working for a master." },
        ],
      },
    ],
  },

  "history-45.revolution": {
    hook: {
      show: [
        { photo: "File:Washington Crossing the Delaware by Emanuel Leutze, MMA-NYC, 1851.jpg", caption: "A famous painting of Washington crossing the Delaware, made in 1851." },
        { at: "icy Delaware River", emoji: "🌨️🧊", caption: "Sleet and ice on a dark winter night." },
        { at: "surprise the enemy at Trenton", emoji: "🌅", caption: "By morning, they would surprise the enemy." },
        { at: "independence", big: "Independence", caption: "Why risk so much for this idea?" },
      ],
    },
    teach: [
      {
        show: [
          { emoji: "💷", caption: "Britain needed money after a long, costly war." },
          { at: "paper and tea", emoji: "📄🍵", caption: "Parliament taxed things like paper and tea." },
          { at: "No taxation without representation", big: "No taxation without representation!", caption: "The colonists wanted a say in their own taxes." },
          { at: "342 chests of tea", photo: "Boston Tea Party", caption: "The Boston Tea Party, 1773, as an artist imagined it later." },
          { at: "Lexington and Concord", emoji: "🔔🏇", caption: "In April 1775, the war began." },
        ],
      },
      {
        show: [
          { photo: "George Washington", caption: "George Washington, commander of the Continental Army." },
          { at: "Christmas night", emoji: "🛶🌨️", caption: "A surprise crossing on Christmas night, 1776." },
          { at: "Benjamin Franklin", photo: "Benjamin Franklin", caption: "Benjamin Franklin: printer, writer, inventor." },
          { at: "flew a kite", emoji: "🪁⚡", caption: "Franklin's kite showed that lightning is electricity." },
          { at: "went to France", emoji: "⛵🤝", caption: "Franklin won France as America's friend." },
        ],
      },
      {
        show: [
          { big: "July 4, 1776", caption: "The Declaration of Independence is approved." },
          { at: "Thomas Jefferson", photo: "Declaration of Independence (painting)", caption: "A painting of the Declaration being presented to Congress." },
          { at: "life, liberty and the pursuit of happiness", big: "Life · Liberty · Happiness", caption: "Rights the Declaration says belong to all people." },
          { at: "Yorktown", emoji: "🏳️", caption: "In 1781, the British army surrendered at Yorktown." },
          { at: "In 1783", big: "1783", caption: "Britain agreed that America was free." },
        ],
      },
    ],
  },
};
