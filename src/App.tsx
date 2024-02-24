import { useEffect, useState } from "react";
import "./App.css";
import OBR, { Item } from "@owlbear-rodeo/sdk";
import List from "./components/List/List";
import "./index.css";
import "./App.css";
import ConditionName from "./utils/conditionTypes";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import { AppShell, MantineProvider, Title } from "@mantine/core";

// Map file names to 5e conditions
const CONDITION_ATTACHMENT_NAMES: { [key: string]: ConditionName } = {
  blinded: "blinded",
  "condition marker - blinded": "blinded",

  charmed: "charmed",
  "condition marker - charmed": "charmed",

  deafened: "deafened",
  "condition marker - deafened": "bldeafenedinded",

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

const updateConditions = (
  items: Item[],
  setConditions: React.Dispatch<React.SetStateAction<ConditionName[]>>
) => {
  const usedConditions: ConditionName[] = [];

  // Could maybe optimize by filtering as I go
  for (const item of items) {
    if (CONDITION_ATTACHMENT_NAMES.hasOwnProperty(item.name.toLowerCase())) {
      usedConditions.push(
        CONDITION_ATTACHMENT_NAMES[item.name.toLocaleLowerCase()]
      );
    }
  }

  const uniqueConditions = usedConditions.filter(
    (value, index, array) => array.indexOf(value) === index
  );

  setConditions(uniqueConditions);
};

function App() {
  const [conditions, setConditions] = useState<ConditionName[]>([]);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    OBR.onReady(() => {
      setReady(true);
    });
  }, []);

  const [sceneReady, setSceneReady] = useState(false);
  useEffect(() => {
    if (ready) {
      return OBR.scene.onReadyChange((isReady) => {
        setSceneReady(isReady);
      });
    }
  }, [ready]);

  useEffect(() => {
    if (sceneReady) {
      OBR.scene.items
        .getItems()
        .then((items) => updateConditions(items, setConditions));
      OBR.scene.items.onChange((items) =>
        updateConditions(items, setConditions)
      );
    }
  }, [sceneReady]);

  return (
    <MantineProvider>
      <AppShell>
        <AppShell.Header className="header" px={"md"}>
          <Title order={3}>5e Condition Reference</Title>
        </AppShell.Header>
        <AppShell.Main>
          <List displayedConditions={conditions} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
