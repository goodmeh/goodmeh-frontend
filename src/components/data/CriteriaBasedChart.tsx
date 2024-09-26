import { RadarChart } from "@mantine/charts";

const data = [
  {
    criteria: "Price",
    score: 7.8,
  },
  {
    criteria: "Quality",
    score: 3.8,
  },
  {
    criteria: "Service",
    score: 8.8,
  },
  {
    criteria: "Location",
    score: 5.9,
  },
  {
    criteria: "Cleanliness",
    score: 9.9,
  },
];

export const CriteriaBasedChart: React.FC = () => {
  return (
    <RadarChart
      h={400}
      data={data}
      dataKey="criteria"
      withPolarRadiusAxis={false}
      series={[{ name: "score", color: "blue.4", opacity: 0.2 }]}
    />
  );
};
