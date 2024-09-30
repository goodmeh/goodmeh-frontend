import { Group, Space, Stack } from "@mantine/core";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { PlaceSearch } from "@/components/ui/PlaceSearch";
import classes from "@/components/ui/PlaceSearch.module.scss";
import { ReviewSection } from "@/features/Dashboard/components/ReviewSection";
import { StatDisplay } from "@/features/Dashboard/components/StatDisplay";

export const DiscoverPage: React.FC = () => {
  return (
    <>
      <PlaceSearch>
        {({ placeCard, place, location }) => (
          <>
            <Group
              wrap="nowrap"
              align="stretch"
              className={classes.PlaceSearch__PlaceGroup}
            >
              <Stack>
                {placeCard}
                <GoogleMapsEmbed
                  placeId={location.place_id}
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
        )}
      </PlaceSearch>
    </>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
