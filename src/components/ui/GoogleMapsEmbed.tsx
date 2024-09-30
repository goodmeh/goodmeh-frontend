import { Skeleton } from "@mantine/core";
import clsx from "clsx";
import React, { useMemo } from "react";

type Props = {
  placeId: string;
  style?: React.CSSProperties | null;
  className?: clsx.ClassValue;
};

export const GoogleMapsEmbed: React.FC<Props> = ({
  placeId,
  className,
  style,
}) => {
  const computedStyle = useMemo(() => {
    if (style === null) {
      return {};
    }
    const { border, width, height, ...rest } = style ?? {};
    return {
      border: border ?? 0,
      width: width ?? "100%",
      height: height ?? "100%",
      ...rest,
    };
  }, [style]);

  if (!placeId) {
    return (
      <Skeleton className={clsx(className)} style={computedStyle} mih={100} />
    );
  }

  return (
    <iframe
      className={clsx(className)}
      style={computedStyle}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_MAPS_API_KEY}
    &q=place_id:${placeId}`}
    ></iframe>
  );
};
