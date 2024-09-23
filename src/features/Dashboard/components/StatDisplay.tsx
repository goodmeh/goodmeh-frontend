import { Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";

const data = [
  { title: "Weighted No of Stars", value: "4.0 Stars", diff: -20 },
  { title: "No. of Real Reviews", value: "420", diff: -69 },
];

export const StatDisplay: React.FC = () => {
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper
        withBorder
        p="xl"
        radius="md"
        key={stat.title}
        h="100%"
        component={Group}
        justify="space-between"
      >
        <Group>
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="lg">
              {stat.title}
            </Text>
            <Text fw={700} fz="xxxl">
              {stat.value}
            </Text>
            <Text c="dimmed" fz="xl" mt="xl">
              <Text
                component="span"
                c={stat.diff > 0 ? "teal" : "red"}
                fw={700}
                fz="xl"
              >
                {stat.diff}%
              </Text>{" "}
              {stat.diff > 0 ? "More" : "Less"} than Google Reviews
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            c={stat.diff > 0 ? "teal.6" : "red.6"}
            size={80}
            radius="md"
          >
            <DiffIcon size="xxl" stroke={1.5} />
          </ThemeIcon>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid cols={1}>{stats}</SimpleGrid>;
};
