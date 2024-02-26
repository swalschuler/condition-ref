// Map file names to 5e conditions

// File names for rings that come with OBR
export const CONDITION_ATTACHMENTS_RINGS: { [key: string]: string } = {
  Blinded: "blinded",
  Charmed: "charmed",
  Deafened: "deafened",
  Exhaustion: "exhaustion",
  Frightened: "frightened",
  Grappled: "grappled",
  Incapacitated: "incapacitated",
  Invisible: "invisible",
  Paralyzed: "paralyzed",
  Petrified: "petrified",
  Poisoned: "poisoned",
  Prone: "prone",
  Restrained: "restrained",
  Stunned: "stunned",
  Unconscious: "unconscious",
};

// File names for Condition Markers extension
export const CONDITION_ATTACHMENTS_MARKERS: { [key: string]: string } = {
  "Condition Marker - Blinded": "blinded",
  "Condition Marker - Charmed": "charmed",
  "Condition Marker - Deafened": "deafened",
  "Condition Marker - Exhausted": "exhaustion",
  "Condition Marker - Frightened": "frightened",
  "Condition Marker - Grappled": "grappled",
  "Condition Marker - Incapacitated": "incapacitated",
  "Condition Marker - Invisible": "invisible",
  "Condition Marker - Paralyzed": "paralyzed",
  "Condition Marker - Petrified": "petrified",
  "Condition Marker - Poisoned": "poisoned",
  "Condition Marker - Prone": "prone",
  "Condition Marker - Restrained": "restrained",
  "Condition Marker - Stunned": "stunned",
  "Condition Marker - Unconscious": "unconscious",
};

const CONDITION_ATTACHMENT_NAMES = {
  ...CONDITION_ATTACHMENTS_RINGS,
  ...CONDITION_ATTACHMENTS_MARKERS,
};

export default CONDITION_ATTACHMENT_NAMES;
