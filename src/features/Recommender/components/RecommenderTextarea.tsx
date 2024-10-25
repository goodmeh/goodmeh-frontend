import {
  ActionIcon,
  Combobox,
  Pill,
  Textarea,
  useCombobox,
} from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
import { useMemo, useState } from "react";

import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";

import classes from "./RecommenderTextarea.module.scss";

export const RecommenderTextarea: React.FC = () => {
  const [value, setValue] = useState("");
  const availablePlaces = useAppSelector((state) => state.places);
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([]);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const filteredPlaces = useMemo(
    () =>
      value
        ? Object.values(availablePlaces)
            .filter(
              (place) =>
                place.name.toLowerCase().includes(value.toLowerCase()) &&
                !selectedPlaces.some((p) => p.id === place.id),
            )
            .slice(0, 5)
        : [],
    [availablePlaces, selectedPlaces, value],
  );
  const onOptionSubmit = (value: string) => {
    setSelectedPlaces((places) => [...places, availablePlaces[value]]);
    setValue("");
  };

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
                disabled={selectedPlaces.length === 0}
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
            {selectedPlaces.map((place) => (
              <Pill
                key={place.id}
                withRemoveButton
                onRemove={() =>
                  setSelectedPlaces((places) =>
                    places.filter((p) => p.id !== place.id),
                  )
                }
              >
                {place.name}
              </Pill>
            ))}
          </div>
        </div>
      </Combobox.Target>
      <Combobox.Dropdown hidden={filteredPlaces.length === 0}>
        <Combobox.Options>
          {filteredPlaces.map((place) => (
            <Combobox.Option key={place.id} value={place.id}>
              {place.name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
