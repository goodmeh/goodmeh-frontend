import { Container, Title } from "@mantine/core";

import { RecommenderTextarea } from "@/features/Recommender/components/RecommenderTextarea";

const RecommendPage: React.FC = () => {
  return (
    <Container>
      <Title size="h2" mb="md">
        What are your favourite places?
      </Title>
      <RecommenderTextarea />
    </Container>
  );
};

export const Component = RecommendPage;
Component.displayName = "RecommendPage";
