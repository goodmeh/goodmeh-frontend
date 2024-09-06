import { Button, Group, Text, useComputedColorScheme } from "@mantine/core";
import React from "react";

export type FeatureView = "consumer" | "business";

const VIEWS = ["consumer", "business"] as const satisfies FeatureView[];

type FeatureViewButtonProps = {
  view: FeatureView;
  value: FeatureView;
  setter: (value: FeatureView) => void;
};

const FeatureViewButton: React.FC<FeatureViewButtonProps> = ({
  view,
  value,
  setter,
}) => {
  const scheme = useComputedColorScheme();
  return (
    <Button
      onClick={() => setter(view)}
      color={value === view ? "" : scheme == "light" ? "gray.6" : "gray.7"}
    >
      <Text tt="capitalize">{view}</Text>
    </Button>
  );
};

type FeatureViewButtonGroupProps = {
  value: FeatureView;
  setter: (value: FeatureView) => void;
};

export const FeatureViewButtonGroup: React.FC<FeatureViewButtonGroupProps> = ({
  value,
  setter,
}) => {
  return (
    <Group>
      <Button.Group>
        {VIEWS.map((view) => (
          <FeatureViewButton
            key={view}
            view={view}
            value={value}
            setter={setter}
          />
        ))}
      </Button.Group>
    </Group>
  );
};
