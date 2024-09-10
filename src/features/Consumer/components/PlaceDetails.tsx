import { Place } from "@/types/data";
import { Tabs, Text } from "@mantine/core";
import React from "react";

enum Tab {
  Summary = "summary",
  Analysis = "analysis",
  Reviews = "reviews",
}

type Props = {
  place: Place;
};

const PlaceDetails: React.FC<Props> = ({ place }) => {
  return (
    <Tabs defaultValue={Tab.Summary}>
      <Tabs.List>
        <Tabs.Tab value={Tab.Summary}>Summary</Tabs.Tab>
        <Tabs.Tab value={Tab.Analysis}>Analysis</Tabs.Tab>
        <Tabs.Tab value={Tab.Reviews}>Reviews</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel p="md" value={Tab.Summary}>
        <Text>{place.summary}</Text>
      </Tabs.Panel>
      <Tabs.Panel p="md" value={Tab.Analysis}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse possimus
          impedit odit sequi dolores cumque nisi nesciunt vitae sed doloremque.
        </Text>
      </Tabs.Panel>
      <Tabs.Panel p="md" value={Tab.Reviews}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla velit
          itaque fuga vero ut soluta modi quam placeat excepturi repudiandae.
        </Text>
      </Tabs.Panel>
    </Tabs>
  );
};

export default PlaceDetails;
