import { SimpleGrid, Stack, Tabs, Text } from "@mantine/core";
import { Helmet } from "react-helmet";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { StatSection } from "@/features/Dashboard/components/StatSection";
import { PlaceCard } from "@/features/Place/components/PlaceCard";
import { StatDisplay } from "@/features/Place/components/Stats/StatDisplay";
import { ReviewSection } from "@/features/Review/components/ReviewSection";
import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";

import classes from "./SearchScreen.module.scss";

type Props = {
  place1Id: string;
};

export const SearchScreen: React.FC<Props> = ({ place1Id }) => {
  const place = useAppSelector<Place | undefined>(
    (state) => state.places[place1Id],
  );

  return (
    <>
      {place && (
        <Helmet>
          <title>GoodMeh? – {place?.name}</title>
        </Helmet>
      )}
      <Stack>
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
          }}
        >
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
            {(!place || place.user_rating_count > 0) && (
              <StatDisplay placeId={place1Id} />
            )}
          </Stack>
        </SimpleGrid>

        {place &&
          (place.user_rating_count > 0 ? (
            <TabsSection place={place} />
          ) : (
            <NoReviewPlaceholder />
          ))}
      </Stack>
    </>
  );
};

const TabsSection: React.FC<{ place?: Place }> = ({ place }) => {
  return (
    <Tabs
      variant="outline"
      defaultValue="reviews"
      className={classes.SearchScreen__Tabs}
    >
      <Tabs.List grow>
        <Tabs.Tab value="reviews">
          <Text size="md" fw="bold">
            Reviews
          </Text>
        </Tabs.Tab>
        <Tabs.Tab value="dashboard">
          <Text size="md" fw="bold">
            Stats
          </Text>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="reviews">
        {place && <ReviewSection place={place} />}
      </Tabs.Panel>
      <Tabs.Panel value="dashboard">
        {place && <StatSection place={place} />}
      </Tabs.Panel>
    </Tabs>
  );
};

const NoReviewPlaceholder: React.FC = () => {
  return (
    <Stack align="center" p="xl">
      <Text size="xl">No reviews yet!</Text>
    </Stack>
  );
};
