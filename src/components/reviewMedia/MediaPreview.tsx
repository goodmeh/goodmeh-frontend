import { Center, Image, Overlay } from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";

type Props = {
  mediaUrl: string;
  height?: number | string;
  width?: number | string;
  onClick?: () => void;
  showVideoControls?: boolean;
};

export const MediaPreview: React.FC<Props> = ({
  mediaUrl,
  height = 400,
  width = 250,
  onClick,
  showVideoControls = false,
}) => {
  const isVideo = mediaUrl.startsWith("https://lh3.googleusercontent.com/ggms");
  const cursor = onClick ? "pointer" : "default";

  if (isVideo) {
    return (
      <div style={{ position: "relative", cursor }} onClick={onClick}>
        {!showVideoControls && (
          <Overlay backgroundOpacity={0}>
            <Center h="100%">
              <IconPlayerPlay color="white" />
            </Center>
          </Overlay>
        )}
        <video
          src={mediaUrl}
          controls={showVideoControls}
          style={{ height, width }}
          muted
        />
      </div>
    );
  }

  return (
    <Image
      loading="lazy"
      h={height}
      maw={width}
      src={mediaUrl}
      onClick={onClick}
      style={{ cursor }}
    />
  );
};
