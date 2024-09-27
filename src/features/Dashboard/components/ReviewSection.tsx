import { Box, Divider, ScrollArea, Stack, Title } from "@mantine/core";
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
import { ReviewCard } from "./ReviewCard";

type Props = {
  place: Place;
};

const sectionHeight =
  "calc(100vh - var(--app-shell-header-offset, 0rem) - var(--app-shell-padding) - var(--app-shell-footer-offset, 0rem) - var(--app-shell-padding))";

export const ReviewSection: React.FC<Props> = ({ place }) => {
  const [reviews, setReviews] = useState<Review[][]>([]);
  const flattenedReviews = useMemo(() => reviews.flat(), [reviews]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollarea = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (isLoading || !hasNextPage) return;
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
  }, [currentPage, isLoading, hasNextPage, place.id]);

  useEffect(() => {
    scrollarea.current?.scrollTo({ top: 0 });
    loadMore();
    // we want to run this once at the start
    // subsequent calls will be triggered by scrolling
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.id]);

  return (
    <Stack mah={sectionHeight}>
      <Title order={3}>Reviews</Title>
      <ScrollArea.Autosize onBottomReached={loadMore} viewportRef={scrollarea}>
        <Stack>
          {flattenedReviews.map((review, index) => (
            <Fragment key={review.id}>
              {index !== 0 && <Divider />}
              <ReviewCard review={review} />
            </Fragment>
          ))}
        </Stack>
      </ScrollArea.Autosize>
    </Stack>
  );
};
