import { Portal, SimpleGrid, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import { PlaceComparisonTable } from "@/features/Compare/components/PlaceComparisonTable";
import { PlaceCard } from "@/features/Discover/components/PlaceCard";
import { ReviewSection } from "@/features/Discover/components/ReviewSection";
import { StatDisplay } from "@/features/Discover/components/StatDisplay";
import { usePlaceLoader } from "@/hooks/usePlaceLoader";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";

enum Mode {
  Discover,
  Compare,
}

const DiscoverLayout: React.FC<{ placeId: string }> = ({ placeId }) => {
  const place = useAppSelector<Place | undefined>(
    (state) => state.places[placeId],
  );

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
      <StatDisplay place={place} />
    </Stack>
  );
};

export const DiscoverPage: React.FC = () => {
  const [place1Id, setPlace1Id] = useSearchParamsState("place1Id");
  const [place2Id, setPlace2Id] = useSearchParamsState("place2Id");
  const { place: place1 } = usePlaceLoader({
    placeId: place1Id,
  });
  const { place: place2 } = usePlaceLoader({
    placeId: place2Id,
  });
  const [mode, setMode] = useState(Mode.Discover);

  useEffect(() => {
    if (!place2Id) {
      setMode(Mode.Discover);
    }
  }, [place2Id]);

  useEffect(() => {
    if (!place1Id) {
      setMode(Mode.Discover);
    }
  }, [place1Id]);

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <Portal target="#header-portal">
          <PlacesAutocompleteField
            placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
            placeId={place1Id}
            onSelectSuggestion={(location) =>
              setPlace1Id(location?.place_id ?? "")
            }
            showCompareButton={mode == Mode.Discover && !!place1Id}
            onClickCompare={() => setMode(Mode.Compare)}
          />
          {mode == Mode.Compare && (
            <PlacesAutocompleteField
              placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
              placeId={place2Id}
              onSelectSuggestion={(location) =>
                setPlace2Id(location?.place_id ?? "")
              }
            />
          )}
        </Portal>

        {place1Id && <PlaceCard placeId={place1Id} />}
        {mode == Mode.Discover
          ? place1Id && <DiscoverLayout placeId={place1Id} />
          : place2Id && <PlaceCard placeId={place2Id} />}
      </SimpleGrid>
      {mode == Mode.Discover && place1 && <ReviewSection place={place1} />}
      {mode == Mode.Compare && place1 && place2 && (
        <PlaceComparisonTable place1={place1} place2={place2} />
      )}
    </Stack>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
