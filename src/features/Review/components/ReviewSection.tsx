import { Button, Card, Divider, ScrollArea, Stack } from "@mantine/core";
import { cloneDeep } from "es-toolkit";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Place, Review } from "@/types/data";

import { getPlaceReviews } from "../api/getPlaceReviews";
import { ReviewDetails } from "./ReviewDetails";
import { ReviewDetailsSkeleton } from "./ReviewDetailsSkeleton";

type Props = {
  place: Place | undefined;
};

const sectionHeight =
  "calc(100dvh - 45px - var(--app-shell-header-offset, 0rem) - var(--app-shell-padding) - var(--app-shell-footer-offset, 0rem) - var(--app-shell-padding))";

export const ReviewSection: React.FC<Props> = ({ place }) => {
  const [reviews, setReviews] = useState<Review[][]>([]);
  const flattenedReviews = useMemo(() => reviews.flat(), [reviews]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollarea = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasNextPage || !place?.id) return;
    setIsLoading(true);
    getPlaceReviews(place.id, currentPage + 1).then((response) => {
      setReviews((prev) => {
        const newReviews = cloneDeep(prev);
        newReviews[currentPage] = response.data;
        return newReviews;
      });
      setCurrentPage(currentPage + 1);
      setHasNextPage(response.has_next);
      setIsLoading(false);
    });
  }, [currentPage, isLoading, hasNextPage, place?.id]);

  useEffect(() => {
    setReviews([]);
    setHasNextPage(true);
    setCurrentPage(0);
    if (!place?.id) return;
    scrollarea.current?.scrollTo({ top: 0 });
    loadMore();
    // we want to run this once at the start
    // subsequent calls will be triggered by scrolling
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place?.id]);

  return (
    <Stack mah={sectionHeight}>
      <Card p={0} withBorder>
        <ScrollArea.Autosize
          onBottomReached={loadMore}
          viewportRef={scrollarea}
          p="md"
          pr="xs"
        >
          <Stack pr="lg">
            {flattenedReviews.map((review, index) => (
              <Fragment key={review.id}>
                {index !== 0 && <Divider />}
                <ReviewDetails review={review} />
              </Fragment>
            ))}
            {(isLoading || !place) &&
              Array.from({ length: 3 }).map((_, index) => (
                <Fragment key={index}>
                  {index !== 0 && <Divider />}
                  <ReviewDetailsSkeleton />
                </Fragment>
              ))}
            {hasNextPage && (
              <Button loading={isLoading} onClick={loadMore} variant="subtle">
                Load more
              </Button>
            )}
          </Stack>
        </ScrollArea.Autosize>
      </Card>
    </Stack>
  );
};
