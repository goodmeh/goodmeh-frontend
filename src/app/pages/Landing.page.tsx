import { OptionalPortal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import { CompareScreen } from "@/features/Compare/components/CompareScreen";
import { LandingScreen } from "@/features/LandingPage/components/LandingScreen";
import { SearchScreen } from "@/features/LandingPage/components/SearchScreen";
import { usePlaceLoader } from "@/hooks/usePlaceLoader";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";

enum Mode {
  Discover,
  Compare,
}

const LandingPage: React.FC = () => {
  const [place1Id, setPlace1Id] = useSearchParamsState("place1Id");
  const [place2Id, setPlace2Id] = useSearchParamsState("place2Id");
  usePlaceLoader({ placeId: place1Id });
  usePlaceLoader({ placeId: place2Id });
  const [mode, setMode] = useState(Mode.Discover);
  const isShowingLandingScreen = !place1Id;

  const placeFields = (
    <>
      <PlacesAutocompleteField
        placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
        placeId={place1Id}
        onSelectSuggestion={(location) => setPlace1Id(location?.place_id ?? "")}
        showCompareButton={mode == Mode.Discover && !!place1Id}
        onClickCompare={() => setMode(Mode.Compare)}
        leftSectionPointerEvents="none"
        leftSection={isShowingLandingScreen && <IconSearch />}
      />

      {mode == Mode.Compare && (
        <PlacesAutocompleteField
          placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
          placeId={place2Id}
          onSelectSuggestion={(location) =>
            setPlace2Id(location?.place_id ?? "")
          }
          onClear={() => {
            setMode(Mode.Discover);
          }}
        />
      )}
    </>
  );

  useEffect(() => {
    if (!place2Id) {
      setMode(Mode.Discover);
    } else {
      setMode(Mode.Compare);
    }
  }, [place2Id]);

  useEffect(() => {
    if (!place1Id) {
      setMode(Mode.Discover);
    }
  }, [place1Id]);

  if (!place1Id) {
    return <LandingScreen placesAutocompleteField={placeFields} />;
  }

  return (
    <>
      <OptionalPortal target="#header-portal">{placeFields}</OptionalPortal>

      {mode == Mode.Discover ? (
        <SearchScreen place1Id={place1Id} />
      ) : (
        <CompareScreen place1Id={place1Id} place2Id={place2Id} />
      )}
    </>
  );
};

export const Component = LandingPage;
Component.displayName = "LandingPage";
