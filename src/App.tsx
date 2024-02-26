import { useEffect, useState } from "react";
import "./App.css";
import OBR, { Item, Metadata } from "@owlbear-rodeo/sdk";
import "./index.css";
import "./App.css";
import "@mantine/core/styles.css";
import {
  Flex,
  CloseButton,
  AppShell,
  MantineProvider,
  Title,
  Center,
  Image,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import Settings from "./components/Settings";
import ConditionList from "./components/List/List";
import { ConditionDataSingleton } from "./utils/conditionData";
import { parseMetaData, updateConditions } from "./utils/parsingHelpers";

function App() {
  const [ready, setReady] = useState(false); // Is OBR ready?
  const [sceneReady, setSceneReady] = useState(false); // Is the OBR.scene ready?

  const [conditions, setConditions] = useState<string[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [checkedRings, setCheckedRings] = useState(false);
  const [checkedConditionMarkers, setCheckedConditionMarkers] = useState(false);
  const [jsonValue, setJsonValue] = useState("");
  const [fileToNameMap, setFileToNameMap] = useState<{
    [key: string]: string;
  }>({});
  const [conditionData, setConditionData] = useState<ConditionDataSingleton[]>(
    []
  );
  const [itemsLocal, setItemsLocal] = useState<Item[]>([]);

  useEffect(() => {
    OBR.onReady(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      OBR.scene.isReady().then((isReady) => {
        setSceneReady(isReady);
        OBR.scene.onReadyChange((isReady) => {
          setSceneReady(isReady);
        });
      });
      const parse = (data: Metadata) =>
        parseMetaData(
          data,
          setCheckedRings,
          setCheckedConditionMarkers,
          setJsonValue,
          setFileToNameMap,
          setConditionData
        );
      OBR.room.getMetadata().then(parse);
      OBR.room.onMetadataChange(parse);
    }
  }, [ready]);

  useEffect(
    () => updateConditions(itemsLocal, fileToNameMap, setConditions),
    [itemsLocal, fileToNameMap]
  );

  useEffect(() => {
    if (sceneReady) {
      OBR.scene.items.getItems().then((items) => {
        setItemsLocal(items);
      });
      OBR.scene.items.onChange((items) => {
        setItemsLocal(items);
      });
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
            <Title order={3}>Token Text</Title>
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
        </AppShell.Header>
        <AppShell.Main mih={"100%"}>
          {conditions.length > 0 ? (
            <ConditionList
              displayedConditions={conditions}
              conditionData={conditionData}
            />
          ) : (
            <Stack>
              <Center>
                <Image src={"/src/assets/tryAdding.svg"} />
              </Center>
              <Center>Add some items to the room to get going.</Center>
            </Stack>
          )}
          <Settings
            opened={opened}
            close={close}
            checkedRings={checkedRings}
            setCheckedRings={setCheckedRings}
            checkedConditionMarkers={checkedConditionMarkers}
            setCheckedConditionMarkers={setCheckedConditionMarkers}
            jsonValue={jsonValue}
            setJsonValue={setJsonValue}
          />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
