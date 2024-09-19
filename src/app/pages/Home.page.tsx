import { FeaturesSection } from "@/features/Home/components/FeaturesSection";
import { ViewModeControl } from "@/features/Home/components/ViewModeControl";
import { WelcomeTitle } from "@/features/Home/components/WelcomeTitle";
import { useViewMode } from "@/hooks/useViewMode";
import { Container, Space } from "@mantine/core";
import React from "react";

const HomePage: React.FC = () => {
  const { mode, setMode } = useViewMode();

  return (
    <Container>
      <WelcomeTitle />
      <Space h="xl" />
      <ViewModeControl />
      <Space h="xl" />
      <FeaturesSection view={mode} />
    </Container>
  );
};

export const Component = HomePage;
Component.displayName = "HomePage";
