import { useViewMode, VIEW_MODES } from "@/hooks/useViewMode";
import { SegmentedControl, useMantineColorScheme } from "@mantine/core";
import { capitalize } from "es-toolkit";

export const ViewModeControl: React.FC = () => {
  const { mode, setMode } = useViewMode();
  const { colorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      value={mode}
      // @ts-expect-error: The value passed in is guaranteed to be one of the values in VIEW_MODES
      onChange={setMode}
      data={VIEW_MODES.map((view) => ({
        value: view,
        label: capitalize(view),
      }))}
      color="blue"
      bg={colorScheme === "light" ? "gray.4" : "gray.8"}
    />
  );
};
