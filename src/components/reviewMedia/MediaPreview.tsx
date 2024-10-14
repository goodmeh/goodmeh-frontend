import { Image } from "@mantine/core";

type Props = {
  mediaUrl: string;
  height?: number | string;
  width?: number | string;
};

export const MediaPreview: React.FC<Props> = ({
  mediaUrl,
  height = 400,
  width = 250,
}) => {
  const isVideo = mediaUrl.startsWith("https://lh3.googleusercontent.com/ggms");

  if (isVideo) {
    return <video src={mediaUrl} controls style={{ height, width }} muted />;
  }

  return <Image loading="lazy" h={height} maw={width} src={mediaUrl} />;
};
