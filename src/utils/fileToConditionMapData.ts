// Map file names to 5e conditions

// File names for rings that come with OBR
export const CONDITION_ATTACHMENTS_RINGS: { [key: string]: string } = {
  blinded: "blinded",
  charmed: "charmed",
  deafened: "deafened",
  exhaustion: "exhaustion",
  frightened: "frightened",
  grappled: "grappled",
  incapacitated: "incapacitated",
  invisible: "invisible",
  paralyzed: "paralyzed",
  petrified: "petrified",
  poisoned: "poisoned",
  prone: "prone",
  restrained: "restrained",
  stunned: "stunned",
  unconscious: "unconscious",
};

// File names for Condition Markers extension
export const CONDITION_ATTACHMENTS_MARKERS: { [key: string]: string } = {
  "condition marker - blinded": "blinded",
  "condition marker - charmed": "charmed",
  "condition marker - deafened": "deafened",
  "condition marker - exhaustion": "exhaustion",
  "condition marker - frightened": "frightened",
  "condition marker - grappled": "grappled",
  "condition marker - incapacitated": "incapacitated",
  "condition marker - invisible": "invisible",
  "condition marker - paralyzed": "paralyzed",
  "condition marker - petrified": "petrified",
  "condition marker - poisoned": "poisoned",
  "condition marker - prone": "prone",
  "condition marker - restrained": "restrained",
  "condition marker - stunned": "stunned",
  "condition marker - unconscious": "unconscious",
};

const CONDITION_ATTACHMENT_NAMES = {
  ...CONDITION_ATTACHMENTS_RINGS,
  ...CONDITION_ATTACHMENTS_MARKERS,
};

export default CONDITION_ATTACHMENT_NAMES;
