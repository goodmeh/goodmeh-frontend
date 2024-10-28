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
    <Stack align="center">
      <Title order={4}>{title}</Title>
      <BarChart
        h={300}
        data={data}
        series={[{ name: "count", color: "indigo.6" }]}
        dataKey="keyword"
        withBarValueLabel
        withTooltip={false}
        strokeDasharray="15 15"
      />
    </Stack>
  );
};
