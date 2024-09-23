import { SimpleGrid, Title } from "@mantine/core";
import { useState } from "react";

import { PlaceSearch } from "@/components/ui/PlaceSearch";
import { PlaceComparisonTable } from "@/features/Compare/PlaceComparisonTable";
import { Place } from "@/types/data";

export const CompareDashboardPage: React.FC = () => {
  const [place1, setPlace1] = useState<Place>();
  const [place2, setPlace2] = useState<Place>();
  return (
    <>
      <Title>Compare Dashboard</Title>
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
      {place1 && place2 && <PlaceComparisonTable />}
    </>
  );
};

export const Component = CompareDashboardPage;
Component.displayName = "CompareDashboardPage";
