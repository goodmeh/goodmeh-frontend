import { SimpleGrid } from "@mantine/core";

import { StatCard } from "./StatCard";

const data = [
  {
    title: "How good?",
    caption: "3.9",
    render: () => (
      <div style={{ transform: `rotate(${180 * (1 - 3.9 / 5)}deg)` }}>👍</div>
    ),
  },
  { title: "How accurate?", caption: "70% of all reviews", render: () => "🤷‍♂️" },
  { title: "How much?", caption: "$10-20 per person", render: () => "💸" },
  { title: "How long?", caption: "3 years", render: () => "🗓️" },
];

export const StatDisplay: React.FC = () => {
  const stats = data.map((stat) => {
    return (
      <StatCard key={stat.title} title={stat.title} caption={stat.caption}>
        {stat.render()}
      </StatCard>
    );
  });

  return <SimpleGrid cols={2}>{stats}</SimpleGrid>;
};
