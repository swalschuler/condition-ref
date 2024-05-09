import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import "./index.css";
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
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconShare3, IconHelp, IconSettings } from "@tabler/icons-react";
import Settings, { SettingsData } from "./components/Settings";
import ConditionList from "./components/List";
import tryAddingImgUrl from "/src/assets/tryAdding.svg";
import buyMeACoffeeURL from "/src/assets/bmc-logo.png";
import useAppState from "./state/store";
import { broadcastState, getConditionData, getUniqueConditions } from "./utils";

function App() {
  const [opened, { open, close }] = useDisclosure(false);

  const [ready, setReady] = useState(false); // Is OBR ready?
  const [sceneReady, setSceneReady] = useState(false); // Is the OBR.scene ready?
  const [isGM, setIsGM] = useState(false);

  /**
   * This will rerender when any state (even those not listed here) changes.
   * That means we redo a lot of work whenever tokens are moved around.
   * Future optimization:
   * Store only meaningful pieces of localItems (i.e. names) to prevent extra renders.
   */
  const { localItems, checkedRings, checkedConditionMarkers, jsonValue } =
    useAppState();

  useEffect(() => {
    OBR.onReady(() => {
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      OBR.player.getRole().then((role) => setIsGM(role === "GM"));
      OBR.scene.isReady().then((isReady) => {
        setSceneReady(isReady);
        OBR.scene.onReadyChange((isReady) => {
          setSceneReady(isReady);
        });
      });
      OBR.broadcast.onMessage("net.upperatmosphere.tokentext", (d) =>
        useAppState.setState(d.data as SettingsData)
      );
    }
  }, [ready]);

  useEffect(() => {
    if (sceneReady) {
      OBR.scene.items
        .getItems()
        .then((items) => useAppState.setState({ localItems: items }));
      OBR.scene.items.onChange((items) =>
        useAppState.setState({ localItems: items })
      );
    } else {
      // Clear out any conditions that were showing when the scene was open.
      useAppState.setState({ localItems: [] });
    }
  }, [sceneReady]);

  const { fileToNameMap, conditionData } = getConditionData(
    checkedRings,
    checkedConditionMarkers,
    jsonValue
  );
  const conditions = getUniqueConditions(localItems, fileToNameMap);

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
            <ActionIcon.Group>
              <CloseButton
                aria-label="Buy Me a Coffee"
                component="a"
                href="https://www.buymeacoffee.com/upperatmosphere"
                target="_blank"
                icon={
                  <Image
                    style={{ width: "50%", height: "50%" }}
                    src={buyMeACoffeeURL}
                  />
                }
              />
              <CloseButton
                aria-label="Help"
                component="a"
                href="https://github.com/swalschuler/condition-ref?tab=readme-ov-file#readme"
                target="_blank"
                icon={
                  <IconHelp
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                }
              />
              {isGM && (
                <>
                  <Tooltip label="Share your token text with players.">
                    <CloseButton
                      aria-label="Share With Players"
                      icon={
                        <IconShare3
                          style={{ width: "70%", height: "70%" }}
                          stroke={1.5}
                        />
                      }
                      onClick={() => {
                        try {
                          broadcastState({
                            checkedRings,
                            checkedConditionMarkers,
                            jsonValue:
                              jsonValue == ""
                                ? ""
                                : JSON.stringify(JSON.parse(jsonValue)), // Lazy way to remove unnecessary white space while broadcasting
                          });
                        } catch (e) {
                          // Users shouldn't be able to reach this state (since malformed JSON should never be saved to state)
                          // But... just in case.
                          alert("Unable to share your data.");
                        }
                      }}
                    />
                  </Tooltip>
                  <CloseButton
                    aria-label="Settings"
                    icon={
                      <IconSettings
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    }
                    onClick={open}
                  />
                </>
              )}
            </ActionIcon.Group>
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
                <Image src={tryAddingImgUrl} />
              </Center>
              <Center>Add some items to the scene to get going.</Center>
            </Stack>
          )}
          <Settings opened={opened} close={close} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
