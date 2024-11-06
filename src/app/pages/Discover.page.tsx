import { Portal, SimpleGrid, useMatches } from "@mantine/core";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import {
  discoverPlaces,
  PlacePreviewResponse,
} from "@/features/Discover/api/discoverPlaces";
import { PlacePreviewCard } from "@/features/Discover/components/PlacePreviewCard";
import { PlacePreviewCardSkeleton } from "@/features/Discover/components/PlacePreviewCardSkeleton";
import { useAppDispatch } from "@/stores/store";
export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState<PlacePreviewResponse[]>([]);
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
      setPlaces(places);
      setIsLoading(false);
    });
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>GoodMeh? - Discover</title>
      </Helmet>
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
              <PlacePreviewCard key={place.id} place={place} />
            ))}
      </SimpleGrid>
    </>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
