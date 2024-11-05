import { Carousel } from "@mantine/carousel";
import { SimpleGrid, Stack, useMatches } from "@mantine/core";
import { Helmet } from "react-helmet";

import { PlaceComparisonTable } from "@/features/Compare/components/PlaceComparisonTable";
import { PlaceCard } from "@/features/Place/components/PlaceCard";
import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";

type Props = {
  place1Id: string;
  place2Id?: string;
};

export const CompareScreen: React.FC<Props> = ({ place1Id, place2Id }) => {
  const place1 = useAppSelector<Place | undefined>(
    (state) => state.places[place1Id],
  );
  const place2 = useAppSelector<Place | undefined>(
    (state) => state.places[place2Id ?? ""],
  );

  const placeCards = useMatches({
    base: (
      <Carousel loop withIndicators withControls={false} pb="xl">
        <Carousel.Slide display="flex">
          <PlaceCard placeId={place1Id} />
        </Carousel.Slide>
        {place2Id && (
          <Carousel.Slide display="flex">
            <PlaceCard placeId={place2Id} />
          </Carousel.Slide>
        )}
      </Carousel>
    ),
    xs: (
      <SimpleGrid cols={2}>
        <PlaceCard placeId={place1Id} />
        {place2Id && <PlaceCard placeId={place2Id} />}
      </SimpleGrid>
    ),
  });

  return (
    <>
      {place1 && place2 && (
        <Helmet>
          <title>
            GoodMeh? – {place1.name} vs {place2.name}
          </title>
        </Helmet>
      )}
      <Stack>
        {placeCards}
        {place1 && place2 && (
          <PlaceComparisonTable place1={place1} place2={place2} />
        )}
      </Stack>
    </>
  );
};
