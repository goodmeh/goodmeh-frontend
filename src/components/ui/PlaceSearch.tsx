import { Stack, Text } from "@mantine/core";
import { useState } from "react";

import { PlaceCard } from "@/features/Discover/components/PlaceCard";
import { PlaceCardSkeleton } from "@/features/Discover/components/PlaceCardSkeleton";
import { usePlaceLoader } from "@/hooks/usePlaceLoader";
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
  const { place, requestStatus } = usePlaceLoader({
    placeId: location?.place_id,
    onPlaceChange,
  });

  const ChildComponent = children;
  const placeCard = place ? <PlaceCard place={place} /> : <PlaceCardSkeleton />;

  return (
    <Stack>
      <PlacesAutocompleteField
        placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
        onSelectSuggestion={setLocation}
        showSplitButton
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
