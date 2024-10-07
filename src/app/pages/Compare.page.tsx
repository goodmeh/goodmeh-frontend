import { SimpleGrid, Space, Title } from "@mantine/core";
import { useState } from "react";

import { PlaceSearch } from "@/components/ui/PlaceSearch";
import { PlaceComparisonTable } from "@/features/Compare/components/PlaceComparisonTable";
import { Place } from "@/types/data";

export const ComparePage: React.FC = () => {
  const [place1, setPlace1] = useState<Place>();
  const [place2, setPlace2] = useState<Place>();
  return (
    <>
      <SimpleGrid
        cols={2}
        style={{
          borderRadius: "var(--mantine-radius-md)",
          height: "auto",
        }}
      >
        <PlaceSearch onPlaceChange={setPlace1}></PlaceSearch>
        <PlaceSearch onPlaceChange={setPlace2}></PlaceSearch>
      </SimpleGrid>
      <Space h="md" />
      {place1 && place2 && (
        <PlaceComparisonTable place1={place1} place2={place2} />
      )}
    </>
  );
};

export const Component = ComparePage;
Component.displayName = "ComparePage";
