import type { Standard } from "./types";

/**
 * Standards for soc-5 (Grade 5 social studies: U.S. history from the colonies
 * to the Constitution): the usual grade 5 topics coded "SS.5.<n>", which the
 * course must teach, plus C3 Framework indicators for grades 3-5 (a guide).
 */
export const soc5Standards: Standard[] = [
  // Grade 5 topics (must be taught)
  { code: "SS.5.1", text: "Name the thirteen colonies, group them into the New England, Middle and Southern regions, and find them on a map.", required: true },
  { code: "SS.5.2", text: "Explain how the land and climate of each colonial region shaped how people made a living, from fishing and shipbuilding to grain farms and plantations.", required: true },
  { code: "SS.5.3", text: "Describe colonial life and early self-government, like the House of Burgesses, the Mayflower Compact and New England town meetings.", required: true },
  { code: "SS.5.4", text: "Explain how the French and Indian War left Britain deep in debt and led to new taxes and rules for the colonies.", required: true },
  { code: "SS.5.5", text: "Explain how colonists protested British taxes, including the Stamp Act, the cry of \"no taxation without representation\" and the Boston Tea Party.", required: true },
  { code: "SS.5.6", text: "Describe how the fighting began at Lexington and Concord in April 1775.", required: true },
  { code: "SS.5.7", text: "Explain why the Second Continental Congress declared independence and how Thomas Jefferson wrote the Declaration, adopted on July 4, 1776.", required: true },
  { code: "SS.5.8", text: "Explain the main ideas of the Declaration of Independence: unalienable rights to life, liberty and the pursuit of happiness, and government by the consent of the governed.", required: true },
  { code: "SS.5.9", text: "Describe the major events of the Revolutionary War, including Trenton, Saratoga, Valley Forge, the help of France and the victory at Yorktown.", required: true },
  { code: "SS.5.10", text: "Describe George Washington's leadership and the courage and sacrifices of ordinary soldiers and their families during the war.", required: true },
  { code: "SS.5.11", text: "Explain why the Articles of Confederation made a national government that was too weak to work well.", required: true },
  { code: "SS.5.12", text: "Describe the Constitutional Convention of 1787, James Madison's role, and the compromises that created the Constitution.", required: true },
  { code: "SS.5.13", text: "Explain the goals of government listed in the Preamble to the Constitution, beginning \"We the People.\"", required: true },
  { code: "SS.5.14", text: "Name the three branches of the national government and their jobs, and explain how checks and balances keep any one branch from becoming too powerful.", required: true },
  { code: "SS.5.15", text: "Explain the Bill of Rights, including the five freedoms of the First Amendment, and the rights and responsibilities of citizens.", required: true },
  { code: "SS.5.16", text: "Read short primary sources and put the events from the colonies to the Constitution in order on a timeline.", required: true },

  // C3 Framework, grades 3-5 (a guide)
  { code: "D2.Civ.1.3-5", text: "Tell the jobs and powers of government leaders in different branches of government.", required: false },
  { code: "D2.Civ.2.3-5", text: "Explain how a free country depends on citizens taking part responsibly.", required: false },
  { code: "D2.Civ.3.3-5", text: "Explain where rules and laws come from and why we have them.", required: false },
  { code: "D2.Civ.4.3-5", text: "Explain how groups make rules that give people responsibilities and protect their freedoms.", required: false },
  { code: "D2.Civ.5.3-5", text: "Explain how our governments are set up, including by the U.S. Constitution.", required: false },
  { code: "D2.Civ.6.3-5", text: "Describe how people gain from working together in government, families and communities.", required: false },
  { code: "D2.Civ.8.3-5", text: "Name the core civic virtues and principles, like liberty, justice and the rule of law, that guide our government.", required: false },
  { code: "D2.Civ.12.3-5", text: "Explain how laws and rules change a community and how people can change them.", required: false },
  { code: "D2.Eco.1.3-5", text: "Compare the benefits and costs of choices people make.", required: false },
  { code: "D2.Eco.3.3-5", text: "Name the natural, human and capital resources used to make goods and services.", required: false },
  { code: "D2.Eco.4.3-5", text: "Explain why people and places specialize and trade.", required: false },
  { code: "D2.Eco.10.3-5", text: "Explain how government pays for the goods and services it gives, including through taxes.", required: false },
  { code: "D2.Geo.2.3-5", text: "Use maps to explain how places and regions relate to their land and climate.", required: false },
  { code: "D2.Geo.4.3-5", text: "Explain how people change and adapt to their surroundings.", required: false },
  { code: "D2.Geo.6.3-5", text: "Describe how land, water and climate affect where people live and the work they do.", required: false },
  { code: "D2.His.1.3-5", text: "Make and use a timeline of related events.", required: false },
  { code: "D2.His.2.3-5", text: "Compare life in the past with life today.", required: false },
  { code: "D2.His.3.3-5", text: "Ask questions about people who shaped important changes in history.", required: false },
  { code: "D2.His.4.3-5", text: "Explain why people living at the same time sometimes saw events differently.", required: false },
  { code: "D2.His.9.3-5", text: "Explain how different kinds of sources, like letters and documents, tell us about the past.", required: false },
  { code: "D2.His.14.3-5", text: "Explain likely causes and effects of past events.", required: false },
  { code: "D2.His.16.3-5", text: "Use evidence from sources to back up a claim about the past.", required: false },
];
