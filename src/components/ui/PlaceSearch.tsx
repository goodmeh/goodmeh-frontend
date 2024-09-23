import { PlaceCard } from "@/features/Consumer/components/PlaceCard";
import { Box, Space, Group } from "@mantine/core";
import { PlacesAutocompleteField } from "./PlacesAutocompleteField";
import { useEffect, useState } from "react";
import { Place } from "@/types/data";
import classes from "./PlaceSearch.module.scss";
import { getMockPlace } from "@/features/Consumer/api/getPlace";
import { PlaceDetails } from "@/features/Consumer/components/PlaceDetails";

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
  }, [location]);

  return (
    <Box>
      <PlacesAutocompleteField
        placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
        onSelectSuggestion={setLocation}
      />
      <Space h="md" />
      {place && (
        <>
          <Group
            wrap="nowrap"
            align="stretch"
            className={classes.PlaceSearch__PlaceGroup}
          >
            <PlaceCard place={place} />
          </Group>
          <PlaceDetails place={place} />
          <Space h="md" />
        </>
      )}
    </Box>
  );
};
