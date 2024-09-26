import { Avatar, Box, Group, Space, Stack, Text } from "@mantine/core";
import { formatRelative } from "date-fns";

import { PartialStar } from "@/components/ui/PartialStar";
import { Review } from "@/types/data";

type Props = {
  review: Review;
};

export const ReviewCard: React.FC<Props> = ({ review }) => {
  return (
    <Box>
      <Group mb="xs">
        <Avatar src={review.user.photo_uri} radius={0} />
        <div>
          <Text>{review.user.name}</Text>
          <Text size="sm" c="dimmed">
            {review.user.review_count} review
            {review.user.review_count > 1 && "s"} &bull;{" "}
            {review.user.photo_count} photo
            {review.user.photo_count > 1 && "s"}
          </Text>
        </div>
      </Group>
      <Group>
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <PartialStar fill={review.rating < i ? 0 : 1} key={i} />
          ))}{" "}
        </div>
        <Text size="sm" c="dimmed">
          {formatRelative(review.created_at, new Date())}
        </Text>
      </Group>
      <Text>{review.text}</Text>
    </Box>
  );
};
