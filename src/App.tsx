import { useEffect, useState } from "react";
import "./App.css";
import OBR from "@owlbear-rodeo/sdk";
import List from "./components/List/List";
import "./index.css";
import { ConditionName } from "./types/conditionTypes";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

// Map file names to 5e conditions
const CONDITION_ATTACHMENT_NAMES: { [key: string]: ConditionName } = {
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

function App() {
  const [conditions, setConditions] = useState<ConditionName[]>([]);

  useEffect(
    () =>
      OBR.scene.items.onChange((items) => {
        const usedConditions: ConditionName[] = [];

        // Could maybe optimize by filtering as I go
        for (const item of items) {
          if (
            CONDITION_ATTACHMENT_NAMES.hasOwnProperty(item.name.toLowerCase())
          ) {
            usedConditions.push(
              CONDITION_ATTACHMENT_NAMES[item.name.toLocaleLowerCase()]
            );
          }
        }

        const uniqueConditions = usedConditions.filter(
          (value, index, array) => array.indexOf(value) === index
        );

        setConditions(uniqueConditions);
      }),
    []
  );

  return (
    <>
      <MantineProvider>
        <List displayedConditions={conditions} />
      </MantineProvider>
    </>
  );
}

export default App;
