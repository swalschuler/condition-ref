import { Stack, Text, Card, Group, Divider, ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ConditionList = ({
  displayedConditions,
  conditionData,
}: {
  displayedConditions: string[];
  conditionData: { name: string; url: string; conditionEffects: string[] }[];
}) => {
  const dataToShow = conditionData.filter((condition) =>
    displayedConditions.includes(condition.name)
  );

  const cards = dataToShow.map((cond, i) => {
    const effects = cond.conditionEffects.map((effect, j) => (
      <div key={`${cond.name}-${j}`}>
        <Text size="sm">{effect}</Text>
        {j < cond.conditionEffects.length - 1 ? <Divider my="sm" /> : null}
      </div>
    ));
    return (
      <Card
        key={`${cond.name}-${i}-card`}
        shadow="sm"
        padding="sm"
        radius="sm"
        withBorder
      >
        <Group justify="space-between" mt="sm" mb="xs">
          <Text fw={500}>{capitalizeFirstLetter(cond.name)}</Text>
          {cond.url && (
            <ActionIcon
              component="a"
              href={cond.url}
              target="_blank"
              aria-label="Open in a new tab"
              variant="default"
            >
              <IconExternalLink
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          )}
        </Group>
        {effects}
      </Card>
    );
  });

  return (
    <Stack gap={"sm"} bg="var(--mantine-color-body)" justify="flex-start">
      {cards}
    </Stack>
  );
};

export default ConditionList;
