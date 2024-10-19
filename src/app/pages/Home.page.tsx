import { Container, Space } from "@mantine/core";
import React from "react";

import { FeaturesSection } from "@/features/Home/components/FeaturesSection";
import { WelcomeTitle } from "@/features/Home/components/WelcomeTitle";

const HomePage: React.FC = () => {
  return (
    <Container p={0}>
      <WelcomeTitle />
      <Space h="xl" />
      <FeaturesSection />
    </Container>
  );
};

export const Component = HomePage;
Component.displayName = "HomePage";
