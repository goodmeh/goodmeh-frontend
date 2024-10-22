import { LineChart } from "@mantine/charts";
import { Stack, Title } from "@mantine/core";
export type TimeBasedChartData = {
  date: string;
  value: number | null;
};

type Props = {
  data: TimeBasedChartData[];
  title: string;
};

export const TimeBasedChart: React.FC<Props> = ({ data, title }) => {
  return (
    <Stack
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Title order={4}>{title}</Title>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[{ name: "value", color: "indigo.6" }]}
        curveType="monotone"
        tickLine="x"
        yAxisProps={{ domain: [1, 5] }}
        strokeDasharray="15 15"
      />
    </Stack>
  );
};
