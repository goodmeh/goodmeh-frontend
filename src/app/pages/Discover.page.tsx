import { Group, SimpleGrid, Space, Stack } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import {
  PlaceSearch,
  PlaceSearchChildProps,
} from "@/components/ui/PlaceSearch";
import classes from "@/components/ui/PlaceSearch.module.scss";
import { PlaceComparisonTable } from "@/features/Compare/components/PlaceComparisonTable";
import { ReviewSection } from "@/features/Discover/components/ReviewSection";
import { StatDisplay } from "@/features/Discover/components/StatDisplay";
import { useAppSelector } from "@/stores/store";

enum Mode {
  Discover,
  Compare,
}

const DiscoverLayout: React.FC<PlaceSearchChildProps> = ({
  placeCard,
  place,
  placeId,
}) => (
  <>
    <Group
      wrap="nowrap"
      align="stretch"
      className={classes.PlaceSearch__PlaceGroup}
    >
      <Stack>
        {placeCard}
        <GoogleMapsEmbed
          placeId={placeId}
          style={{
            borderRadius: "var(--mantine-radius-md)",
            height: "auto",
          }}
        />
      </Stack>
      <StatDisplay place={place} />
    </Group>
    <Space h="md" />
    <ReviewSection place={place} />
  </>
);

export const DiscoverPage: React.FC = () => {
  const [place1Id, setPlace1Id] = useState<string>();
  const [place2Id, setPlace2Id] = useState<string>();
  const places = useAppSelector((state) => state.places);
  const place1 = useMemo(
    () => place1Id && places[place1Id],
    [place1Id, places],
  );
  const place2 = useMemo(
    () => place2Id && places[place2Id],
    [place2Id, places],
  );
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
      <SimpleGrid cols={mode == Mode.Compare ? 2 : 1}>
        <PlaceSearch
          placeId={place1Id}
          onClickCompare={() => setMode(Mode.Compare)}
          showCompareButton={!!place1Id && mode == Mode.Discover}
          onPlaceIdChange={setPlace1Id}
        >
          {mode == Mode.Discover ? DiscoverLayout : undefined}
        </PlaceSearch>

        {mode === Mode.Compare && (
          <PlaceSearch placeId={place2Id} onPlaceIdChange={setPlace2Id} />
        )}
      </SimpleGrid>
      {mode == Mode.Compare && place1 && place2 && (
        <PlaceComparisonTable place1={place1} place2={place2} />
      )}
    </Stack>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
