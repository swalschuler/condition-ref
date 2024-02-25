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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSettings } from "@tabler/icons-react";
import {
  CONDITION_ATTACHMENTS_MARKERS,
  CONDITION_ATTACHMENTS_RINGS,
} from "./utils/fileToConditionMapData";
import Settings from "./components/Settings";
import ConditionList from "./components/List/List";
import { InputJson } from "./utils/validateJson";
import CONDITION_DATA, { ConditionDataSingleton } from "./utils/conditionData";
import { METADATA_ID } from "./utils/constants";

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
      OBR.room.getMetadata().then((data) => parseMetaData(data));
      OBR.room.onMetadataChange((data) => parseMetaData(data));
    }
  }, [ready]);

  const parseMetaData = (data: Metadata) => {
    let fileToName: { [key: string]: string } = {}; // CONDITION_ATTACHMENT_NAMES;
    let fullConditionData: {
      name: string;
      url: string;
      conditionEffects: string[];
    }[] = [...CONDITION_DATA];

    let checkedRings = true;
    if (!!data[METADATA_ID]) {
      checkedRings = !!(data[METADATA_ID] as any).checkedRings;
    }

    let checkedConditionMarkers = true;
    if (!!data[METADATA_ID]) {
      checkedConditionMarkers = !!(data[METADATA_ID] as any)
        .checkedConditionMarkers;
    }

    let jsonString: string | undefined = undefined;
    if (!!data[METADATA_ID]) {
      jsonString = (data[METADATA_ID] as any).json;
    }

    setCheckedRings(checkedRings);
    setCheckedConditionMarkers(checkedConditionMarkers);
    setJsonValue(jsonString || "");

    fileToName = {
      ...fileToName,
      ...(checkedRings && CONDITION_ATTACHMENTS_RINGS),
      ...(checkedConditionMarkers && CONDITION_ATTACHMENTS_MARKERS),
    };

    const json = JSON.parse(jsonString || "[]") as InputJson;

    json.map((entry) => {
      const dataEntry = {
        name: entry.title,
        url: entry?.url || "",
        conditionEffects: entry.conditionEffects,
      };
      fullConditionData.push(dataEntry);
      fileToName[entry.fileName] = entry.title;
    });

    setFileToNameMap(fileToName);
    setConditionData(fullConditionData);
  };

  const updateConditions = () => {
    console.log("updating");

    const usedConditions: string[] = [];

    // Could maybe optimize by filtering as I go
    for (const item of itemsLocal) {
      if (fileToNameMap.hasOwnProperty(item.name.toLowerCase())) {
        usedConditions.push(fileToNameMap[item.name.toLocaleLowerCase()]);
      }
    }

    const uniqueConditions = usedConditions.filter(
      (value, index, array) => array.indexOf(value) === index
    );

    setConditions(uniqueConditions);
  };

  useEffect(updateConditions, [itemsLocal, fileToNameMap]);

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

  console.log(fileToNameMap);
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
        </AppShell.Header>
        <AppShell.Main>
          <ConditionList
            displayedConditions={conditions}
            conditionData={conditionData}
          />
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
