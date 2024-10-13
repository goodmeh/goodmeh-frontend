import { Stack, Text } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";

import {
  getPlace,
  RequestPlaceStatusResponse,
} from "@/features/Discover/api/getPlace";
import { PlaceCard } from "@/features/Discover/components/PlaceCard";
import { PlaceCardSkeleton } from "@/features/Discover/components/PlaceCardSkeleton";
import { Place } from "@/types/data";

import { PlacesAutocompleteField } from "./PlacesAutocompleteField";

type ChildProps = {
  placeCard: React.ReactNode;
  place: Place | undefined;
  location: google.maps.places.AutocompletePrediction;
};

type Props = {
  onPlaceChange?: (place: Place | undefined) => void;
  children?: React.FC<ChildProps>;
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
    setPlace(undefined);
    onPlaceChange?.(undefined);
    setRequestStatus(undefined);
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
      } else {
        setPlace(response);
        onPlaceChange?.(response);
        setRequestStatus(undefined);
      }
      if (!("status" in response) && response.summary) {
        return;
      }
      setRefreshCountdown(10);
      timeout = setTimeout(() => {
        setRefreshCountdown((countdown) => countdown - 1);
      }, 1000);
      return;
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
  const placeCard = place ? <PlaceCard place={place} /> : <PlaceCardSkeleton />;

  return (
    <Stack>
      <PlacesAutocompleteField
        placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
        onSelectSuggestion={setLocation}
      />

      {location && !requestStatus?.failed && (
        <ChildComponent
          placeCard={placeCard}
          place={place}
          location={location}
        />
      )}
      {location && requestStatus?.failed && (
        <Text>
          Our servers are still {requestStatus.status.toLowerCase()} data for{" "}
          {location.description}! Please try again later.
        </Text>
      )}
    </Stack>
  );
};
