import { useEffect, useState } from "react";
import "./App.css";
import OBR, { Item } from "@owlbear-rodeo/sdk";
import "./index.css";
import "./App.css";
import "@mantine/core/styles.css";
import {
  Flex,
  CloseButton,
  AppShell,
  MantineProvider,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import ConditionName from "./utils/conditionTypes";
import CONDITION_ATTACHMENT_NAMES from "./utils/fileToConditionMapData";
import Settings from "./components/Settings";
import ConditionList from "./components/List/List";

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
  const [opened, { open, close }] = useDisclosure(false);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    OBR.onReady(() => {
      setReady(true);
    });
  }, []);

  const [sceneReady, setSceneReady] = useState(false);
  useEffect(() => {
    if (ready) {
      OBR.scene.isReady().then((isReady) => {
        setSceneReady(isReady);
        OBR.scene.onReadyChange((isReady) => {
          setSceneReady(isReady);
        });
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
      OBR.room.onMetadataChange((data) => console.log(data));
    }
  }, [sceneReady]);

  return (
    <MantineProvider>
      <AppShell header={{ height: "40px" }}>
        <AppShell.Header px={"md"}>
          <Flex
            direction="row"
            align={"center"}
            justify={"space-between"}
            style={{ width: "100%", height: "100%" }}
          >
            <Title order={3}>5e Condition Reference</Title>
            <CloseButton
              icon={
                <IconSettings
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              }
              aria-label="Settings"
              onClick={open}
            />
          </Flex>
          <Settings opened={opened} close={close} />
        </AppShell.Header>
        <AppShell.Main>
          <ConditionList displayedConditions={conditions} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
