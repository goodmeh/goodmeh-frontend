import { Container, Space } from "@mantine/core";

import GoodmehLogo from "@/assets/logo/GoodmehLogo.svg";
import { HeroSection } from "@/components/ui/HeroSection";

type Props = {
  placesAutocompleteField: React.ReactNode;
};

export const LandingScreen: React.FC<Props> = ({ placesAutocompleteField }) => {
  return (
    <Container p={0} mt="10dvh">
      <HeroSection
        imageUrl={GoodmehLogo}
        title="good or meh? you decide lor."
      />
      <Space h="xl" />
      {placesAutocompleteField}
    </Container>
  );
};
