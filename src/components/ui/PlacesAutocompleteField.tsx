import {
  CloseButton,
  Combobox,
  Input,
  InputProps,
  ScrollArea,
  Text,
  useCombobox,
} from "@mantine/core";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect, useMemo } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";

type Props = {
  placeId?: string;
  /**
   * This function is called whenever the value of the input changes.
   */
  onChange?: (value: string) => void;
  /**
   * This function is called whenever a suggestion is selected.
   */
  onSelectSuggestion?: (
    value: google.maps.places.AutocompletePrediction | undefined,
  ) => void;
  onClear?: () => void;
} & InputProps;

export const PlacesAutocompleteField: React.FC<Props> = ({
  placeId,
  onChange,
  onSelectSuggestion,
  onClear,
  ...props
}) => {
  const placesLibrary = useMapsLibrary("places");
  const places = useAppSelector((state) => state.places);
  const place = useMemo<Place | undefined>(
    () => places[placeId ?? ""],
    [placeId, places],
  );
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const {
    value,
    setValue,
    suggestions: { data },
    init,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "sg" },
      types: ["establishment"],
    },
    initOnMount: false,
  });

  const onClearInput = () => {
    setValue("");
    onSelectSuggestion?.(undefined);
    onClear?.();
  };

  const onOptionSubmit = (value: string) => {
    const suggestion = data.find((suggestion) => suggestion.place_id === value);
    onSelectSuggestion?.(suggestion);
    setValue(suggestion?.structured_formatting.main_text ?? "");
    combobox.closeDropdown();
  };

  useEffect(() => {
    if (placesLibrary) {
      init();
    }
  }, [placesLibrary, init]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This effect should only run when the value changes
  }, [value]);

  useEffect(() => {
    if (!value) {
      setValue(place?.name ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This effect should only run when the place changes
  }, [place]);

  return (
    <Combobox store={combobox} onOptionSubmit={onOptionSubmit}>
      <Combobox.Target>
        <Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          disabled={!placesLibrary}
          rightSection={
            <CloseButton aria-label="Clear input" onClick={onClearInput} />
          }
          placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          {...props}
        />
      </Combobox.Target>
      <Combobox.Dropdown hidden={data.length === 0}>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="auto">
            {data.map((suggestion) => (
              <Combobox.Option
                key={suggestion.place_id}
                value={suggestion.place_id}
              >
                <SuggestionOption suggestion={suggestion} />
              </Combobox.Option>
            ))}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

const SuggestionOption: React.FC<{
  suggestion?: google.maps.places.AutocompletePrediction;
}> = ({ suggestion }) => {
  return (
    <div>
      <Text>{suggestion?.structured_formatting.main_text}</Text>
      <Text size="sm" c="dimmed">
        {suggestion?.structured_formatting.secondary_text}
      </Text>
    </div>
  );
};
