import { SimpleGrid } from "@mantine/core";

import { Place } from "@/types/data";

import { StatCard } from "./StatCard";
import { StatCardSkeleton } from "./StatDisplaySkeleton";

type Props = {
  place: Place | undefined;
};

export const StatDisplay: React.FC<Props> = ({ place }) => {
  if (!place)
    return (
      <SimpleGrid cols={3}>
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </SimpleGrid>
    );

  const data = [
    {
      title: "How good?",
      caption: place.weighted_rating.toFixed(1),
      render: () => (
        <div
          style={{
            transform: `rotate(${180 * (1 - (place.weighted_rating - 1) / 4)}deg)`,
          }}
        >
          👍
        </div>
      ),
    },
    { title: "How much?", caption: place.price_range, render: () => "💸" },
    {
      title: "How long?",
      caption: place.earliest_review_date,
      render: () => "🗓️",
    },
  ];
  const stats = data.map((stat) => {
    return (
      <StatCard key={stat.title} title={stat.title} caption={stat.caption}>
        {stat.render()}
      </StatCard>
    );
  });

  return <SimpleGrid cols={3}>{stats}</SimpleGrid>;
};
