import { Card, Stack, Text, Title } from "@mantine/core";
import { AudienceLabel } from "@/types/data";

type Props = {
  title: string;
  children: React.ReactNode;
  caption: AudienceLabel;
};

export const StatCard: React.FC<Props> = ({ title, children, caption }) => {
  return (
    <Card radius="md" padding="lg" withBorder ta="center">
      <Stack h="100%" justify="center">
        <Title size="h4" fw="bold">
          {title}
        </Title>
        <Text component="div" size="40px">
          {children}
        </Text>
        <Text mt="xs" size="sm">
          {caption}
        </Text>
      </Stack>
    </Card>
  );
};
