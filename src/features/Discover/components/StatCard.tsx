import { Card, Stack, Text, Title } from "@mantine/core";

type Props = {
  title: string;
  children: React.ReactNode;
  caption: string;
};

export const StatCard: React.FC<Props> = ({ title, children, caption }) => {
  return (
    <Card radius="md" padding="lg" withBorder ta="center">
      <Stack h="100%" justify="center">
        <Title size="h2" fw="bold">
          {title}
        </Title>
        <Text component="div" size="75px">
          {children}
        </Text>
        <Text mt="xs" size="xl">
          {caption}
        </Text>
      </Stack>
    </Card>
  );
};
