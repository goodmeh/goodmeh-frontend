import { AspectRatio, Card, Skeleton, Space, Tabs, Text } from "@mantine/core";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import React from "react";
import { Link } from "react-router-dom";

import { RatingStars } from "@/components/ui/RatingStars";
import { useViewMode } from "@/hooks/useViewMode";
import { useAppSelector } from "@/stores/store";
import { Place, ScrapeStatus } from "@/types/data";

import { PlaceCardSkeleton } from "./PlaceCardSkeleton";
import { PlaceGallery } from "./PlaceGallery";

type Props = {
  placeId?: string;
  clickable?: boolean;
};

export const PlaceCard: React.FC<Props> = ({ placeId, clickable = false }) => {
  const place = useAppSelector<Place | undefined>(
    (state) => state.places[placeId ?? ""],
  );

  if (!place) return <PlaceCardSkeleton />;

  return (
    <Card radius="md" padding="lg" withBorder flex={1}>
      {place.image_url && (
        <Card.Section>
          <AspectRatio ratio={12 / 5}>
            <img
              src={place.image_url}
              alt={place.name}
              referrerPolicy="no-referrer"
            />
          </AspectRatio>
        </Card.Section>
      )}
      <Space h="sm" />
      <Text size="xl" fw="bold">
        {clickable ? (
          <Link to={`/?place1Id=${place.id}`}>{place.name}</Link>
        ) : (
          place.name
        )}
      </Text>

      {place.user_rating_count > 0 && (
        <Text size="sm" c="dimmed">
          {place.rating.toFixed(1)} <RatingStars rating={place.rating} /> (
          {place.user_rating_count})
        </Text>
      )}

      <Text size="sm" c="dimmed">
        {place.primary_type}
      </Text>
      <Text size="sm" c="dimmed">
        Last updated: {format(place.last_scraped, "d MMM yyyy, hh:mm a")}
      </Text>

      {place.user_rating_count > 0 && (
        <>
          <Card.Section mt="xs">
            <Tabs defaultValue="Summary">
              <Tabs.List>
                <Tabs.Tab value="Summary">Summary</Tabs.Tab>
                <Tabs.Tab value="Gallery">Gallery</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="Summary" p="md">
                <PlaceSummary place={place} />
              </Tabs.Panel>

              <Tabs.Panel value="Gallery" p="md">
                <PlaceGallery placeId={place.id} />
              </Tabs.Panel>
            </Tabs>
          </Card.Section>
        </>
      )}
    </Card>
  );
};

const PlaceSummary: React.FC<{ place: Place }> = ({ place }) => {
  const { viewMode } = useViewMode();
  const summaryToShow =
    viewMode == "consumer" ? place.summary : place.business_summary;
  const isSummaryLoading =
    place.status == ScrapeStatus.ANALYSING ||
    place.status == ScrapeStatus.SUMMARIZING;

  return summaryToShow ? (
    <Text size="sm">
      <Markdown>{summaryToShow}</Markdown>
    </Text>
  ) : isSummaryLoading ? (
    <div>
      <Skeleton height={16} width="100%" mb={8} />
      <Skeleton height={16} width="90%" mb={8} />
      <Skeleton height={16} width="95%" />
    </div>
  ) : (
    <div>No summary available</div>
  );
};
