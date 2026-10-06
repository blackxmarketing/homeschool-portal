import type { Standard } from "./types";

/** Standards for sci-2: the NGSS performance expectations for grade 2, plus K-2 engineering design. */
export const sci2Standards: Standard[] = [
  // Structure and Properties of Matter
  { code: "2-PS1-1", text: "Test and sort different materials by what you can observe, like color, texture, hardness and whether they bend or float.", required: true },
  { code: "2-PS1-2", text: "Use test results to decide which material is best for a job, like a raincoat or a bridge.", required: true },
  { code: "2-PS1-3", text: "Show how an object made of small pieces can be taken apart and built into a new object.", required: true },
  { code: "2-PS1-4", text: "Use evidence to explain that some changes from heating or cooling can be undone and some cannot.", required: true },
  // Interdependent Relationships in Ecosystems
  { code: "2-LS2-1", text: "Plan and do a test to find out if plants need sunlight and water to grow.", required: true },
  { code: "2-LS2-2", text: "Build a simple model of how an animal spreads seeds or pollinates flowers.", required: true },
  { code: "2-LS4-1", text: "Observe plants and animals to compare how many kinds of living things are in different habitats.", required: true },
  // Earth's Systems: Processes that Shape the Earth
  { code: "2-ESS1-1", text: "Use several sources to show that some Earth events happen quickly and some happen very slowly.", required: true },
  { code: "2-ESS2-1", text: "Compare different ways people slow or stop wind and water from changing the shape of the land.", required: true },
  { code: "2-ESS2-2", text: "Make a model or map that shows the shapes and kinds of land and water in an area.", required: true },
  { code: "2-ESS2-3", text: "Find out where water is found on Earth and that it can be solid ice or liquid water.", required: true },
  // Engineering Design (K-2)
  { code: "K-2-ETS1-1", text: "Ask questions and make observations to understand a problem that a new or better tool or object could solve.", required: true },
  { code: "K-2-ETS1-2", text: "Make a simple sketch, drawing or model to show how an object's shape helps it solve a problem.", required: true },
  { code: "K-2-ETS1-3", text: "Compare test results of two objects built to solve the same problem to see what each does well and poorly.", required: true },
];
