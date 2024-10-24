import { AspectRatio, Card, Skeleton } from "@mantine/core";
import React from "react";

export const PlacePreviewCardSkeleton: React.FC = () => (
  <Card radius="md" padding="md" withBorder>
    <Card.Section>
      <AspectRatio ratio={4 / 3}>
        <Skeleton height="100%" />
      </AspectRatio>
    </Card.Section>
    <Skeleton height={24} width="70%" mb={8} mt="md" />
    <Skeleton height={16} width="40%" mb={4} />
    <Skeleton height={16} width="60%" mb={4} />
    <Skeleton height={16} width="50%" />
  </Card>
);
