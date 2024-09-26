import { DonutChart } from "@mantine/charts";

const data = [
  { name: "USA", value: 400, color: "indigo.6" },
  { name: "India", value: 300, color: "yellow.6" },
  { name: "Japan", value: 100, color: "teal.6" },
  { name: "Other", value: 200, color: "gray.6" },
];

export const PercentageBasedChart: React.FC = () => {
  return <DonutChart data={data} />;
};
