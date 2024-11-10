import { Container } from "@mantine/core";

import { FeaturesSection } from "@/features/AboutPage/components/FeaturesSection";

export const AboutPage: React.FC = () => {
  return (
    <Container p={0} my="auto">
      <FeaturesSection />
    </Container>
  );
};

export const Component = AboutPage;
Component.displayName = "AboutPage";
