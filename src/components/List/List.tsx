import {
  Button,
  Stack,
  Text,
  Card,
  Image,
  Badge,
  Group,
  Title,
  ActionIcon,
  Divider,
} from "@mantine/core";

import OBR, {
  buildImage,
  buildLabel,
  buildShape,
  buildText,
} from "@owlbear-rodeo/sdk";

import { IconAdjustments, IconPin } from "@tabler/icons-react";

import ConditionCard from "../ConditionCard";
import "./List.css";
import { ConditionName } from "../../types/conditionTypes";

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const clickTest = () => {
  const rich = [
    {
      type: "paragraph",
      children: [{ text: "Owlbear Rodeo" }],
    },
  ];

  const text = buildText().richText(rich).build();

  const item = buildImage(
    {
      height: 300,
      width: 300,
      url: "https://i.imgur.com/kPMkmuM.jpg",
      mime: "image/jpg",
    },
    { dpi: 300, offset: { x: 150, y: 150 } }
  )
    .layer("NOTE")
    .textItemType("TEXT")
    .richText(rich)
    // .plainText("testing here!!!")
    .textWidth(200)
    .textHeight(200)
    .attachedTo(text.id)
    .build();

  const label = buildLabel().plainText("Test").pointerHeight(0).build();

  OBR.scene.items.addItems([item, text]);
};

const data: { name: ConditionName; conditionEffects: string[] }[] = [
  {
    name: "blinded",
    conditionEffects: [
      "You automatically fail any ability check which requires sight.",
      "You have disadvantage on attack rolls.",
      "Attack rolls against you have advantage.",
    ],
  },
  {
    name: "exhaustion",
    conditionEffects: [
      "You automatically fail any ability check which requires sight.",
      "You have disadvantage on attack rolls.",
      "Attack rolls against you have advantage.",
    ],
  },
];

const List = ({
  displayedConditions,
}: {
  displayedConditions: ConditionName[];
}) => {
  const dataToShow = data.filter((condition) =>
    displayedConditions.includes(condition.name)
  );

  const cards = dataToShow.map((cond) => {
    const effects = cond.conditionEffects.map((effect, i) => (
      <div key={`${cond.name}-${i}`}>
        <Text size="sm" c="dimmed">
          {effect}
        </Text>
        {i < cond.conditionEffects.length - 1 ? <Divider my="sm" /> : null}
      </div>
    ));
    return (
      <Card key={cond.name} shadow="sm" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>{capitalizeFirstLetter(cond.name)}</Text>
          <ActionIcon variant="default" aria-label="Pin" onClick={clickTest}>
            <IconPin style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
        {effects}
      </Card>
    );
  });

  return (
    <Stack h={"100vh"} bg="var(--mantine-color-body)" justify="flex-start">
      <Title order={3}>Condition Reference</Title>
      <Divider my="sm" />
      {cards}
    </Stack>
  );
};

export default List;
