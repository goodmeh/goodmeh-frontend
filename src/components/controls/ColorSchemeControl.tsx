import { SegmentedControl, useMantineColorScheme } from "@mantine/core";

export const ColorSchemeControl: React.FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      value={colorScheme}
      // @ts-expect-error: The value passed in is guaranteed to be one of the values in VIEW_MODES
      onChange={(value: MantineColorScheme) => setColorScheme(value)}
      data={[
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Auto", value: "auto" },
      ]}
      color="blue"
      bg={colorScheme === "light" ? "gray.4" : "gray.8"}
    />
  );
};
