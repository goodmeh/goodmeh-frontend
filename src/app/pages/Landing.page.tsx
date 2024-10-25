import { Container, OptionalPortal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

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
  const [place1Id, setPlace1Id] = useSearchParamsState("place1Id");
  const [place2Id, setPlace2Id] = useSearchParamsState("place2Id");
  usePlaceLoader({ placeId: place1Id });
  usePlaceLoader({ placeId: place2Id });
  const [mode, setMode] = useState(Mode.Search);
  const isShowingLandingScreen = !place1Id;

  const placeFields = (
    <>
      <PlacesAutocompleteField
        placeId={place1Id}
        onSelectSuggestion={(location) => setPlace1Id(location?.place_id ?? "")}
        showCompareButton={mode == Mode.Search && !!place1Id}
        onClickCompare={() => setMode(Mode.Compare)}
        leftSectionPointerEvents="none"
        leftSection={isShowingLandingScreen && <IconSearch />}
      />

      {mode == Mode.Compare && (
        <PlacesAutocompleteField
          placeId={place2Id}
          onSelectSuggestion={(location) =>
            setPlace2Id(location?.place_id ?? "")
          }
          onClear={() => {
            setMode(Mode.Search);
          }}
        />
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
    return <LandingScreen placesAutocompleteField={placeFields} />;
  }

  return (
    <Container>
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
