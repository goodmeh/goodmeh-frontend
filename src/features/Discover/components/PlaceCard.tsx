import { Card, Image, Space, Tabs, Text } from "@mantine/core";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import React from "react";

import { RatingStars } from "@/components/ui/RatingStars";
import { useViewMode } from "@/hooks/useViewMode";
import { Place } from "@/types/data";

import { PlaceGallery } from "./PlaceGallery";

type Props = {
  place: Place;
};

export const PlaceCard: React.FC<Props> = ({ place }) => {
  const { viewMode } = useViewMode();

  return (
    <Card radius="md" padding="lg" withBorder flex={1}>
      {place.image_url && (
        <Card.Section>
          <Image
            src={place.image_url}
            alt={place.name}
            mah={200}
            mih={100}
            referrerPolicy="no-referrer"
          />
        </Card.Section>
      )}
      <Space h="sm" />
      <Text size="xl" fw="bold">
        {place.name}
      </Text>
      <Text size="sm" c="dimmed">
        {place.rating.toFixed(1)} <RatingStars rating={place.rating} /> (
        {place.user_rating_count})
      </Text>
      <Text size="sm" c="dimmed">
        {place.primary_type}
      </Text>
      <Text size="sm" c="dimmed">
        Last updated: {format(place.last_scraped, "d MMM yyyy, hh:mm a")}
      </Text>

      <Card.Section mt="xs">
        <Tabs defaultValue="Summary">
          <Tabs.List>
            <Tabs.Tab value="Summary">Summary</Tabs.Tab>
            <Tabs.Tab value="Gallery">Gallery</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Summary" p="md">
            <Text size="sm">
              <Markdown>
                {viewMode == "consumer"
                  ? place.summary
                  : place.business_summary || ""}
              </Markdown>
            </Text>
          </Tabs.Panel>

          <Tabs.Panel value="Gallery" p="md">
            <PlaceGallery placeId={place.id} />
          </Tabs.Panel>
        </Tabs>
      </Card.Section>
    </Card>
  );
};
