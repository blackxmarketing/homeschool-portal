import type { Standard } from "./types";

/**
 * Standards for soc-k (Kindergarten social studies): C3 Framework indicators
 * for grades K-2 (a guide) plus the usual kindergarten topics (all taught).
 */
export const socKStandards: Standard[] = [
  // C3 Framework, grades K-2 (a guide for the band)
  { code: "D2.Civ.2.K-2", text: "Explain how everyone, not just leaders, plays an important part in a community.", required: false },
  { code: "D2.Civ.3.K-2", text: "Explain why we need rules at home, at school and in other places.", required: false },
  { code: "D2.Civ.7.K-2", text: "Show good citizen habits, like kindness, honesty and fairness, at school and at home.", required: false },
  { code: "D2.Civ.8.K-2", text: "Describe fairness, respect and following the rules made by the right people in charge.", required: false },
  { code: "D2.Civ.9.K-2", text: "Follow the rules for a group talk: listen well and take turns speaking.", required: false },
  { code: "D2.Eco.1.K-2", text: "Explain that we cannot have everything, so we must make choices.", required: false },
  { code: "D2.Eco.2.K-2", text: "Tell what we gain and what we give up when we make a choice.", required: false },
  { code: "D2.Eco.3.K-2", text: "Describe the skills and tools workers need to make things and help people.", required: false },
  { code: "D2.Eco.6.K-2", text: "Explain how people earn money by working.", required: false },
  { code: "D2.Eco.7.K-2", text: "Explain that people save money to use later.", required: false },
  { code: "D2.Geo.1.K-2", text: "Make maps and simple drawings of familiar places, like a bedroom or a classroom.", required: false },
  { code: "D2.Geo.2.K-2", text: "Use maps and pictures to describe places and where things are.", required: false },
  { code: "D2.Geo.3.K-2", text: "Use maps, globes and simple models to tell about land, water and places.", required: false },
  { code: "D2.His.1.K-2", text: "Put several events in order, from first to last.", required: false },
  { code: "D2.His.2.K-2", text: "Compare life in the past with life today.", required: false },
  { code: "D2.His.3.K-2", text: "Ask questions about people who made a difference in history, like George Washington.", required: false },

  // Kindergarten topics
  { code: "SS.K.1", text: "Tell about myself and my family, and how family members help each other.", required: true },
  { code: "SS.K.2", text: "Explain why we have rules at home and at school, who makes them, and how to be a good citizen.", required: true },
  { code: "SS.K.3", text: "Tell needs (food, water, clothes, a home) from wants, and explain why families choose and save.", required: true },
  { code: "SS.K.4", text: "Name community helpers and workers, the tools they use, and why people work.", required: true },
  { code: "SS.K.5", text: "Read and draw a simple map of a room or home, with symbols and words like near, far, above and below.", required: true },
  { code: "SS.K.6", text: "Name American symbols: the flag, the Pledge of Allegiance, the bald eagle, the Statue of Liberty and the Liberty Bell.", required: true },
  { code: "SS.K.7", text: "Tell why we celebrate national holidays: the Fourth of July, Thanksgiving, Presidents' Day, Memorial Day and Veterans Day.", required: true },
  { code: "SS.K.8", text: "Put events in order and tell about past, present and future, like how I have grown since I was a baby.", required: true },
];
