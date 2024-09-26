import { Box, Space, Stack, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import {
  getPlace,
  RequestPlaceStatusResponse,
} from "@/features/Dashboard/api/getPlace";
import { PlaceCard } from "@/features/Dashboard/components/PlaceCard";
import { Place } from "@/types/data";

import { PlacesAutocompleteField } from "./PlacesAutocompleteField";

type Props = {
  onPlaceChange?: (place: Place | undefined) => void;
  children?: React.FC<{ placeCard: React.ReactNode; place: Place }>;
};

export const PlaceSearch: React.FC<Props> = ({
  onPlaceChange,
  children = ({ placeCard }) => placeCard,
}) => {
  const [location, setLocation] =
    useState<google.maps.places.AutocompletePrediction>();
  const [place, setPlace] = useState<Place>();
  const [requestStatus, setRequestStatus] =
    useState<RequestPlaceStatusResponse>();
  const [refreshCountdown, setRefreshCountdown] = useState(0);

  const loadLocation = useCallback(() => {
    if (!location) {
      return;
    }

    let timeout: number;

    getPlace(location.place_id).then((response) => {
      if ("status" in response) {
        setRequestStatus(response);
        setPlace(undefined);
        onPlaceChange?.(undefined);
        if (response.failed) {
          return;
        }
        setRefreshCountdown(10);
        timeout = setTimeout(() => {
          setRefreshCountdown((countdown) => countdown - 1);
        }, 1000);
        return;
      }
      setPlace(response);
      onPlaceChange?.(response);
    });

    return () => clearTimeout(timeout);
  }, [location, onPlaceChange]);

  // When location changes, load data
  useEffect(() => {
    return loadLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this effect when the location changes
  }, [location]);

  // When countdown reaches 0, load data. Otherwise, decrement countdown every second.
  useEffect(() => {
    if (refreshCountdown <= 0) {
      return loadLocation();
    }
    const timeout = setTimeout(() => {
      setRefreshCountdown((countdown) => countdown - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [refreshCountdown, loadLocation]);

  const ChildComponent = children;

  return (
    <Stack>
      <PlacesAutocompleteField
        placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
        onSelectSuggestion={setLocation}
      />
      <Space h="md" />
      {place ? (
        <ChildComponent placeCard={<PlaceCard place={place} />} place={place} />
      ) : requestStatus && location ? (
        <Text>
          {requestStatus.failed ? (
            <>
              Our servers are still {requestStatus.status.toLowerCase()} data
              for {location.description}! Please try again later.
            </>
          ) : (
            <>
              Our servers are still {requestStatus.status.toLowerCase()} data
              for {location.description}! Refreshing
              {refreshCountdown > 0 ? ` in ${refreshCountdown} seconds` : ""}...
            </>
          )}
        </Text>
      ) : null}
    </Stack>
  );
};
