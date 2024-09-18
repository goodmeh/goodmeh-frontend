import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import { getMockPlace } from "@/features/Consumer/api/getPlace";
import { InsightDisplay } from "@/features/Consumer/components/InsightDisplay";
import { PlaceCard } from "@/features/Consumer/components/PlaceCard";
import { PlaceDetails } from "@/features/Consumer/components/PlaceDetails";
import { StatDisplay } from "@/features/Consumer/components/StatDisplay";
import classes from "@/features/Consumer/ConsumerDashboard.module.scss";
import { Place } from "@/types/data";
import { Group, Space, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export const ConsumerDashboardPage: React.FC = () => {
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
      <Title>Consumer Dashboard</Title>
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
            className={classes.ConsumerDashboard__PlaceGroup}
          >
            <PlaceCard place={place} />
            <StatDisplay />
            <GoogleMapsEmbed
              placeId={place.id}
              style={{
                borderRadius: "var(--mantine-radius-md)",
                height: "auto",
              }}
            />
          </Group>
          <Space h="md" />
          <PlaceDetails place={place} />
          <InsightDisplay />
        </>
      )}
    </>
  );
};

export const Component = ConsumerDashboardPage;
Component.displayName = "ConsumerDashboardPage";
