import { FeaturesSection } from "@/features/Home/components/FeaturesSection";
import {
  FeatureView,
  FeatureViewButtonGroup,
} from "@/features/Home/components/FeatureViewButtonGroup";
import { WelcomeTitle } from "@/features/Home/components/WelcomeTitle";
import { Container, Space } from "@mantine/core";
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [view, setView] = useState<FeatureView>("consumer");

  return (
    <Container>
      <WelcomeTitle />
      <Space h="xl" />
      <FeatureViewButtonGroup value={view} setter={setView} />
      <Space h="xl" />
      <FeaturesSection view={view} />
    </Container>
  );
};

export const Component = HomePage;
Component.displayName = "HomePage";
