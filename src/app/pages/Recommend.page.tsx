import {
  Container,
  Group,
  Loader,
  LoadingOverlay,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { sample } from "es-toolkit";
import { useState } from "react";

import { PlaceCard } from "@/features/Place/components/PlaceCard";
import { generateRecommendations } from "@/features/Recommender/api/generateRecommendations";
import { RecommenderTextarea } from "@/features/Recommender/components/RecommenderTextarea";
import { PlaceActions } from "@/stores/places";
import { useAppDispatch } from "@/stores/store";

const RECOMMEND_CAPTION_TEXT = [
  "Not sure what to do? We settle for you!",
  "Dunno where to go? Don't worry we know!",
  "Can't make up your mind? We help you find!",
  "Anything... Whatever... Brainstorming... Together!",
];

const LOADING_TEXT = [
  "We've got just the place for you...",
  "Something tells me you'll enjoy...",
  "Thinking of places you'll love...",
  "Cooking up something good...",
];

const RecommendPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPlaceIds, setRecommendedPlaceIds] = useState<string[]>();
  const onSubmit = async (placeIds: string[]) => {
    setIsLoading(true);
    try {
      const places = await generateRecommendations(placeIds);
      places.forEach((place) => dispatch(PlaceActions.addPlace(place)));
      setRecommendedPlaceIds(places.map((place) => place.id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <Title size="h1" ta="center" mt="sm">
        DoWhat?
      </Title>
      <Space h="sm" />

      <LoadingOverlay
        visible={isLoading}
        loaderProps={{
          children: (
            <Group>
              <Loader /> {sample(LOADING_TEXT)}
            </Group>
          ),
        }}
      />
      <Title size="h2" mb="md" ta="center">
        {sample(RECOMMEND_CAPTION_TEXT)}
      </Title>
      <RecommenderTextarea
        onSubmit={onSubmit}
        onSelectionChange={() => setRecommendedPlaceIds([])}
      />

      {recommendedPlaceIds && recommendedPlaceIds.length > 0 && (
        <>
          <Text size="lg" fw="bold" my="md">
            We think you might enjoy...
          </Text>
          <PlaceCard placeId={recommendedPlaceIds[0]} clickable />
          <SimpleGrid
            cols={{
              base: 1,
              md: 2,
            }}
            mt="md"
          >
            <PlaceCard placeId={recommendedPlaceIds[1]} clickable />
            <PlaceCard placeId={recommendedPlaceIds[2]} clickable />
          </SimpleGrid>
        </>
      )}
    </Container>
  );
};

export const Component = RecommendPage;
Component.displayName = "RecommendPage";
