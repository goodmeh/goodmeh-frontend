import { Text, Box, Group } from "@mantine/core";

const data = [
  {
    title: "Pricing",
    stats: "$$",
    description: "$69.42 was the average spend reported by Reviewers",
  },
  {
    title: "Reviews in the past year",
    stats: "420",
    description: "created during the 4th year of the Business",
  },
  {
    title: "Photos and Videos Submitted",
    stats: "69",
    description: "20% of all reviews had media attached",
  },
];

export const InsightDisplay: React.FC = () => {
  const stats = data.map((stat) => (
    <Box key={stat.title}>
      <Text
        size="xxxxl"
        fw={700}
        lh={1}
        mb="md"
      >
        {stat.stats}
      </Text>
      <Text fw={700} size="xl" c="white">
        {stat.title}
      </Text>
      <Text
        size="lg"
        mt="xs"
      >
        {stat.description}
      </Text>
    </Box>
  ));

  return (
    <Group
      grow
      p="xl"
      bg="blue.9"
      style={{
        borderRadius: "var(--mantine-radius-md)",
      }}
    >
      {stats}
    </Group>
  );
};
