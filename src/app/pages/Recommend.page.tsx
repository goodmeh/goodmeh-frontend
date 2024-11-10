import {
  Container,
  Group,
  Loader,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

import { PlaceCard } from "@/features/Place/components/PlaceCard";
import { generateRecommendations } from "@/features/Recommender/api/generateRecommendations";
import { RecommenderTextarea } from "@/features/Recommender/components/RecommenderTextarea";
import { PlaceActions } from "@/stores/places";
import { useAppDispatch } from "@/stores/store";

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
    <Container p={0}>
      <LoadingOverlay
        visible={isLoading}
        loaderProps={{
          children: (
            <Group>
              <Loader /> Finding a new place just for you...
            </Group>
          ),
        }}
      />
      <Title size="h2" mb="md">
        What are your favourite places?
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
