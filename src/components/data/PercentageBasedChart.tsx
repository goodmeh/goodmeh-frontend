import { PieChart } from "@mantine/charts";
import { Stack, Title } from "@mantine/core";

const data = [
  { name: "Enthus", value: 300, color: "indigo.6" },
  { name: "Trollers", value: 300, color: "yellow.6" },
  { name: "Lurkers", value: 200, color: "teal.6" },
  { name: "Bots", value: 200, color: "gray.6" },
];

export const PercentageBasedChart: React.FC = () => {
  return (
    <Stack
      gap="0"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Title order={3}>Types of users</Title>
      <PieChart
        data={data}
        tooltipDataSource="segment"
        withLabels
        withLabelsLine={false}
        labelsPosition="inside"
        labelsType="percent"
        strokeWidth={2}
        h={400}
        size={300}
      />
    </Stack>
  );
};
