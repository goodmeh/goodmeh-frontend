import { Card, Text, ThemeIcon } from "@mantine/core";
import classes from "./Features.module.scss";

type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card radius="md" padding={24} className={classes.FeatureCard} withBorder>
      <ThemeIcon color="gray" variant="light">
        {icon}
      </ThemeIcon>
      <Text size="xl" fw="bold">
        {title}
      </Text>
      <Text c="dimmed">{description}</Text>
    </Card>
  );
};
