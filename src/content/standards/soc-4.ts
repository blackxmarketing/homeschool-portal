import type { Standard } from "./types";

/**
 * Standards for soc-4 (Grade 4 social studies): the usual grade 4 topics coded
 * "SS.4.<n>", which the course must teach, plus C3 Framework indicators for
 * grades 3-5 (a guide).
 */
export const soc4Standards: Standard[] = [
  // Grade 4 topics (must be taught)
  { code: "SS.4.1", text: "Name the five regions of the United States (Northeast, Southeast, Midwest, Southwest, West) and some states in each.", required: true },
  { code: "SS.4.2", text: "Describe major U.S. landforms and waters, such as the Appalachian and Rocky Mountains, the Great Plains, the Mississippi River and the Great Lakes.", required: true },
  { code: "SS.4.3", text: "Explain how the climate and natural resources of each region shape where people live and the work they do.", required: true },
  { code: "SS.4.4", text: "Describe several Native American nations from different regions before Europeans arrived, and how geography shaped their homes, food and trade.", required: true },
  { code: "SS.4.5", text: "Explain why Europeans explored, and describe the voyages of Columbus, Cabot and Hudson.", required: true },
  { code: "SS.4.6", text: "Describe the founding of Jamestown (1607) and Plymouth (1620), the hardships settlers faced, and the Mayflower Compact.", required: true },
  { code: "SS.4.7", text: "Use lines of latitude and longitude, the equator, the prime meridian and the hemispheres to find places on a map or globe.", required: true },
  { code: "SS.4.8", text: "Use a compass rose, a map key and a map scale to read a map and measure distances.", required: true },
  { code: "SS.4.9", text: "Explain that a state constitution sets up three branches of state government: the legislature, the governor and the courts.", required: true },
  { code: "SS.4.10", text: "Describe the steps by which a bill becomes a state law, including committees, votes, a signature or a veto.", required: true },
  { code: "SS.4.11", text: "Explain how citizens, including kids, take part in state government.", required: true },
  { code: "SS.4.12", text: "Describe a state's economy: its natural, human and capital resources and the industries they support.", required: true },
  { code: "SS.4.13", text: "Explain how states specialize and trade, including exports and imports, and why that makes them depend on each other.", required: true },

  // C3 Framework, grades 3-5 (a guide)
  { code: "D2.Civ.1.3-5", text: "Tell apart the jobs and powers of government leaders in different branches and levels of government.", required: false },
  { code: "D2.Civ.3.3-5", text: "Explore where rules and laws come from and what they are for.", required: false },
  { code: "D2.Civ.4.3-5", text: "Explain how groups of people make rules that create responsibilities and protect freedoms.", required: false },
  { code: "D2.Civ.5.3-5", text: "Explain how governments are set up, including those created by the U.S. and state constitutions.", required: false },
  { code: "D2.Civ.12.3-5", text: "Explain how rules and laws change society and how people can change rules and laws.", required: false },
  { code: "D2.Eco.1.3-5", text: "Compare the benefits and costs of choices people make.", required: false },
  { code: "D2.Eco.3.3-5", text: "Name the kinds of resources (natural, human and capital) used to make goods and services.", required: false },
  { code: "D2.Eco.4.3-5", text: "Explain why people and businesses specialize and trade.", required: false },
  { code: "D2.Eco.14.3-5", text: "Explain how trade makes places depend on each other.", required: false },
  { code: "D2.Geo.1.3-5", text: "Make maps and other drawings of familiar and unfamiliar places.", required: false },
  { code: "D2.Geo.2.3-5", text: "Use maps and pictures to explain how places and regions connect to their land and climate.", required: false },
  { code: "D2.Geo.3.3-5", text: "Use maps of different scales to describe where things are found.", required: false },
  { code: "D2.Geo.4.3-5", text: "Explain how people's ways of life shape how they adapt to and change their surroundings.", required: false },
  { code: "D2.Geo.6.3-5", text: "Describe how land, climate and ways of life affect where people choose to live.", required: false },
  { code: "D2.Geo.7.3-5", text: "Explain how land and ways of life affect the movement of people, goods and ideas.", required: false },
  { code: "D2.Geo.8.3-5", text: "Explain how where people settle relates to the natural resources found there.", required: false },
  { code: "D2.Geo.11.3-5", text: "Explain how the things we buy connect us to faraway places.", required: false },
  { code: "D2.His.1.3-5", text: "Put related events in order on a timeline and compare things that happened at the same time.", required: false },
  { code: "D2.His.2.3-5", text: "Compare life in a past time with life today.", required: false },
  { code: "D2.His.3.3-5", text: "Ask questions about people and groups who shaped important changes in history.", required: false },
  { code: "D2.His.14.3-5", text: "Explain the likely causes and effects of events in history.", required: false },
];
