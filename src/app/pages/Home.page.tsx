import { FeaturesSection } from "@/features/Home/components/FeaturesSection";
import { ViewModeControl } from "@/features/Home/components/ViewModeControl";
import { WelcomeTitle } from "@/features/Home/components/WelcomeTitle";
import { useViewMode } from "@/hooks/useViewMode";
import { Container, Space } from "@mantine/core";
import React from "react";

const HomePage: React.FC = () => {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <Container>
      <WelcomeTitle />
      <Space h="xl" />
      <ViewModeControl />
      <Space h="xl" />
      <FeaturesSection />
    </Container>
  );
};

export const Component = HomePage;
Component.displayName = "HomePage";
