import { RadarChart } from "@mantine/charts";
import { Stack, Title } from "@mantine/core";
export type CriteriaBasedChartData = {
  criteria: string;
  score: number;
};

type Props = {
  data: CriteriaBasedChartData[];
  title: string;
};

export const CriteriaBasedChart: React.FC<Props> = ({ data, title }) => {
  return (
    <Stack align="center">
      <Title order={4}>{title}</Title>
      <RadarChart
        h={400}
        data={data}
        dataKey="criteria"
        withPolarRadiusAxis={false}
        series={[{ name: "score", color: "blue.4", opacity: 0.2 }]}
      />
    </Stack>
  );
};
