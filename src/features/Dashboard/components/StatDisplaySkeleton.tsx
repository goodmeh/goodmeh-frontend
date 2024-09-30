import { Card, Skeleton, Stack } from "@mantine/core";
import React from "react";

export const StatCardSkeleton: React.FC = () => {
  return (
    <Card radius="md" padding="lg" withBorder ta="center">
      <Stack h="100%" justify="center">
        <Skeleton height={28} width="70%" mx="auto" />
        <Skeleton height={75} width={75} mx="auto" mt="md" mb="md" />
        <Skeleton height={24} width="60%" mx="auto" />
      </Stack>
    </Card>
  );
};
