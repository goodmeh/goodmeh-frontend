import { Card, Skeleton, Space, Tabs } from "@mantine/core";
import React from "react";

export const PlaceCardSkeleton: React.FC = () => (
  <Card radius="md" padding="lg" withBorder flex={1}>
    <Card.Section>
      <Skeleton height={200} width="100%" />
    </Card.Section>
    <Space h="sm" />
    <Skeleton height={28} width="70%" mb={8} />
    <Skeleton height={16} width="40%" mb={4} />
    <Skeleton height={16} width="30%" mb={4} />
    <Skeleton height={16} width="50%" mb={16} />

    <Card.Section mt="xs">
      <Tabs defaultValue="Summary">
        <Tabs.List>
          <Tabs.Tab disabled value="Summary">
            Summary
          </Tabs.Tab>
          <Tabs.Tab disabled value="Gallery">
            Gallery
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Summary" p="md">
          <Skeleton height={16} width="100%" mb={8} />
          <Skeleton height={16} width="90%" mb={8} />
          <Skeleton height={16} width="95%" />
        </Tabs.Panel>
      </Tabs>
    </Card.Section>
  </Card>
);
