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
      <Drawer
        opened={opened}
        onClose={close}
        title={<Title order={3}>Text</Title>}
        position="right"
        scrollAreaComponent={ScrollArea.Autosize}
      >
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
      </Drawer>
    </>
  );
};

export default Settings;
