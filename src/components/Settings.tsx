import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import validateJson, { MetaData } from "../utils/validateJson";
import OBR from "@owlbear-rodeo/sdk";
import { METADATA_ID } from "../utils/constants";
import { IconDeviceFloppy } from "@tabler/icons-react";
import SaveChangesModal from "./SaveChangesModal";
import { useDisclosure } from "@mantine/hooks";

const updateMetaData = (state: MetaData) => {
  return OBR.room.setMetadata({ [METADATA_ID]: { ...state } });
};

const Settings = ({
  opened,
  close,
  checkedRings,
  checkedConditionMarkers,
  jsonValue,
  setJsonValue,
}: {
  opened: boolean;
  close: () => void;
  checkedRings: boolean;
  setCheckedRings: Dispatch<SetStateAction<boolean>>;
  checkedConditionMarkers: boolean;
  setCheckedConditionMarkers: Dispatch<SetStateAction<boolean>>;
  jsonValue: string;
  setJsonValue: Dispatch<SetStateAction<string>>;
}) => {
  const [oldJson, setOldJson] = useState("");
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  useEffect(() => setOldJson(jsonValue), [opened]);

  const isJsonValid = validateJson(jsonValue, JSON.parse);

  const state = {
    checkedRings,
    checkedConditionMarkers,
    json: jsonValue,
  };

  const isButtonEnabled = () => {
    return !!isJsonValid && jsonValue !== oldJson;
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
        if (jsonValue !== oldJson) {
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
              setJsonValue(oldJson);
              close();
            }}
            save={
              isButtonEnabled()
                ? () => {
                    updateMetaData(state).then(() => setOldJson(jsonValue));
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
                updateMetaData({ ...state, checkedRings: !checkedRings })
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
                updateMetaData({
                  ...state,
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
            value={jsonValue}
            onChange={setJsonValue}
            error={getJsonWarning()}
          />
          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              fullWidth
              leftSection={<IconDeviceFloppy size={14} />}
              disabled={!isButtonEnabled()}
              onClick={() =>
                updateMetaData(state).then(() => setOldJson(jsonValue))
              }
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
