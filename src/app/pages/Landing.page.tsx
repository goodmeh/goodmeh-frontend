import { Button, Container, OptionalPortal } from "@mantine/core";
import { IconSearch, IconSwitchHorizontal } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";

import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import { CompareScreen } from "@/features/Compare/components/CompareScreen";
import { LandingScreen } from "@/features/LandingPage/components/LandingScreen";
import { SearchScreen } from "@/features/LandingPage/components/SearchScreen";
import { usePlaceLoader } from "@/hooks/usePlaceLoader";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

enum Mode {
  Search,
  Compare,
}

const LandingPage: React.FC = () => {
  const [, setSearchParams] = useSearchParams();
  const [place1Id, setPlace1Id] = useSearchParamsState("place1Id");
  const [place2Id, setPlace2Id] = useSearchParamsState("place2Id");
  usePlaceLoader({ placeId: place1Id });
  usePlaceLoader({ placeId: place2Id });
  const [mode, setMode] = useState(Mode.Search);
  const isShowingLandingScreen = !place1Id;

  const onClearPlace1 = () => {
    // We need to manually call useSearchParams here instead of using setPlace1Id
    // because we want to perform a more complex update - swapping place1Id with place2Id.
    // The useSearchParamsState hook's setter only handles updating a single param,
    // while here we need to update multiple params atomically in a single operation.
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      const place2Id = params.get("place2Id");
      params.delete("place1Id");
      if (place2Id) {
        params.set("place1Id", place2Id);
        params.delete("place2Id");
      }
      return params;
    });
  };

  const placeFields = (
    <>
      <PlacesAutocompleteField
        placeId={place1Id}
        onSelectSuggestion={(location) => setPlace1Id(location?.place_id)}
        leftSection={isShowingLandingScreen && <IconSearch />}
        onClear={onClearPlace1}
      />

      {mode == Mode.Compare ? (
        <PlacesAutocompleteField
          placeId={place2Id}
          onSelectSuggestion={(location) => setPlace2Id(location?.place_id)}
          onClear={() => {
            setMode(Mode.Search);
            setPlace2Id(undefined);
          }}
        />
      ) : (
        place1Id && (
          <Button flex={0.2} onClick={() => setMode(Mode.Compare)}>
            <IconSwitchHorizontal />
          </Button>
        )
      )}
    </>
  );

  useEffect(() => {
    if (!place2Id) {
      setMode(Mode.Search);
    } else {
      setMode(Mode.Compare);
    }
  }, [place2Id]);

  useEffect(() => {
    if (!place1Id) {
      setMode(Mode.Search);
    }
  }, [place1Id]);

  if (!place1Id) {
    return (
      <>
        <Helmet>
          <title>GoodMeh?</title>
        </Helmet>
        <LandingScreen placesAutocompleteField={placeFields} />
      </>
    );
  }

  return (
    <Container p={0}>
      <Helmet>
        <title>GoodMeh?</title>
      </Helmet>
      <OptionalPortal target="#header-portal">{placeFields}</OptionalPortal>

      {mode == Mode.Search ? (
        <SearchScreen place1Id={place1Id} />
      ) : (
        <CompareScreen place1Id={place1Id} place2Id={place2Id} />
      )}
    </Container>
  );
};

export const Component = LandingPage;
Component.displayName = "LandingPage";
