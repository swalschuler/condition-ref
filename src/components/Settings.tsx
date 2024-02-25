import { useState } from "react";
import {
  Drawer,
  Title,
  ScrollArea,
  Checkbox,
  Divider,
  JsonInput,
  Group,
} from "@mantine/core";

const Settings = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const [checkedRings, setCheckedRings] = useState(false);
  const [checkedConditionMarkers, setCheckedConditionMarkers] = useState(false);
  const [jsonValue, setJsonValue] = useState("");

  return (
    <Drawer.Root
      opened={opened}
      onClose={close}
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
          <Drawer.Title>
            <Title order={3}>Settings</Title>
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
          <Title order={4}>5e Condition Markers.</Title>
          You can enable common condition markers here.
          <Group>
            <Checkbox
              checked={checkedRings}
              onChange={(event) => setCheckedRings(event.currentTarget.checked)}
            />
            Default Rings
          </Group>
          <Group>
            <Checkbox
              checked={checkedConditionMarkers}
              onChange={(event) =>
                setCheckedConditionMarkers(event.currentTarget.checked)
              }
            />
            Condition Markers
          </Group>
          <Divider my="md" />
          <Title order={4}>Custom Token Text</Title>
          You can show any text you'd like when a given token is added to your
          scene.
          <JsonInput
            placeholder="{ ... }"
            validationError="Invalid JSON"
            formatOnBlur
            autosize
            minRows={4}
            value={jsonValue}
            onChange={setJsonValue}
          />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

export default Settings;
