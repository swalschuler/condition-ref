import ConditionName from "./conditionTypes";

// Map file names to 5e conditions
const CONDITION_ATTACHMENT_NAMES: { [key: string]: ConditionName } = {
  blinded: "blinded",
  "condition marker - blinded": "blinded",

  charmed: "charmed",
  "condition marker - charmed": "charmed",

  deafened: "deafened",
  "condition marker - deafened": "deafened",

  exhaustion: "exhaustion",
  "condition marker - exhaustion": "exhaustion",

  frightened: "frightened",
  "condition marker - frightened": "frightened",

  grappled: "grappled",
  "condition marker - grappled": "grappled",

  incapacitated: "incapacitated",
  "condition marker - incapacitated": "incapacitated",

  invisible: "invisible",
  "condition marker - invisible": "invisible",

  paralyzed: "paralyzed",
  "condition marker - paralyzed": "paralyzed",

  petrified: "petrified",
  "condition marker - petrified": "petrified",

  poisoned: "poisoned",
  "condition marker - poisoned": "poisoned",

  prone: "prone",
  "condition marker - prone": "prone",

  restrained: "restrained",
  "condition marker - restrained": "restrained",

  stunned: "stunned",
  "condition marker - stunned": "stunned",

  unconscious: "unconscious",
  "condition marker - unconscious": "unconscious",
};

export default CONDITION_ATTACHMENT_NAMES;
