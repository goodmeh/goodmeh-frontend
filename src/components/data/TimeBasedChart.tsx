import { LineChart } from "@mantine/charts";

const data = [
  {
    date: "Jan",
    Rating: 4.5,
  },
  {
    date: "Feb",
    Rating: 4.9,
  },
  {
    date: "Mar",
    Rating: 2,
  },
  {
    date: "Apr",
    Rating: 3.8,
  },
  {
    date: "May",
    Rating: 4.2,
  },
  {
    date: "Jun",
    Rating: 4.9,
  },
  {
    date: "Jul",
    Rating: 3.1,
  },
  {
    date: "Aug",
    Rating: 2.9,
  },
  {
    date: "Sep",
    Rating: 1.9,
  },
  {
    date: "Oct",
    Rating: 3.3,
  },
  {
    date: "Nov",
    Rating: 4.4,
  },
  {
    date: "Dec",
    Rating: 4.2,
  },
];

export const TimeBasedChart: React.FC = () => {
  return (
    <LineChart
      h={300}
      data={data}
      dataKey="date"
      series={[{ name: "Rating", color: "indigo.6" }]}
      curveType="monotone"
      tickLine="x"
      withPointLabels
      strokeDasharray="15 15"
    />
  );
};
