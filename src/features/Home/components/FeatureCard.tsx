import { Card, Text } from "@mantine/core";
import React from "react";
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
    <Card radius="md" padding={24} className={classes.FeatureCard}>
      <div className={classes.FeatureCard__Icon}>{icon}</div>
      <Text size="xl" fw="bold">
        {title}
      </Text>
      <Text c="dimmed">{description}</Text>
    </Card>
  );
};
