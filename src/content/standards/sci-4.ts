import type { Standard } from "./types";

/** Standards for sci-4: the NGSS performance expectations for grade 4, plus 3-5 engineering design (a guide here; required in grade 5). */
export const sci4Standards: Standard[] = [
  // Energy
  { code: "4-PS3-1", text: "Use evidence to explain that the faster an object moves, the more energy it has.", required: true },
  { code: "4-PS3-2", text: "Observe that energy moves from place to place by sound, light, heat and electric currents.", required: true },
  { code: "4-PS3-3", text: "Ask questions and predict what happens to energy when moving objects bump into each other.", required: true },
  { code: "4-PS3-4", text: "Design, test and improve a device that changes energy from one form to another, like a solar oven.", required: true },
  // Waves and their applications
  { code: "4-PS4-1", text: "Use a model of waves to describe their patterns (amplitude and wavelength) and how waves can make objects move.", required: true },
  { code: "4-PS4-2", text: "Use a model to show that we see objects when light reflects off them and enters our eyes.", required: true },
  { code: "4-PS4-3", text: "Come up with and compare different ways to send information using patterns, like Morse code or flashing lights.", required: true },
  // Structure, function and information processing
  { code: "4-LS1-1", text: "Explain how the inside and outside parts of plants and animals help them survive, grow, behave and reproduce.", required: true },
  { code: "4-LS1-2", text: "Use a model to show how animals take in information through their senses, process it in the brain and respond.", required: true },
  // Earth's place in the universe and Earth's systems
  { code: "4-ESS1-1", text: "Use rock layers and fossils as evidence that a landscape has changed over a long time.", required: true },
  { code: "4-ESS2-1", text: "Measure and observe how water, ice, wind and plants weather rock and carry it away (erosion).", required: true },
  { code: "4-ESS2-2", text: "Read maps to find patterns in where mountains, volcanoes, earthquakes and ocean trenches are found.", required: true },
  // Earth and human activity
  { code: "4-ESS3-1", text: "Explain that energy and fuels come from natural resources, some renewable and some not, and that using them affects the land, water and air.", required: true },
  { code: "4-ESS3-2", text: "Compare ways people reduce the harm from natural hazards like earthquakes, floods and volcanoes.", required: true },
  // Engineering design (3-5)
  { code: "3-5-ETS1-1", text: "Define a simple design problem, with what the design must do (criteria) and its limits like cost, time and materials (constraints).", required: false },
  { code: "3-5-ETS1-2", text: "Come up with several possible solutions and compare how well each one meets the criteria and constraints.", required: false },
  { code: "3-5-ETS1-3", text: "Plan and carry out fair tests that change one thing at a time to find what fails and how to improve a design.", required: false },
];
