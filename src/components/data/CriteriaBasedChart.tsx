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
    <Stack ta="center">
      <Title order={4}>{title}</Title>
      <RadarChart
        h={{
          base: 200,
          xs: 300,
          sm: 400,
        }}
        data={data}
        dataKey="criteria"
        series={[{ name: "score", color: "yellow.4", opacity: 0.2 }]}
      />
    </Stack>
  );
};
