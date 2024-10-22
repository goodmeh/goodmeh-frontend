import { SimpleGrid, Stack, useMatches } from "@mantine/core";
import { useEffect, useState } from "react";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { discoverPlaces } from "@/features/Discover/api/discoverPlaces";
import { PlacePreviewCard } from "@/features/Discover/components/PlacePreviewCard";
import { StatDisplay } from "@/features/Place/components/Stats/StatDisplay";
import { PlaceActions } from "@/stores/places";
import { useAppDispatch } from "@/stores/store";
import { Place } from "@/types/data";

enum Mode {
  Discover,
  Compare,
}

const DiscoverLayout: React.FC<{ placeId: string }> = ({ placeId }) => {
  return (
    <Stack>
      <GoogleMapsEmbed
        placeId={placeId}
        style={{
          borderRadius: "var(--mantine-radius-md)",
          height: "auto",
          flex: 1,
        }}
      />
      <StatDisplay placeId={placeId} />
    </Stack>
  );
};

export const DiscoverPage: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const dispatch = useAppDispatch();
  const cols = useMatches({
    base: 1,
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
  });

  useEffect(() => {
    discoverPlaces().then((places) => {
      places.map((place) => dispatch(PlaceActions.addPlace(place)));
      setPlaces(places);
    });
  }, [dispatch]);

  return (
    <SimpleGrid cols={cols}>
      {places.map((place) => (
        <PlacePreviewCard key={place.id} placeId={place.id} />
      ))}
    </SimpleGrid>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
