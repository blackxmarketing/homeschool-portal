import type { Standard } from "./types";

/** Standards for sci-5: the NGSS performance expectations for grade 5, plus 3-5 engineering design. */
export const sci5Standards: Standard[] = [
  // Structure and Properties of Matter
  { code: "5-PS1-1", text: "Use a model to show that matter is made of particles too small to be seen.", required: true },
  { code: "5-PS1-2", text: "Measure and graph to show that the total weight of matter stays the same when it is heated, cooled or mixed.", required: true },
  { code: "5-PS1-3", text: "Make observations and measurements to identify materials by their properties.", required: true },
  { code: "5-PS1-4", text: "Investigate whether mixing two or more substances makes a new substance.", required: true },
  // Space Systems: Stars and the Solar System
  { code: "5-PS2-1", text: "Support the claim that Earth's gravity pulls objects down, toward the center of the Earth.", required: true },
  { code: "5-ESS1-1", text: "Explain that the Sun looks brighter than other stars because it is much closer to Earth.", required: true },
  { code: "5-ESS1-2", text: "Use graphs and data to show daily patterns of shadows and day and night, and the seasonal patterns of stars in the night sky.", required: true },
  // Matter and Energy in Organisms and Ecosystems
  { code: "5-PS3-1", text: "Use a model to show that the energy in animals' food was once energy from the Sun.", required: true },
  { code: "5-LS1-1", text: "Support the claim that plants get the materials they need for growth mainly from air and water.", required: true },
  { code: "5-LS2-1", text: "Make a model of how matter moves among plants, animals, decomposers and the environment.", required: true },
  // Earth's Systems
  { code: "5-ESS2-1", text: "Make a model of how the land, water, air and living things of Earth interact.", required: true },
  { code: "5-ESS2-2", text: "Describe and graph how much of Earth's water is salt water, fresh water and frozen water.", required: true },
  { code: "5-ESS3-1", text: "Find out how communities use science ideas to protect Earth's resources and environment.", required: true },
  // Engineering Design (3-5)
  { code: "3-5-ETS1-1", text: "Define a simple design problem, including what a good solution must do and the limits on time, cost and materials.", required: true },
  { code: "3-5-ETS1-2", text: "Come up with and compare several possible solutions to a problem, based on how well each meets the goals and limits.", required: true },
  { code: "3-5-ETS1-3", text: "Plan and carry out fair tests that control variables, and find the failure points of a model or prototype to improve it.", required: true },
];
