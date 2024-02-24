import { Stack, Text, Card, Group, Divider, Space } from "@mantine/core";

import "./List.css";
import ConditionName from "../../utils/conditionTypes";
import conditionData from "../../utils/conditionData";
import LinkCopyButton from "../LinkCopyButton";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const List = ({
  displayedConditions,
}: {
  displayedConditions: ConditionName[];
}) => {
  const dataToShow = conditionData.filter((condition) =>
    displayedConditions.includes(condition.name)
  );

  const cards = dataToShow.map((cond) => {
    const effects = cond.conditionEffects.map((effect, i) => (
      <div key={`${cond.name}-${i}`}>
        <Text size="sm">{effect}</Text>
        {i < cond.conditionEffects.length - 1 ? <Divider my="sm" /> : null}
      </div>
    ));
    return (
      <Card key={cond.name} shadow="sm" padding="sm" radius="sm" withBorder>
        <Group justify="space-between" mt="sm" mb="xs">
          <Text fw={500}>{capitalizeFirstLetter(cond.name)}</Text>
          <LinkCopyButton url={cond.url} />
        </Group>
        {effects}
      </Card>
    );
  });

  return (
    <Stack gap={"sm"} bg="var(--mantine-color-body)" justify="flex-start">
      <Space my="xs" />
      {cards}
    </Stack>
  );
};

export default List;
