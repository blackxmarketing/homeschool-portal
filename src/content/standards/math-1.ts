import type { Standard } from "./types";

/** Standards for math-1: Common Core State Standards for Mathematics, Grade 1. */
export const math1Standards: Standard[] = [
  // Operations and Algebraic Thinking
  { code: "1.OA.A.1", text: "Use adding and subtracting within 20 to solve word problems about adding to, taking from, putting together, taking apart and comparing.", required: true },
  { code: "1.OA.A.2", text: "Solve word problems that add three whole numbers whose sum is 20 or less.", required: true },
  { code: "1.OA.B.3", text: "Use properties of addition: numbers can be added in any order (3 + 5 = 5 + 3) and grouped in any way (2 + 6 + 4 = 2 + 10).", required: true },
  { code: "1.OA.B.4", text: "Understand subtraction as a missing-addend problem, like finding 10 - 8 by asking what to add to 8 to make 10.", required: true },
  { code: "1.OA.C.5", text: "Connect counting to adding and subtracting, such as counting on 2 to add 2.", required: true },
  { code: "1.OA.C.6", text: "Add and subtract within 20 using strategies like counting on, making ten, doubles and fact families, and know sums within 10 by heart.", required: true },
  { code: "1.OA.D.7", text: "Understand that the equal sign means 'the same as' and tell whether number sentences like 6 = 6 or 5 + 2 = 2 + 5 are true or false.", required: true },
  { code: "1.OA.D.8", text: "Find the missing number in an addition or subtraction sentence, like 8 + ? = 11 or 5 = ? - 3.", required: true },
  // Number and Operations in Base Ten
  { code: "1.NBT.A.1", text: "Count to 120 starting at any number, and read and write numbers up to 120.", required: true },
  { code: "1.NBT.B.2", text: "Understand that the two digits of a two-digit number stand for tens and ones, that 10 is a bundle of ten ones, and that 11 to 19 are a ten and some ones.", required: true },
  { code: "1.NBT.B.3", text: "Compare two two-digit numbers by their tens and ones, and write the result with >, = or <.", required: true },
  { code: "1.NBT.C.4", text: "Add within 100, including a two-digit number and a one-digit number, and a two-digit number and a multiple of 10, sometimes making a new ten.", required: true },
  { code: "1.NBT.C.5", text: "Find 10 more or 10 less than a two-digit number in your head, without counting.", required: true },
  { code: "1.NBT.C.6", text: "Subtract multiples of 10 from multiples of 10 in the range 10 to 90, like 70 - 30.", required: true },
  // Measurement and Data
  { code: "1.MD.A.1", text: "Order three objects by length, and compare two lengths by using a third object.", required: true },
  { code: "1.MD.A.2", text: "Measure length by laying same-size units end to end with no gaps or overlaps.", required: true },
  { code: "1.MD.B.3", text: "Tell and write time in hours and half hours on analog and digital clocks.", required: true },
  { code: "1.MD.C.4", text: "Sort data into up to three groups, show it in a chart or graph, and answer how many in each group and how many more or less.", required: true },
  // Geometry
  { code: "1.G.A.1", text: "Tell apart what makes a shape that shape (like 3 straight sides for a triangle) from what doesn't matter (like color, size or which way it is turned), and draw shapes.", required: true },
  { code: "1.G.A.2", text: "Put flat shapes and solid shapes together to make new shapes.", required: true },
  { code: "1.G.A.3", text: "Split circles and rectangles into two or four equal shares and name them halves and fourths (quarters).", required: true },
];
