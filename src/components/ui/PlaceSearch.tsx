import { Box, Space } from "@mantine/core";
import { useEffect, useState } from "react";

import { getMockPlace } from "@/features/Dashboard/api/getPlace";
import { PlaceCard } from "@/features/Dashboard/components/PlaceCard";
import { Place } from "@/types/data";

import { PlacesAutocompleteField } from "./PlacesAutocompleteField";

type Props = {
  onPlaceChange: (place: Place | undefined) => void;
};

export const PlaceSearch: React.FC<Props> = ({ onPlaceChange }) => {
  const [location, setLocation] =
    useState<google.maps.places.AutocompletePrediction>();
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    if (!location) {
      return;
    }
    getMockPlace(location.place_id).then((place) => {
      setPlace(place);
      onPlaceChange(place);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we only want to run this effect when the location changes
  }, [location]);

  return (
    <Box>
      <PlacesAutocompleteField
        placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
        onSelectSuggestion={setLocation}
      />
      <Space h="md" />
      {place && <PlaceCard place={place} />}
    </Box>
  );
};
