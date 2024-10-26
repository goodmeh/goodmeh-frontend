import {
  ActionIcon,
  Combobox,
  Pill,
  ScrollArea,
  Textarea,
  useCombobox,
} from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

import { getAllPlaceNames } from "../api/getAllPlaceNames";
import classes from "./RecommenderTextarea.module.scss";

export const RecommenderTextarea: React.FC = () => {
  const [placeNames, setPlaceNames] = useState<Record<string, string>>({});
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const onOptionSubmit = (placeId: string) => {
    setSelectedPlaceIds((placeIds) => [...placeIds, placeId]);
    setValue("");
  };
  const filteredData = useMemo(
    () =>
      value
        ? Object.entries(placeNames)
            .filter(([placeId, name]) =>
              name.toLowerCase().includes(value.toLowerCase()),
            )
            .map(([placeId]) => placeId)
        : [],
    [placeNames, value],
  );

  useEffect(() => {
    getAllPlaceNames().then(setPlaceNames);
  }, []);

  return (
    <Combobox store={combobox} onOptionSubmit={onOptionSubmit}>
      <Combobox.Target>
        <div className={classes.RecommenderTextarea__Wrapper}>
          <Textarea
            autosize
            minRows={5}
            placeholder="Tell us up to 3 places you love!"
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSection={
              <ActionIcon
                mt="sm"
                mr="md"
                disabled={selectedPlaceIds.length === 0}
              >
                <IconArrowUp />
              </ActionIcon>
            }
            rightSectionWidth={44}
            rightSectionProps={{
              style: {
                alignItems: "flex-start",
              },
            }}
          />

          <div className={classes.RecommenderTextarea__PillsWrapper}>
            {selectedPlaceIds.map((placeId) => (
              <Pill
                key={placeId}
                withRemoveButton
                onRemove={() =>
                  setSelectedPlaceIds((places) =>
                    places.filter((p) => p !== placeId),
                  )
                }
              >
                {placeNames[placeId]}
              </Pill>
            ))}
          </div>
        </div>
      </Combobox.Target>
      <Combobox.Dropdown hidden={filteredData.length === 0}>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="auto">
            {filteredData.map((placeId) => (
              <Combobox.Option key={placeId} value={placeId}>
                {placeNames[placeId]}
              </Combobox.Option>
            ))}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
