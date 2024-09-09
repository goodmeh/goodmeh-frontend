import { Place } from "@/types/data";
import { Card, Image, Space, Text } from "@mantine/core";
import { format } from "date-fns";
import React from "react";
import classes from "./Places.module.scss";

type Props = {
  place: Place;
};

const PartialStar: React.FC<{ fill: number }> = ({ fill }) => {
  const fillPercentage = Math.min(fill * 100, 100);
  return (
    <span
      className={classes.PlaceOverview__Star}
      style={{
        backgroundImage: `linear-gradient(
          90deg,
          var(--mantine-color-yellow-7),
          var(--mantine-color-yellow-7) ${fillPercentage}%,
          var(--mantine-color-dimmed) ${fillPercentage}%
        )`,
      }}
    >
      ★
    </span>
  );
};

export const PlaceCard: React.FC<Props> = ({ place }) => {
  return (
    <Card radius="md" shadow="xs" padding="lg" withBorder>
      {place.imageUrl && (
        <Card.Section>
          <Image src={place.imageUrl} alt={place.name} mah={300} mih={200} />
        </Card.Section>
      )}
      <Space h="sm" />
      <Text size="xl" fw="bold">
        {place.name}
      </Text>
      <Text size="sm" c="dimmed">
        {place.weightedRating.toFixed(1) != place.rating.toFixed(1) && (
          <s>{place.rating.toFixed(1)}</s>
        )}{" "}
        {place.weightedRating.toFixed(1)}{" "}
        {Array.from({ length: Math.ceil(place.weightedRating) }).map((_, i) => (
          <PartialStar fill={place.weightedRating - i} key={i} />
        ))}{" "}
        ({place.userRatingCount})
      </Text>
      <Text size="sm" c="dimmed">
        {place.primaryType}
      </Text>
      <Text size="sm" c="dimmed">
        Last updated: {format(place.lastUpdated, "d MMM yyyy, hh:mm a")}
      </Text>
      <Text mt="md">{place.summary}</Text>
    </Card>
  );
};
