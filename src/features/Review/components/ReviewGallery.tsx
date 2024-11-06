import "./ReviewGallery.module.scss";

import { Carousel } from "@mantine/carousel";
import {
  Box,
  Center,
  Group,
  Modal,
  Overlay,
  SimpleGrid,
  Text,
  useMantineTheme,
  useMatches,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";

import { MediaPreview } from "@/components/reviewMedia/MediaPreview";

type MediaModalProps = {
  imageUrls: string[];
  opened: boolean;
  onClose: () => void;
  initialSlide?: number;
};

const MediaModal = ({
  imageUrls,
  opened,
  onClose,
  initialSlide,
}: MediaModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title="Review Media"
      styles={{
        body: { padding: 0, height: "auto" },
      }}
      w={400}
    >
      <Carousel
        loop
        withIndicators
        px="xl"
        pb="xl"
        initialSlide={initialSlide}
        withKeyboardEvents
      >
        {imageUrls.map((imageUrl) => (
          <Carousel.Slide key={imageUrl} bg="black">
            <Center h="100%">
              <MediaPreview
                showVideoControls
                mediaUrl={imageUrl}
                height="auto"
                width="100%"
              />
            </Center>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Modal>
  );
};

type Props = {
  imageUrls: string[];
};

export const ReviewGallery: React.FC<Props> = ({ imageUrls }) => {
  const theme = useMantineTheme();
  const numImagesToDisplay = useMatches({
    base: 2,
    xs: 3,
    sm: 3,
  });
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const [initialSlide, setInitialSlide] = useState<number>();
  const onClickImage = (index: number) => {
    setInitialSlide(index);
    open();
  };

  const displayedImages = useMemo(
    () => imageUrls.slice(0, numImagesToDisplay),
    [imageUrls, numImagesToDisplay],
  );
  const [isModalOpen, { open, close }] = useDisclosure();
  const modal = (
    <MediaModal
      imageUrls={imageUrls}
      opened={isModalOpen}
      onClose={close}
      initialSlide={initialSlide}
    />
  );

  if (imageUrls.length == 0) {
    return null;
  }

  const LastImageOverlay = ({ isLastImage }: { isLastImage: boolean }) =>
    isLastImage &&
    imageUrls.length > numImagesToDisplay && (
      <Overlay style={{ pointerEvents: "none" }}>
        <Center h="100%">
          <Text size="xxl" fw="bold">
            +{imageUrls.length - numImagesToDisplay}
          </Text>
        </Center>
      </Overlay>
    );

  if (isMobile) {
    return (
      <>
        {modal}
        <SimpleGrid cols={numImagesToDisplay} spacing="xs">
          {displayedImages.map((imageUrl, index) => (
            <Box pos="relative" key={imageUrl}>
              <MediaPreview
                height={200}
                width="100%"
                mediaUrl={imageUrl}
                onClick={() => onClickImage(index)}
              />
              <LastImageOverlay isLastImage={index == numImagesToDisplay - 1} />
            </Box>
          ))}
        </SimpleGrid>
      </>
    );
  }

  return (
    <>
      {modal}
      <Group gap="xs">
        {displayedImages.map((imageUrl, index) => (
          <Box pos="relative" key={imageUrl}>
            <MediaPreview
              height={200}
              width="auto"
              mediaUrl={imageUrl}
              onClick={() => onClickImage(index)}
            />
            <LastImageOverlay isLastImage={index == numImagesToDisplay - 1} />
          </Box>
        ))}
      </Group>
    </>
  );
};
