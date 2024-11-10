import {
  Container,
  Group,
  Loader,
  LoadingOverlay,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
import { useState } from "react";

import IdeaLeh from "@/assets/logo/IdeaLeh.svg";
import { HeroSection } from "@/components/ui/HeroSection";
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
    <Container p={0} mt={!recommendedPlaceIds ? "10dvh" : 0}>
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

      <HeroSection
        imageUrl={IdeaLeh}
        title="Anything... Whatever... Let's decide together!"
      />

      <Space h="xl" />

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
