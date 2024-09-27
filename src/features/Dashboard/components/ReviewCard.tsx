import { Avatar, Box, Group, Image, SimpleGrid, Text } from "@mantine/core";
import { formatRelative } from "date-fns";
import pluralize from "pluralize";
import { useMemo } from "react";

import { RatingStars } from "@/components/ui/RatingStars";
import { Review } from "@/types/data";

type Props = {
  review: Review;
};

export const ReviewCard: React.FC<Props> = ({ review }) => {
  const userSubtext = useMemo(() => {
    const parts: string[] = [];
    if (review.user.review_count > 0) {
      parts.push(
        `${review.user.review_count} ${pluralize("review", review.user.review_count)}`,
      );
    }
    if (review.user.photo_count > 0) {
      parts.push(
        `${review.user.photo_count} ${pluralize("photo", review.user.photo_count)}`,
      );
    }

    return parts.join(" \u00b7 ");
  }, [review]);
  return (
    <Box>
      <Group mb="xs">
        <Avatar
          src={review.user.photo_uri}
          radius={0}
          imageProps={{ referrerPolicy: "no-referrer" }}
        />
        <div>
          <Text>{review.user.name}</Text>
          <Text size="sm" c="dimmed">
            {userSubtext}
          </Text>
        </div>
      </Group>
      <Group>
        <RatingStars rating={review.rating} />
        <Text size="sm" c="dimmed">
          {formatRelative(review.created_at, new Date())}
        </Text>
      </Group>
      <Text style={{ whiteSpace: "pre-line" }}>{review.text}</Text>

      {review.image_urls.length > 0 && (
        <Group mt="sm" gap="xs">
          {review.image_urls.map((imageUrl) => (
            <Image
              h={400}
              maw={250}
              src={imageUrl}
              key={imageUrl}
              referrerPolicy="no-referrer"
            />
          ))}
        </Group>
      )}
    </Box>
  );
};
