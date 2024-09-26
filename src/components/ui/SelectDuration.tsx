import { Select } from "@mantine/core";

export const SelectDuration: React.FC<{
  onChange: (value: string) => void;
}> = ({ onChange }) => {
  return (
    <Select
      defaultValue="All Time"
      data={[
        "All Time",
        "Past Week",
        "Past Month",
        "Past 6 Months",
        "Past Year",
      ]}
      onChange={(value) => onChange(value ?? "All Time")}
    />
  );
};
