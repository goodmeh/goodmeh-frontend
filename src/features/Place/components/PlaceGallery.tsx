import { Button, ScrollArea, SimpleGrid } from "@mantine/core";
import { cloneDeep } from "es-toolkit";
import { useCallback, useEffect, useMemo, useState } from "react";

import { MediaPreview } from "@/components/reviewMedia/MediaPreview";

import { getPlaceImages } from "../api/getPlaceImages";

type Props = {
  placeId: string;
};

export const PlaceGallery: React.FC<Props> = ({ placeId }) => {
  const [images, setImages] = useState<string[][]>([]);
  const flattenedImages = useMemo(() => images.flat(), [images]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadImages = useCallback(() => {
    if (isLoading || !hasNextPage) return;
    setIsLoading(true);
    getPlaceImages(placeId, currentPage + 1).then((response) => {
      setImages((prev) => {
        const newReviews = cloneDeep(prev);
        newReviews[currentPage] = response.data;
        return newReviews;
      });
      setCurrentPage(currentPage + 1);
      setHasNextPage(response.has_next);
      setIsLoading(false);
    });
  }, [currentPage, hasNextPage, isLoading, placeId]);

  useEffect(() => {
    setImages([]);
    setHasNextPage(false);
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this when placeId changes
  }, [placeId]);

  return (
    <ScrollArea type="always" h={300} onBottomReached={loadImages}>
      <SimpleGrid cols={3}>
        {flattenedImages.map((image) => (
          <MediaPreview
            key={image}
            mediaUrl={image}
            height="100%"
            width="100%"
          />
        ))}
      </SimpleGrid>
      {hasNextPage && (
        <Button
          w="100%"
          loading={isLoading}
          onClick={loadImages}
          variant="subtle"
        >
          Load more
        </Button>
      )}
    </ScrollArea>
  );
};
