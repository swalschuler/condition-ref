import { Modal, Button, Group } from "@mantine/core";
import { IconDeviceFloppy, IconTrash } from "@tabler/icons-react";

const SaveChangesModal = ({
  discard,
  save,
  opened,
  open,
  close,
}: {
  discard: () => void;
  save: (() => void) | undefined;
  opened: boolean;
  open: () => void;
  close: () => void;
}) => {
  return (
    <Modal opened={opened} onClose={close} title="You have unsaved changes.">
      <Group>
        <Button
          variant="filled"
          color="red"
          leftSection={<IconTrash size={14} />}
          onClick={() => {
            close();
            discard();
          }}
        >
          Discard Changes
        </Button>
        {!!save && (
          <Button
            variant="filled"
            leftSection={<IconDeviceFloppy size={14} />}
            onClick={() => {
              close();
              save();
            }}
          >
            Save Work
          </Button>
        )}
      </Group>
    </Modal>
  );
};

export default SaveChangesModal;
