import { Container, Space } from "@mantine/core";

import { FeaturesSection } from "@/features/LandingPage/components/FeaturesSection";
import { WelcomeTitle } from "@/features/LandingPage/components/WelcomeTitle";

type Props = {
  placesAutocompleteField: React.ReactNode;
};

export const LandingScreen: React.FC<Props> = ({ placesAutocompleteField }) => {
  return (
    <Container p={0}>
      <WelcomeTitle />
      <Space h="xl" />
      {placesAutocompleteField}
      <Space h="xl" />
      <FeaturesSection />
    </Container>
  );
};
