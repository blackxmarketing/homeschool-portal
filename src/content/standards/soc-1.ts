import type { Standard } from "./types";

/**
 * Standards for soc-1 (Grade 1 social studies): C3 Framework indicators for
 * grades K-2 (a guide, not required) plus the usual grade 1 topics (SS.1.n).
 */
export const soc1Standards: Standard[] = [
  // Grade 1 topics (taught by the lessons)
  { code: "SS.1.1", text: "Compare how families and communities lived long ago with how they live today.", required: true },
  { code: "SS.1.2", text: "Put events in order using words like long ago, past, now and later.", required: true },
  { code: "SS.1.3", text: "Name community helpers and tell how their jobs help people.", required: true },
  { code: "SS.1.4", text: "Tell the difference between goods (things we can touch) and services (work people do for us).", required: true },
  { code: "SS.1.5", text: "Read a simple map using its map key and symbols.", required: true },
  { code: "SS.1.6", text: "Use the four cardinal directions (north, south, east, west) and a compass rose.", required: true },
  { code: "SS.1.7", text: "Show how a good citizen acts: following rules, telling the truth, taking turns and helping.", required: true },
  { code: "SS.1.8", text: "Tell why we have rules and laws, and name leaders who help make and keep them.", required: true },
  { code: "SS.1.9", text: "Know American symbols: the flag, the bald eagle, the Liberty Bell and the Pledge of Allegiance.", required: true },
  { code: "SS.1.10", text: "Know famous American landmarks such as the Statue of Liberty, Mount Rushmore and the White House.", required: true },
  { code: "SS.1.11", text: "Tell what we remember on national holidays such as Independence Day, Thanksgiving and Veterans Day.", required: true },

  // C3 Framework, grades K-2
  { code: "D2.Civ.1.K-2", text: "Describe what people in charge, like a principal or a mayor, are supposed to do.", required: false },
  { code: "D2.Civ.2.K-2", text: "Explain how everyone, not just leaders, plays an important part in a community.", required: false },
  { code: "D2.Civ.3.K-2", text: "Explain why we need rules at home, at school and in other places.", required: false },
  { code: "D2.Civ.6.K-2", text: "Describe how people in a community work together to get jobs done.", required: false },
  { code: "D2.Civ.7.K-2", text: "Practice good citizen habits like honesty, kindness and fairness at school and at home.", required: false },
  { code: "D2.Civ.8.K-2", text: "Describe fairness and respect for rules and for the people who are rightly in charge.", required: false },
  { code: "D2.Civ.12.K-2", text: "Explain how rules work in shared places like a classroom, a park or a library.", required: false },
  { code: "D2.Eco.3.K-2", text: "Describe the skills and know-how people need to make goods and give services.", required: false },
  { code: "D2.Eco.4.K-2", text: "Describe goods and services that people in the local community make and give.", required: false },
  { code: "D2.Eco.6.K-2", text: "Explain how people earn money by working.", required: false },
  { code: "D2.Geo.1.K-2", text: "Draw maps and simple pictures of familiar places.", required: false },
  { code: "D2.Geo.2.K-2", text: "Use maps, pictures and photos to describe places.", required: false },
  { code: "D2.Geo.3.K-2", text: "Use maps and globes to find what places are like.", required: false },
  { code: "D2.His.1.K-2", text: "Put several events in the order they happened.", required: false },
  { code: "D2.His.2.K-2", text: "Compare life in the past to life today.", required: false },
  { code: "D2.His.3.K-2", text: "Ask questions about people who made a big difference in history.", required: false },
];
