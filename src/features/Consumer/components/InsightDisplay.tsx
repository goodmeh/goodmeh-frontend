import { Text, Box, Group } from "@mantine/core";
import classes from "./InsightDisplay.module.scss";

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
    <Box key={stat.title} className={classes.stat}>
      <Text
        className={classes.count}
        size="32px"
        fw={700}
        lh={1}
        mb="md"
        ff="Greycliff CF, var(--mantine-font-family)"
      >
        {stat.stats}
      </Text>
      <Text className={classes.title} fw={700} size="sm" c="white">
        {stat.title}
      </Text>
      <Text
        className={classes.description}
        size="sm"
        mt={5}
        c="var(--mantine-color-blue-0)"
      >
        {stat.description}
      </Text>
    </Box>
  ));

  return (
    <Group
      className={classes.root}
      grow
      p="xl"
      style={{
        backgroundImage:
          "linear-gradient(-60deg, var(--mantine-color-blue-4) 0%, var(--mantine-color-blue-7) 100%)",
        borderRadius: "var(--mantine-radius-md)",
      }}
    >
      {stats}
    </Group>
  );
};
