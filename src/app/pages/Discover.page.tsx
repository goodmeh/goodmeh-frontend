import { Group, Space } from "@mantine/core";
import { useEffect, useState } from "react";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import classes from "@/components/ui/PlaceSearch.module.scss";
import { getMockPlace } from "@/features/Dashboard/api/getPlace";
import { PlaceCard } from "@/features/Dashboard/components/PlaceCard";
import { StatDisplay } from "@/features/Dashboard/components/StatDisplay";
import { Place } from "@/types/data";

export const DiscoverPage: React.FC = () => {
  const [location, setLocation] =
    useState<google.maps.places.AutocompletePrediction>();
  const [place, setPlace] = useState<Place>();

  useEffect(() => {
    if (!location) {
      return;
    }
    console.log(location);
    getMockPlace(location.place_id).then(setPlace);
  }, [location]);

  return (
    <>
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
            <GoogleMapsEmbed
              placeId={place.id}
              style={{
                borderRadius: "var(--mantine-radius-md)",
                height: "auto",
              }}
            />
            <StatDisplay />
          </Group>
        </>
      )}
    </>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
