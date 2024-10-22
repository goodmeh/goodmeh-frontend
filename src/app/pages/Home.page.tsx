import { Container, Space } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { PlacesAutocompleteField } from "@/components/ui/PlacesAutocompleteField";
import { FeaturesSection } from "@/features/Home/components/FeaturesSection";
import { WelcomeTitle } from "@/features/Home/components/WelcomeTitle";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const onSelectSuggestion = (
    value?: google.maps.places.AutocompletePrediction,
  ) => {
    if (!value) {
      return;
    }
    navigate(`/discover?place1Id=${value.place_id}`);
  };

  return (
    <Container p={0}>
      <WelcomeTitle />
      <Space h="xl" />
      <PlacesAutocompleteField
        leftSectionPointerEvents="none"
        leftSection={<IconSearch />}
        rightSection={null}
        placeholder="e.g. A Hot Hideout @ Bukit Panjang"
        onSelectSuggestion={onSelectSuggestion}
      />
      <Space h="xl" />
      <FeaturesSection />
    </Container>
  );
};

export const Component = HomePage;
Component.displayName = "HomePage";
