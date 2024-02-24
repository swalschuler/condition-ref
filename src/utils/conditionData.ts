import ConditionName from "./conditionTypes";

const conditionData: {
  name: ConditionName;
  url: string;
  conditionEffects: string[];
}[] = [
  {
    name: "blinded",
    url: "https://5thsrd.org/rules/conditions/#blinded",
    conditionEffects: [
      "You automatically fail any ability check that requires sight.",
      "You have disadvantage on attack rolls.",
      "Attack rolls against you have advantage.",
    ],
  },
  {
    name: "charmed",
    url: "https://5thsrd.org/rules/conditions/#charmed",
    conditionEffects: [
      "You can't attack the charmer or target them with harmful abilities or magical effects.",
      "The charmer has advantage while interacting socially with you.",
    ],
  },
  {
    name: "deafened",
    url: "https://5thsrd.org/rules/conditions/#deafened",
    conditionEffects: [
      "You automatically fail any ability check that requires hearing.",
    ],
  },
  {
    name: "exhaustion",
    url: "https://5thsrd.org/rules/conditions/#exhaustion",
    conditionEffects: ["You are exhausted."],
  },
  {
    name: "frightened",
    url: "https://5thsrd.org/rules/conditions/#frightened",
    conditionEffects: [
      "You have disadvantage on ability checks and attack rolls while the source of fear is within line of site.",
      "You can't willingly move closer to the source of fear.",
    ],
  },
  {
    name: "grappled",
    url: "https://5thsrd.org/rules/conditions/#grappled",

    conditionEffects: [
      "Your speed is 0.",
      "The condition ends if the grappler is incapacitated.",
      "The condition ends if an effect removes you from the reach of the grappler.",
    ],
  },
  {
    name: "incapacitated",
    url: "https://5thsrd.org/rules/conditions/#incapacitated",

    conditionEffects: ["You can't take actions or reactions."],
  },
  {
    name: "invisible",
    url: "https://5thsrd.org/rules/conditions/#invisible",

    conditionEffects: [
      "You can't be seen without the aid of magic or a special sense.",
      "For the purpose of hiding, you are heavily obscured.",
      "Your location can be detected by any noise you make or tracks you leave.",
      "You have advantage on attack rolls.",
      "Attack rolls against you have disadvantage.",
    ],
  },
  {
    name: "paralyzed",
    url: "https://5thsrd.org/rules/conditions/#paralyzed",

    conditionEffects: [
      "You are incapacitated and can't move or speak.",
      "You automatically fail Strength and Dexterity saving throws.",
      "Attack rolls against the creature have advantage.",
      "Attacks that hit you are critical if the attacker is within 5 feet of you.",
    ],
  },
  {
    name: "petrified",
    url: "https://5thsrd.org/rules/conditions/#petrified",

    conditionEffects: [
      "You, and any nonmagical object you are wearing or carrying, are transformed into a solid inanimate substance.",
      "Your weight increases by a factor of 10 and you cease aging.",
      "You are incapacitated, can't move or speak, and are unaware of your surroundings.",
      "Attack rolls against you have advantage.",
      "You automatically fail Strength and Dexterity saving throws.",
      "You have resistance to all damage.",
      "You are immune to poison and disease. Any poison or disease already in your system is suspended, not neutralized.",
    ],
  },
  {
    name: "poisoned",
    url: "https://5thsrd.org/rules/conditions/#poisoned",

    conditionEffects: [
      "You have disadvantage on attack rolls and ability checks.",
    ],
  },
  {
    name: "prone",
    url: "https://5thsrd.org/rules/conditions/#prone",

    conditionEffects: [
      "Your only movement option is to crawl.",
      "You have disadvantage on attack rolls.",
      "Attack rolls against you have advantage if the attacker is within 5 feet, and disadvantage otherwise.",
    ],
  },
  {
    name: "restrained",
    url: "https://5thsrd.org/rules/conditions/#restrained",

    conditionEffects: [
      "Your speed becomes 0.",
      "You have disadvantage on attack rolls.",
      "Attack rolls against you have advantage.",
      "You have disadvantage on Dexterity saving throws.",
    ],
  },
  {
    name: "stunned",
    url: "https://5thsrd.org/rules/conditions/#stunned",

    conditionEffects: [
      "You are incapacitated, can't move, and can only speak falteringly.",
      "You automatically fail Strength and Dexterity saving throws.",
      "Attack rolls against you have advantage.",
    ],
  },
  {
    name: "unconscious",
    url: "https://5thsrd.org/rules/conditions/#unconscious",
    conditionEffects: [
      "You are incapacitated, can't move or speak, and are unaware of your surroundings.",
      "You drop whatever you are holding and fall prone.",
      "You automatically fail Strength and Dexterity saving throws.",
      "Attack rolls against you have advantage.",
      "Attacks that hit you are critical if the attacker is within 5 feet of you.",
    ],
  },
];

export default conditionData;
