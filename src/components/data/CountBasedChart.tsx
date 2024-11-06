import { BarChart } from "@mantine/charts";
import { Stack, Title } from "@mantine/core";
export type CountBasedChartData = {
  keyword: string;
  count: number;
};

type Props = {
  data: CountBasedChartData[];
  title: string;
};

export const CountBasedChart: React.FC<Props> = ({ data, title }) => {
  return (
    <Stack align="center" pb="xl">
      <Title order={4}>{title}</Title>
      <BarChart
        h={300}
        data={data}
        series={[{ name: "count", color: "indigo.6" }]}
        dataKey="keyword"
        withBarValueLabel
        strokeDasharray="15 15"
        xAxisProps={{
          interval: 0,
        }}
      />
    </Stack>
  );
};
