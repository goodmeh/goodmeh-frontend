import { useEffect, useMemo, useRef, useState } from "react";

import {
  getPlace,
  RequestPlaceStatusResponse,
} from "@/features/Discover/api/getPlace";
import { PlaceActions } from "@/stores/places";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { Place, ScrapeStatus } from "@/types/data";

type UsePlaceLoaderProps = {
  placeId?: string;
};

export const usePlaceLoader = ({ placeId }: UsePlaceLoaderProps) => {
  const places = useAppSelector((state) => state.places);
  const dispatch = useAppDispatch();
  const place = useMemo<Place | undefined>(
    () => places[placeId ?? ""],
    [placeId, places],
  );
  const [requestStatus, setRequestStatus] =
    useState<RequestPlaceStatusResponse>();
  const refreshInterval = useRef<number>();
  const [isLoading, setIsLoading] = useState(false);

  const loadPlace = async (placeId: string) => {
    if (places[placeId]) {
      return;
    }
    setIsLoading(true);
    const response = await getPlace(placeId);
    if ("id" in response) {
      dispatch(PlaceActions.addPlace(response));
      setIsLoading(false);
    } else {
      setRequestStatus(response);
    }
    // If no status or the status is summarizing individual reviews
    // means the place will no longer be updated
    if (
      !response.status ||
      response.status === ScrapeStatus.SUMMARIZING_INDIVIDUAL_REVIEWS ||
      ("failed" in response && response.failed)
    ) {
      return;
    }
    let refreshCountdown = 10;
    refreshInterval.current = setInterval(() => {
      if (refreshCountdown > 0) {
        refreshCountdown -= 1;
        return;
      }
      clearInterval(refreshInterval.current);
      loadPlace(placeId);
    }, 1000);
  };

  useEffect(() => {
    if (!placeId) {
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
    isLoading,
  };
};
