import type { Standard } from "./types";

/** Standards for sci-3: the NGSS performance expectations for grade 3 (plus the optional 3-5 engineering ones). */
export const sci3Standards: Standard[] = [
  // Motion and stability: forces and interactions
  { code: "3-PS2-1", text: "Plan and run an investigation showing that balanced forces leave an object's motion the same and unbalanced forces change it.", required: true },
  { code: "3-PS2-2", text: "Observe and measure an object's motion to find a pattern that can be used to predict its future motion.", required: true },
  { code: "3-PS2-3", text: "Ask questions about how magnets and static electricity push or pull on objects that are not touching.", required: true },
  { code: "3-PS2-4", text: "Define a simple design problem that can be solved by using magnets.", required: true },
  // From molecules to organisms
  { code: "3-LS1-1", text: "Build models showing that plants and animals have different life cycles that all include birth, growth, reproduction and death.", required: true },
  // Ecosystems
  { code: "3-LS2-1", text: "Argue from evidence that some animals form groups that help members survive.", required: true },
  // Heredity
  { code: "3-LS3-1", text: "Use data to show that plants and animals inherit traits from their parents and that traits vary within a group of similar living things.", required: true },
  { code: "3-LS3-2", text: "Use evidence to explain that some traits can be influenced by the environment.", required: true },
  // Biological evolution: unity and diversity
  { code: "3-LS4-1", text: "Use fossils to learn about the living things and environments of long ago.", required: true },
  { code: "3-LS4-2", text: "Explain how small differences between members of the same kind of animal or plant can help some survive, find food and have young.", required: true },
  { code: "3-LS4-3", text: "Argue from evidence that in a given habitat some living things survive well, some less well, and some not at all.", required: true },
  { code: "3-LS4-4", text: "Judge a solution to a problem caused when a habitat changes and the plants and animals living there may change.", required: true },
  // Earth's systems and Earth and human activity
  { code: "3-ESS2-1", text: "Show weather data in tables and graphs to describe the weather expected in each season.", required: true },
  { code: "3-ESS2-2", text: "Gather and combine information to describe the climates of different regions of the world.", required: true },
  { code: "3-ESS3-1", text: "Make a claim about how well a design reduces the harm caused by a weather hazard, such as a flood or a storm.", required: true },
  // Engineering design (grades 3-5, optional in grade 3)
  { code: "3-5-ETS1-1", text: "Define a simple design problem, including what the solution must do and the limits on materials, time or cost.", required: false },
  { code: "3-5-ETS1-2", text: "Come up with several possible solutions to a problem and compare how well each is likely to work.", required: false },
  { code: "3-5-ETS1-3", text: "Plan and run fair tests to find the weak spots in a model or design so it can be improved.", required: false },
];
