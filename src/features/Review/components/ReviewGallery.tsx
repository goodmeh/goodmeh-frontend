import { Box, Center, Group, Text } from "@mantine/core";
import { useMemo, useState } from "react";

import { MediaPreview } from "@/components/reviewMedia/MediaPreview";

import classes from "./ReviewGallery.module.scss";

type Props = {
  imageUrls: string[];
};

const MAX_DISPLAY_IMAGES = 4;

export const ReviewGallery: React.FC<Props> = ({ imageUrls }) => {
  const [isShowingAllImages, setIsShowingAllImages] = useState(false);
  const displayedImages = useMemo(
    () =>
      isShowingAllImages ? imageUrls : imageUrls.slice(0, MAX_DISPLAY_IMAGES),
    [isShowingAllImages, imageUrls],
  );

  if (imageUrls.length == 0) {
    return null;
  }

  const LastImageOverlay = ({ isLastImage }: { isLastImage: boolean }) =>
    isLastImage &&
    imageUrls.length > MAX_DISPLAY_IMAGES &&
    !isShowingAllImages && (
      <Center
        className={classes.ReviewGallery__LastImageOverlay}
        onClick={() => setIsShowingAllImages(true)}
      >
        <Text size="xxl" fw="bold">
          +{imageUrls.length - MAX_DISPLAY_IMAGES}
        </Text>
      </Center>
    );

  return (
    <Group mt="sm" gap="xs">
      {displayedImages.map((imageUrl, index) => (
        <Box pos="relative" key={imageUrl}>
          <MediaPreview mediaUrl={imageUrl} />
          <LastImageOverlay isLastImage={index == MAX_DISPLAY_IMAGES - 1} />
        </Box>
      ))}
    </Group>
  );
};
