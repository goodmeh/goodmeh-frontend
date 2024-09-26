import { RadarChart } from "@mantine/charts";

const data = [
  {
    product: "Apples",
    sales: 120,
  },
  {
    product: "Oranges",
    sales: 98,
  },
  {
    product: "Tomatoes",
    sales: 86,
  },
  {
    product: "Grapes",
    sales: 99,
  },
  {
    product: "Bananas",
    sales: 85,
  },
  {
    product: "Lemons",
    sales: 65,
  },
];

export const CriteriaBasedChart: React.FC = () => {
  return (
    <RadarChart
      h={300}
      data={data}
      dataKey="product"
      withPolarRadiusAxis
      series={[{ name: "sales", color: "blue.4", opacity: 0.2 }]}
    />
  );
};
