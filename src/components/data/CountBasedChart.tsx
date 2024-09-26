import { BarChart } from "@mantine/charts";

const data = [
  { keyword: "Cheap", count: 1200 },
  { keyword: "Good Service", count: 1900 },
  { keyword: "Fast Delivery", count: 400 },
  { keyword: "Friendly Staff", count: 1000 },
  { keyword: "Clean", count: 800 },
];

export const CountBasedChart: React.FC = () => {
  return (
    <BarChart
      h={300}
      data={data}
      series={[{ name: "count", color: "indigo.6" }]}
      dataKey="keyword"
      withBarValueLabel
      withTooltip={false}
      strokeDasharray="15 15"
    />
  );
};
