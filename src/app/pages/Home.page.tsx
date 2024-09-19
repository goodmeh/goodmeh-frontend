import { FeaturesSection } from "@/features/Home/components/FeaturesSection";
import { WelcomeTitle } from "@/features/Home/components/WelcomeTitle";
import { Container, Space } from "@mantine/core";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Container>
      <WelcomeTitle />
      <Space h="xl" />
      <FeaturesSection />
    </Container>
  );
};

export const Component = HomePage;
Component.displayName = "HomePage";
