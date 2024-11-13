import { Button, Container, Group, Space } from "@mantine/core";
import { Link } from "react-router-dom";

import GoodmehLogo from "@/assets/logo/GoodmehLogo.svg";
import { HeroSection } from "@/components/ui/HeroSection";

type Props = {
  placesAutocompleteField: React.ReactNode;
};

export const LandingScreen: React.FC<Props> = ({ placesAutocompleteField }) => {
  return (
    <Container p={0} mt="9dvh">
      <HeroSection
        imageUrl={GoodmehLogo}
        title="good or meh? you decide lor."
      />
      <Space h={{ base: "md", lg: "xl" }} />
      {placesAutocompleteField}
      <Space h={{ base: "md", lg: "xl" }} />
      <Group justify="center">
        <Button component={Link} to="/discover" w={135}>
          Explore now
        </Button>
        <Button variant="outline" component={Link} to="/about" w={135}>
          About Us
        </Button>
      </Group>
    </Container>
  );
};
