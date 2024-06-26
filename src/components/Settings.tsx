import { useEffect, useState } from "react";
import {
  Drawer,
  Title,
  ScrollArea,
  Checkbox,
  Divider,
  JsonInput,
  Group,
  Button,
  Anchor,
} from "@mantine/core";
import validateJson from "../utils/validateJson";
import { IconDeviceFloppy } from "@tabler/icons-react";
import SaveChangesModal from "./SaveChangesModal";
import { useDisclosure } from "@mantine/hooks";
import useAppState from "../state/store";

export type SettingsData = {
  checkedRings: boolean;
  checkedConditionMarkers: boolean;
  jsonValue: string;
};

const Settings = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const { jsonValue, checkedRings, checkedConditionMarkers } = useAppState();

  // Use local state until ready to commit to localStorage.
  const [oldJson, setOldJson] = useState("");
  const [newJson, setNewJson] = useState("");

  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  useEffect(() => {
    setOldJson(jsonValue);
    setNewJson(jsonValue);
  }, [opened]);

  const isJsonValid = validateJson(newJson, JSON.parse);

  const state = {
    checkedRings,
    checkedConditionMarkers,
    jsonValue: newJson,
  };

  const isButtonEnabled = () => {
    return !!isJsonValid && newJson !== oldJson;
  };

  const getJsonWarning = () => {
    if (isJsonValid === false) {
      return "Check the shape of your JSON.";
    }

    if (isJsonValid === undefined) {
      return "Invalid JSON.";
    }
    // Other cases are handled by inbuilt JsonInput validation.
    return "";
  };

  return (
    <Drawer.Root
      opened={opened}
      onClose={() => {
        if (newJson !== oldJson) {
          openModal();
          return;
        }
        close();
      }}
      position="right"
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header
          style={{
            minHeight: "40px",
            height: "40px",
            borderBottom: "calc(0.0625rem*var(--mantine-scale)) solid #dee2e6",
          }}
        >
          <Title order={3}>Settings</Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <SaveChangesModal
            discard={() => {
              useAppState.setState({ jsonValue: oldJson });
              close();
            }}
            save={
              isButtonEnabled()
                ? () => {
                    useAppState.setState(state);
                    close();
                  }
                : undefined
            }
            opened={modalOpened}
            open={openModal}
            close={closeModal}
          />
          <Title order={4}>5e conditions</Title>
          You can enable common condition markers here.
          <Group>
            <Checkbox
              checked={checkedRings}
              onChange={() =>
                useAppState.setState({ checkedRings: !checkedRings })
              }
            />
            <Anchor
              target="_blank"
              href="https://docs.owlbear.rodeo/docs/getting-started/"
            >
              Default Rings
            </Anchor>
          </Group>
          <Group>
            <Checkbox
              checked={checkedConditionMarkers}
              onChange={() =>
                useAppState.setState({
                  checkedConditionMarkers: !checkedConditionMarkers,
                })
              }
            />
            <Anchor
              target="_blank"
              href="https://extensions.owlbear.rodeo/condition-markers"
            >
              Condition Markers
            </Anchor>
          </Group>
          <Divider my="md" />
          <Title order={4}>Custom token text</Title>
          You can show any text you'd like when a given token is added to your
          scene.
          <JsonInput
            placeholder="{ ... }"
            formatOnBlur
            autosize
            minRows={4}
            value={newJson}
            onChange={(val) => setNewJson(val)}
            error={getJsonWarning()}
          />
          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              fullWidth
              leftSection={<IconDeviceFloppy size={14} />}
              disabled={!isButtonEnabled()}
              onClick={() => {
                useAppState.setState(state);
                setOldJson(newJson);
              }}
            >
              Save JSON
            </Button>
          </Group>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default Settings;
