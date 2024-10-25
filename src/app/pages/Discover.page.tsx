import { Portal, SimpleGrid, useMatches } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import { discoverPlaces } from "@/features/Discover/api/discoverPlaces";
import { PlacePreviewCard } from "@/features/Discover/components/PlacePreviewCard";
import { PlacePreviewCardSkeleton } from "@/features/Discover/components/PlacePreviewCardSkeleton";
import { PlaceActions } from "@/stores/places";
import { useAppDispatch } from "@/stores/store";
import { Place } from "@/types/data";

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const cols = useMatches({
    base: 1,
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
  });

  const onSelectSuggestion = (
    suggestion?: google.maps.places.AutocompletePrediction,
  ) => {
    if (!suggestion) {
      return;
    }
    navigate(`/?place1Id=${suggestion.place_id}`);
  };

  useEffect(() => {
    discoverPlaces().then((places) => {
      places.map((place) => dispatch(PlaceActions.addPlace(place)));
      setPlaces(places);
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      <Portal target="#header-portal">
        <PlacesAutocompleteField
          leftSectionPointerEvents="none"
          onSelectSuggestion={onSelectSuggestion}
        />
      </Portal>
      <SimpleGrid cols={cols}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <PlacePreviewCardSkeleton key={index} />
            ))
          : places.map((place) => (
              <PlacePreviewCard key={place.id} placeId={place.id} />
            ))}
      </SimpleGrid>
    </>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
