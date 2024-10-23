import {
  Avatar,
  Blockquote,
  Button,
  Group,
  Progress,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconSparkles } from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";
import Markdown from "markdown-to-jsx";
import pluralize from "pluralize";
import { useMemo } from "react";

import { RatingStars } from "@/components/ui/RatingStars";
import { useViewMode } from "@/hooks/useViewMode";
import { Review } from "@/types/data";

import { ReviewGallery } from "./ReviewGallery";

type Props = {
  review: Review;
};

export const ReviewDetails: React.FC<Props> = ({ review }) => {
  const { viewMode } = useViewMode();
  const userSubtext = useMemo(() => {
    const parts: string[] = [];
    if (review.user.is_local_guide) {
      parts.push("Local Guide");
    }
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
  const summaryToDisplay = useMemo(
    () => (viewMode == "business" ? review.business_summary : review.summary),
    [viewMode, review],
  );
  const [showSummary, { toggle: toggleShowSummary }] = useDisclosure(true);

  return (
    <Stack gap="md">
      <Group>
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
          {formatDistanceToNow(review.created_at, { addSuffix: true })}
        </Text>
      </Group>

      <Group>
        <div>
          <Text size="xs">Review Helpfulness</Text>
          <Progress w={200} value={review.weight / 10}></Progress>
        </div>
        {summaryToDisplay && (
          <>
            <Space flex={1} />
            <Button variant="transparent" onClick={toggleShowSummary} p={0}>
              {showSummary ? "Show Original" : "Show Summary"}
            </Button>
          </>
        )}
      </Group>

      {summaryToDisplay && showSummary ? (
        <div>
          <Text c="dimmed">
            <IconSparkles style={{ verticalAlign: "middle", marginRight: 4 }} />{" "}
            Summarised by AI
          </Text>
          <Markdown options={{ wrapper: "div" }}>{summaryToDisplay}</Markdown>
        </div>
      ) : (
        <Text style={{ whiteSpace: "pre-line" }}>{review.text}</Text>
      )}

      <ReviewGallery imageUrls={review.image_urls} />

      {review.reply && (
        <Blockquote py="md">
          <span>
            <Text component="b" fw={700}>
              Response from the owner
            </Text>
            <Text
              style={{ whiteSpace: "pre-line" }}
              component="span"
              c="dimmed"
              ml="md"
            >
              {formatDistanceToNow(review.reply.created_at, {
                addSuffix: true,
              })}
            </Text>
          </span>
          <Text>{review.reply.text}</Text>
        </Blockquote>
      )}
    </Stack>
  );
};
