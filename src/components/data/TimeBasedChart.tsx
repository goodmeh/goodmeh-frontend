import { LineChart } from "@mantine/charts";
import { Stack, Title } from "@mantine/core";
export type TimeBasedChartData = {
  date: string;
  MonAvg: number | null;
  CumAvg: number | null;
  RollAvg: number | null;
};

type Props = {
  data: TimeBasedChartData[];
  title: string;
};

export const TimeBasedChart: React.FC<Props> = ({ data, title }) => {
  return (
    <Stack align="center">
      <Title order={4}>{title}</Title>
      <LineChart
        h={300}
        data={data}
        dataKey="date"
        series={[
          { name: "MonAvg", label: "Monthly Average", color: "indigo.6" },
          { name: "CumAvg", label: "Cumulative Average", color: "yellow.6" },
          { name: "RollAvg", label: "Rolling Average", color: "teal.6" },
        ]}
        connectNulls
        withLegend
        legendProps={{ verticalAlign: "bottom", height: 50 }}
        curveType="monotone"
        strokeWidth={2}
        dotProps={{ r: 1, strokeWidth: 1, stroke: "#fff" }}
        activeDotProps={{ r: 2, strokeWidth: 2, stroke: "#fff" }}
        tickLine="x"
        yAxisProps={{ domain: [1, 5] }}
        strokeDasharray="15 15"
      />
    </Stack>
  );
};
