import { Container, Space } from "@mantine/core";

import { WelcomeTitle } from "@/features/LandingPage/components/WelcomeTitle";

type Props = {
  placesAutocompleteField: React.ReactNode;
};

export const LandingScreen: React.FC<Props> = ({ placesAutocompleteField }) => {
  return (
    <Container p={0} mt="10dvh">
      <WelcomeTitle />
      <Space h="xl" />
      {placesAutocompleteField}
    </Container>
  );
};
