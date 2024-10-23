import { Box, Group, Skeleton, Space } from "@mantine/core";
import React from "react";

export const ReviewDetailsSkeleton: React.FC = () => (
  <Box>
    <Group mb="xs">
      <Skeleton height={40} circle />
      <div>
        <Skeleton height={18} width={120} mb={6} />
        <Skeleton height={14} width={180} />
      </div>
    </Group>
    <Group>
      <Skeleton height={20} width={100} />
      <Skeleton height={14} width={80} />
    </Group>

    <Group align="start" wrap="nowrap" mt="md">
      <Box flex={3}>
        <Skeleton height={16} width="100%" mb={8} />
        <Skeleton height={16} width="95%" mb={8} />
        <Skeleton height={16} width="90%" mb={8} />
        <Skeleton height={16} width="98%" />
      </Box>

      <Box flex={1}>
        <Skeleton height={80} width="100%" mb="md" />
        <Skeleton height={14} width={80} mb={6} />
        <Skeleton height={8} width="100%" />
      </Box>
    </Group>

    <Space h="md" />
    <Group>
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} height={60} width={60} />
      ))}
    </Group>
  </Box>
);
