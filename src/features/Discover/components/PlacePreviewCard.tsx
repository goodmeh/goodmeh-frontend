import { AspectRatio, Card, Space, Text } from "@mantine/core";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";

import { RatingStars } from "@/components/ui/RatingStars";
import { PlacePreviewResponse } from "@/features/Discover/api/discoverPlaces";

import classes from "./PlacePreviewCard.module.scss";

type Props = {
  place: PlacePreviewResponse;
};

export const PlacePreviewCard: React.FC<Props> = ({ place }) => {
  return (
    <Card
      radius="md"
      padding="md"
      withBorder
      component={Link}
      to={`/?place1Id=${place.id}`}
      className={classes.PlacePreviewCard}
    >
      {place.image_url && (
        <Card.Section>
          <AspectRatio ratio={4 / 3}>
            <img
              src={place.image_url}
              alt={place.name}
              referrerPolicy="no-referrer"
            />
          </AspectRatio>
        </Card.Section>
      )}
      <Space h={4} />
      <Text size="lg" fw="bold" lineClamp={1}>
        {place.name}
      </Text>
      <Text size="sm" c="dimmed">
        {place.rating.toFixed(1)} <RatingStars rating={place.rating} /> (
        {place.user_rating_count})
      </Text>
      <Text size="sm" c="dimmed" lineClamp={1}>
        {place.primary_type}
      </Text>
      <Text size="sm" c="dimmed">
        Last updated: {format(place.last_scraped, "d MMM yyyy")}
      </Text>
    </Card>
  );
};
