import {
  Card,
  Image,
  ScrollArea,
  SimpleGrid,
  Space,
  Tabs,
  Text,
} from "@mantine/core";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

import { PartialStar } from "@/components/ui/PartialStar";
import { Place } from "@/types/data";

import { getMockPlaceImages } from "../api/getPlaceImages";

type Props = {
  place: Place;
};

export const PlaceCard: React.FC<Props> = ({ place }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getMockPlaceImages(place.id).then(setImages);
  }, [place.id]);

  return (
    <Card radius="md" padding="lg" withBorder>
      {place.imageUrl && (
        <Card.Section>
          <Image src={place.imageUrl} alt={place.name} mah={200} mih={100} />
        </Card.Section>
      )}
      <Space h="sm" />
      <Text size="xl" fw="bold">
        {place.name}
      </Text>
      <Text size="sm" c="dimmed">
        {place.rating.toFixed(1)}{" "}
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

      <Card.Section mt="xs">
        <Tabs defaultValue="Summary">
          <Tabs.List>
            <Tabs.Tab value="Summary">Summary</Tabs.Tab>
            <Tabs.Tab value="Gallery">Gallery</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="Summary" p="md">
            <Text size="sm">{place.summary}</Text>
          </Tabs.Panel>

          <Tabs.Panel value="Gallery" p="md">
            <ScrollArea type="always" h={300}>
              <SimpleGrid cols={3}>
                {images.map((image) => (
                  <Image
                    h="100%"
                    w="100%"
                    src={image}
                    alt={place.name}
                    key={image}
                    referrerPolicy="no-referrer"
                    fit="cover"
                  />
                ))}
              </SimpleGrid>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Card.Section>
    </Card>
  );
};
