import { ActionIcon } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

const LinkCopyButton = () => {
  const clipboard = useClipboard();

  return (
    <ActionIcon
      variant="default"
      aria-label="Pin"
      onClick={() => clipboard.copy("Hello")}
      color={clipboard.copied ? "teal" : "blue"}
    >
      {clipboard.copied ? (
        <IconCopyCheck style={{ width: "70%", height: "70%" }} stroke={1.5} />
      ) : (
        <IconCopy style={{ width: "70%", height: "70%" }} stroke={1.5} />
      )}
    </ActionIcon>
  );
};

export default LinkCopyButton;
