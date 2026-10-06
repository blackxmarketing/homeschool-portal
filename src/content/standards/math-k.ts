import type { Standard } from "./types";

/** Standards for math-k: the Common Core State Standards for Kindergarten math. */
export const mathKStandards: Standard[] = [
  // Counting and Cardinality
  { code: "K.CC.A.1", text: "Count to 100 by ones and by tens.", required: true },
  { code: "K.CC.A.2", text: "Count forward starting from any given number, not just from 1.", required: true },
  { code: "K.CC.A.3", text: "Write numbers from 0 to 20 and use a written number to show how many objects there are (0 means none).", required: true },
  { code: "K.CC.B.4", text: "Understand that counting means saying one number for each object, that the last number said tells how many, and that each next number is one more.", required: true },
  { code: "K.CC.B.5", text: "Count to answer 'how many?' for up to 20 objects in a line, array or circle (or 10 scattered), and count out a given number of objects.", required: true },
  { code: "K.CC.C.6", text: "Tell whether one group of objects has more than, less than, or the same number as another group.", required: true },
  { code: "K.CC.C.7", text: "Compare two written numbers between 1 and 10.", required: true },
  // Operations and Algebraic Thinking
  { code: "K.OA.A.1", text: "Show adding and subtracting with objects, fingers, drawings, sounds, acting out, words or number sentences.", required: true },
  { code: "K.OA.A.2", text: "Solve addition and subtraction story problems within 10 using objects or drawings.", required: true },
  { code: "K.OA.A.3", text: "Break numbers up to 10 into two parts in more than one way, like 5 = 2 + 3 and 5 = 4 + 1.", required: true },
  { code: "K.OA.A.4", text: "For any number from 1 to 9, find the number that makes 10 when added to it.", required: true },
  { code: "K.OA.A.5", text: "Add and subtract within 5 quickly and accurately.", required: true },
  // Number and Operations in Base Ten
  { code: "K.NBT.A.1", text: "Build and break apart the numbers 11 to 19 as ten ones and some more ones, like 18 = 10 + 8.", required: true },
  // Measurement and Data
  { code: "K.MD.A.1", text: "Describe things that can be measured, like length and weight.", required: true },
  { code: "K.MD.A.2", text: "Compare two objects side by side to see which has more or less of something, like which is taller or heavier.", required: true },
  { code: "K.MD.B.3", text: "Sort objects into groups, count how many are in each group, and order the groups by count.", required: true },
  // Geometry
  { code: "K.G.A.1", text: "Name shapes seen in the world and tell where things are using words like above, below, beside, in front of, behind and next to.", required: true },
  { code: "K.G.A.2", text: "Name shapes correctly no matter which way they turn or how big they are.", required: true },
  { code: "K.G.A.3", text: "Tell whether a shape is flat (two-dimensional) or solid (three-dimensional).", required: true },
  { code: "K.G.B.4", text: "Compare flat and solid shapes of different sizes, describing their sides, corners and other parts.", required: true },
  { code: "K.G.B.5", text: "Build shapes from things like sticks and clay, and draw shapes.", required: true },
  { code: "K.G.B.6", text: "Put simple shapes together to make larger shapes, like two triangles making a rectangle.", required: true },
];
