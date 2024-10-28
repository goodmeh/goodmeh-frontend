import {
  Container,
  Group,
  Loader,
  LoadingOverlay,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

import { PlaceCard } from "@/features/Place/components/PlaceCard";
import { generateMockRecommendation } from "@/features/Recommender/api/generateRecommendations";
import { RecommenderTextarea } from "@/features/Recommender/components/RecommenderTextarea";
import { PlaceActions } from "@/stores/places";
import { useAppDispatch } from "@/stores/store";

const RecommendPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedPlaceId, setRecommendedPlaceId] = useState<string>();
  const onSubmit = async (placeIds: string[]) => {
    setIsLoading(true);
    try {
      const place = await generateMockRecommendation(placeIds);
      dispatch(PlaceActions.addPlace(place));
      setRecommendedPlaceId(place.id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
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
        onSelectionChange={() => setRecommendedPlaceId(undefined)}
      />

      {recommendedPlaceId && (
        <>
          <Text size="lg" fw="bold" my="md">
            We think you might enjoy...
          </Text>
          <PlaceCard placeId={recommendedPlaceId} />
        </>
      )}
    </Container>
  );
};

export const Component = RecommendPage;
Component.displayName = "RecommendPage";
