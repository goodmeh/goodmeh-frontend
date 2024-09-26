import { Divider, ScrollArea, Stack, Title } from "@mantine/core";
import { Fragment, useCallback, useEffect, useState } from "react";

import { Place, Review } from "@/types/data";

import { getPlaceReviews } from "../api/getPlaceReviews";
import { ReviewCard } from "./ReviewCard";

type Props = {
  place: Place;
};

export const ReviewSection: React.FC<Props> = ({ place }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(() => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);
    getPlaceReviews(place.id, currentPage + 1).then((response) => {
      setReviews((prev) => [...prev, ...response.data]);
      setCurrentPage(currentPage + 1);
      setHasNextPage(response.has_next);
      setIsLoading(false);
    });
  }, [currentPage, isLoading, hasNextPage, place.id]);

  useEffect(() => {
    loadMore();
    // we want to run this once at the start
    // subsequent calls will be triggered by scrolling
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.id]);

  return (
    <div>
      <Title order={3}>Reviews</Title>
      <ScrollArea onBottomReached={loadMore} h={400}>
        <Stack>
          {reviews.map((review, index) => (
            <Fragment key={review.id}>
              {index !== 0 && <Divider />}
              <ReviewCard review={review} />
            </Fragment>
          ))}
        </Stack>
      </ScrollArea>
    </div>
  );
};
