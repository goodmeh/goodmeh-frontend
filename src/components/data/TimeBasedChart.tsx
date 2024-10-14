import { LineChart } from "@mantine/charts";

export type TimeBasedChartData = {
  date: string;
  value: number;
};

type Props = {
  data: TimeBasedChartData[];
};

export const TimeBasedChart: React.FC<Props> = ({ data }) => {
  return (
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
  );
};
