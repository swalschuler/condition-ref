import { Drawer, Title, ScrollArea, Text } from "@mantine/core";

const Settings = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  return (
    <>
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
              // borderStyle: "none none solid none",
              borderBottom:
                "calc(0.0625rem*var(--mantine-scale)) solid #dee2e6",
            }}
          >
            <Drawer.Title>
              <Title order={3}>Settings</Title>
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <Text>Boo!</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
            <Text>Hi</Text>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
};

export default Settings;
