import {
  ActionIcon,
  Combobox,
  Pill,
  ScrollArea,
  Textarea,
  useCombobox,
} from "@mantine/core";
import { useDebouncedState, useDisclosure } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";

import { getAllPlaceNames } from "../api/getAllPlaceNames";
import classes from "./RecommenderTextarea.module.scss";

type Props = {
  onSubmit: (placeIds: string[]) => void;
  onSelectionChange: () => void;
};

export const RecommenderTextarea: React.FC<Props> = ({
  onSubmit,
  onSelectionChange,
}) => {
  const [placeNames, setPlaceNames] = useState<Record<string, string>>({});
  const fuse = useMemo(
    () =>
      new Fuse(
        Object.entries(placeNames).map(([id, name]) => ({ id, name })),
        { keys: ["name"], minMatchCharLength: 2 },
      ),
    [placeNames],
  );
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);
  const [value, setValue] = useDebouncedState("", 300);
  const [isDropdownOpen, { open, close }] = useDisclosure();
  const combobox = useCombobox({
    opened: isDropdownOpen,
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const onOptionSubmit = (placeId: string) => {
    setSelectedPlaceIds((placeIds) => [...placeIds, placeId]);
    setValue("");
    onSelectionChange();
  };
  const filteredData = useMemo(() => {
    if (!value.trim()) return [];
    return fuse
      .search(value)
      .filter(({ item: { id } }) => !selectedPlaceIds.includes(id))
      .slice(0, 5);
  }, [value, fuse, selectedPlaceIds]);
  const onRemovePill = (placeId: string) => {
    setSelectedPlaceIds((placeIds) => placeIds.filter((p) => p !== placeId));
    onSelectionChange();
  };

  useEffect(() => {
    getAllPlaceNames().then(setPlaceNames);
  }, []);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={onOptionSubmit}
      middlewares={{ flip: false }}
    >
      <Combobox.Target>
        <div className={classes.RecommenderTextarea__Wrapper}>
          <Textarea
            readOnly={selectedPlaceIds.length === 3}
            autosize
            minRows={5}
            placeholder={
              selectedPlaceIds.length === 3
                ? "Click on the button to generate recommendation!"
                : "Tell us up to 3 places you love!"
            }
            onFocus={open}
            onBlur={close}
            defaultValue={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            rightSection={
              <ActionIcon
                mt="sm"
                mr="md"
                disabled={selectedPlaceIds.length === 0}
                onClick={() => onSubmit(selectedPlaceIds)}
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
                onRemove={() => onRemovePill(placeId)}
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
            {filteredData.map(({ item: { id, name } }) => (
              <Combobox.Option key={id} value={id}>
                {name}
              </Combobox.Option>
            ))}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
