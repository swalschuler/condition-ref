import { ActionIcon } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

const LinkCopyButton = ({ url }: { url: string }) => {
  const clipboard = useClipboard();

  return (
    <ActionIcon
      variant="default"
      aria-label="Pin"
      onClick={() => clipboard.copy(url)}
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
