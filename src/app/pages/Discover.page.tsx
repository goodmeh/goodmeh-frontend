import { Group, Stack } from "@mantine/core";

import { GoogleMapsEmbed } from "@/components/ui/GoogleMapsEmbed";
import { PlaceSearch } from "@/components/ui/PlaceSearch";
import classes from "@/components/ui/PlaceSearch.module.scss";
import { StatDisplay } from "@/features/Dashboard/components/StatDisplay";

export const DiscoverPage: React.FC = () => {
  return (
    <>
      <PlaceSearch>
        {({ placeCard, place }) => (
          <Group
            wrap="nowrap"
            align="stretch"
            className={classes.PlaceSearch__PlaceGroup}
          >
            <Stack>
              {placeCard}
              <GoogleMapsEmbed
                placeId={place.id}
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                  height: "auto",
                }}
              />
            </Stack>
            <StatDisplay place={place} />
          </Group>
        )}
      </PlaceSearch>
    </>
  );
};

export const Component = DiscoverPage;
Component.displayName = "DiscoverPage";
