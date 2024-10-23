import { SimpleGrid, Stack } from "@mantine/core";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { PlaceCard } from "@/features/Place/components/PlaceCard";
import { StatDisplay } from "@/features/Place/components/Stats/StatDisplay";
import { ReviewSection } from "@/features/Review/components/ReviewSection";
import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";

type Props = {
  place1Id: string;
};

export const SearchScreen: React.FC<Props> = ({ place1Id }) => {
  const place = useAppSelector<Place | undefined>(
    (state) => state.places[place1Id],
  );

  return (
    <Stack>
      <SimpleGrid cols={2}>
        <PlaceCard placeId={place1Id} />
        <Stack>
          <GoogleMapsEmbed
            placeId={place1Id}
            style={{
              borderRadius: "var(--mantine-radius-md)",
              height: "auto",
              flex: 1,
            }}
          />
          <StatDisplay placeId={place1Id} />
        </Stack>
      </SimpleGrid>
      {place && <ReviewSection place={place} />}
    </Stack>
  );
};
