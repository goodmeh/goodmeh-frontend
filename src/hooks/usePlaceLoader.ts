import { useCallback, useEffect, useRef, useState } from "react";

import {
  getPlace,
  RequestPlaceStatusResponse,
} from "@/features/Discover/api/getPlace";
import { Place } from "@/types/data";

type UsePlaceLoaderProps = {
  placeId?: string;
  onPlaceChange?: (place: Place | undefined) => void;
};

export const usePlaceLoader = ({
  placeId,
  onPlaceChange,
}: UsePlaceLoaderProps) => {
  const [place, setPlace] = useState<Place>();
  const [requestStatus, setRequestStatus] =
    useState<RequestPlaceStatusResponse>();
  const refreshInterval = useRef<number>();

  const updatePlace = useCallback(
    (place: Place | undefined) => {
      setPlace(place);
      onPlaceChange?.(place);
    },
    [onPlaceChange],
  );

  const loadPlace = async (placeId: string) => {
    const response = await getPlace(placeId);
    if ("id" in response) {
      updatePlace(response);
      return;
    }
    setRequestStatus(response);
    let refreshCountdown = 10;
    refreshInterval.current = setInterval(() => {
      if (refreshCountdown > 0) {
        refreshCountdown -= 1;
        return;
      }
      clearInterval(refreshInterval.current);
      loadPlace(placeId);
    });
  };

  useEffect(() => {
    if (!placeId) {
      updatePlace(undefined);
      setRequestStatus(undefined);
      return;
    }
    if (place && place.id === placeId) {
      return;
    }
    loadPlace(placeId);
    return () => {
      clearInterval(refreshInterval.current);
      refreshInterval.current = undefined;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- We only want to run this effect when the placeId changes
  }, [placeId]);

  return {
    place,
    requestStatus,
  };
};
