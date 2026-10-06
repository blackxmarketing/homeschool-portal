import type { Standard } from "./types";

/** Standards for sci-1: the NGSS performance expectations for grade 1 (plus optional K-2 engineering). */
export const sci1Standards: Standard[] = [
  {
    code: "1-PS4-1",
    text: "Investigate to show that things that shake (vibrate) make sound, and that sound can make things shake.",
    required: true,
  },
  {
    code: "1-PS4-2",
    text: "Observe and explain that things in the dark can only be seen when light shines on them.",
    required: true,
  },
  {
    code: "1-PS4-3",
    text: "Test what happens when clear, cloudy, solid or shiny materials are put in the path of a beam of light.",
    required: true,
  },
  {
    code: "1-PS4-4",
    text: "Design and build a device that uses light or sound to send a message over a distance.",
    required: true,
  },
  {
    code: "1-LS1-1",
    text: "Design a solution to a people problem by copying how plants and animals use their outside parts to survive and grow.",
    required: true,
  },
  {
    code: "1-LS1-2",
    text: "Read and watch to find patterns in how parents and their babies act that help the babies survive.",
    required: true,
  },
  {
    code: "1-LS3-1",
    text: "Observe and explain that young plants and animals are like, but not exactly like, their parents.",
    required: true,
  },
  {
    code: "1-ESS1-1",
    text: "Use observations of the Sun, Moon and stars to describe patterns in the sky that can be predicted.",
    required: true,
  },
  {
    code: "1-ESS1-2",
    text: "Observe at different times of year how the amount of daylight changes with the seasons.",
    required: true,
  },
  {
    code: "K-2-ETS1-1",
    text: "Ask questions and observe to define a simple problem that a new or better tool or object could solve.",
    required: false,
  },
  {
    code: "K-2-ETS1-2",
    text: "Make a simple sketch, drawing or model to show how the shape of an object helps it do its job.",
    required: false,
  },
  {
    code: "K-2-ETS1-3",
    text: "Test two objects made to solve the same problem and compare which one works better.",
    required: false,
  },
];
