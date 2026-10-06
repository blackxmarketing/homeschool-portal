import type { Standard } from "./types";

/**
 * Standards for soc-2 (Grade 2 social studies): C3 Framework indicators for
 * grades K-2 (a guide), plus the usual grade 2 topics coded "SS.2.<n>",
 * which every course must teach.
 */
export const soc2Standards: Standard[] = [
  // Grade 2 topics (must be taught)
  { code: "SS.2.1", text: "Describe rural, suburban and urban communities and compare how people live, work and travel in each.", required: true },
  { code: "SS.2.2", text: "Explain that producers make goods or give services, and consumers buy and use them.", required: true },
  { code: "SS.2.3", text: "Tell goods from services, and explain that people work at jobs to earn money.", required: true },
  { code: "SS.2.4", text: "Explain saving and spending, and make a plan to save money for something you want.", required: true },
  { code: "SS.2.5", text: "Explain that we can't have everything we want, so we make choices (scarcity and choices).", required: true },
  { code: "SS.2.6", text: "Use a map key, a compass rose and the four cardinal directions to read a map.", required: true },
  { code: "SS.2.7", text: "Find the seven continents and five oceans on a map or globe, and find where we live.", required: true },
  { code: "SS.2.8", text: "Explain what a good citizen does: follow rules and laws, help others and take responsibility.", required: true },
  { code: "SS.2.9", text: "Explain how voting works, that the choice with the most votes wins, and that grown-up citizens vote for leaders.", required: true },
  { code: "SS.2.10", text: "Tell how Benjamin Franklin, the Wright brothers and Thomas Edison made a difference with their inventions.", required: true },
  { code: "SS.2.11", text: "Compare life long ago with life today and explain how inventions changed daily life.", required: true },

  // C3 Framework, grades K-2 (a guide)
  { code: "D2.Civ.1.K-2", text: "Describe the roles and responsibilities of people in authority.", required: false },
  { code: "D2.Civ.2.K-2", text: "Explain how all people, not just leaders, play important roles in a community.", required: false },
  { code: "D2.Civ.3.K-2", text: "Explain why we need rules in different places, inside and outside of school.", required: false },
  { code: "D2.Civ.5.K-2", text: "Explain what governments are and give some examples of what they do.", required: false },
  { code: "D2.Civ.6.K-2", text: "Describe how communities work together to get common jobs done.", required: false },
  { code: "D2.Civ.7.K-2", text: "Show good citizen habits like honesty, kindness and responsibility at school and home.", required: false },
  { code: "D2.Civ.8.K-2", text: "Describe fair ways of living together, like equal turns, fairness and respect for rules.", required: false },
  { code: "D2.Civ.11.K-2", text: "Explain how people can work together to make decisions, like voting in a group.", required: false },
  { code: "D2.Eco.1.K-2", text: "Explain how not having enough of everything means we have to make choices.", required: false },
  { code: "D2.Eco.2.K-2", text: "Name the good and bad sides (benefits and costs) of personal choices.", required: false },
  { code: "D2.Eco.3.K-2", text: "Describe the skills and knowledge people need to make goods and give services.", required: false },
  { code: "D2.Eco.4.K-2", text: "Describe goods and services made in our community and ones made in other places.", required: false },
  { code: "D2.Eco.5.K-2", text: "Find the prices of things sold in a local store or market.", required: false },
  { code: "D2.Eco.6.K-2", text: "Explain how people earn income by working.", required: false },
  { code: "D2.Geo.1.K-2", text: "Make maps and other pictures of familiar places.", required: false },
  { code: "D2.Geo.2.K-2", text: "Use maps, photos and other pictures to describe places and how people use them.", required: false },
  { code: "D2.Geo.3.K-2", text: "Use maps, globes and simple models to find places and describe what they are like.", required: false },
  { code: "D2.Geo.4.K-2", text: "Explain how weather, climate and land affect how people live in a place.", required: false },
  { code: "D2.Geo.6.K-2", text: "Name some things that make a place special, like its land, water and buildings.", required: false },
  { code: "D2.His.1.K-2", text: "Put events in order on a timeline.", required: false },
  { code: "D2.His.2.K-2", text: "Compare life in the past to life today.", required: false },
  { code: "D2.His.3.K-2", text: "Ask questions about people who made important changes in history.", required: false },
];
