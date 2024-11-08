import {
  CloseButton,
  Combobox,
  Input,
  InputProps,
  ScrollArea,
  Text,
  useCombobox,
} from "@mantine/core";
import { useDisclosure, useSessionStorage } from "@mantine/hooks";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { sample } from "es-toolkit";
import React, { InputHTMLAttributes, useEffect, useMemo, useRef } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";

const PLACE_SEARCH_PLACEHOLDERS = [
  "Search to see if worth going anot",
  "Come search! See if good or meh",
  "Can try search 'Hai Di Lao'",
  "Sure good or not? Check first lah!",
  "Search to see if the place power or not",
  "Search and see if steady bom pi pi~",
];

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
  exceptPlaceId?: string;
} & InputProps &
  InputHTMLAttributes<HTMLInputElement>;

export const PlacesAutocompleteField: React.FC<Props> = ({
  placeId,
  onChange,
  onSelectSuggestion,
  onClear,
  exceptPlaceId,
  ...props
}) => {
  const placesLibrary = useMapsLibrary("places");
  const places = useAppSelector((state) => state.places);
  const place = useMemo<Place | undefined>(
    () => places[placeId ?? ""],
    [placeId, places],
  );
  const [isDropdownOpen, { open, close }] = useDisclosure(false);
  const combobox = useCombobox({
    opened: isDropdownOpen,
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const placeholder = useRef(sample(PLACE_SEARCH_PLACEHOLDERS));
  const [placeNames, setPlaceNames] = useSessionStorage<
    Record<string, google.maps.places.AutocompletePrediction>
  >({
    key: "placeNames",
    defaultValue: {},
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
    combobox.targetRef.current?.blur();
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
      setValue(
        place?.name ??
          placeNames[placeId ?? ""]?.structured_formatting.main_text ??
          "",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This effect should only run when the place changes
  }, [placeId, place, !!placeNames[placeId ?? ""]]);

  useEffect(() => {
    setPlaceNames((prev) => ({
      ...prev,
      ...Object.fromEntries(
        data.map((suggestion) => [suggestion.place_id, suggestion]),
      ),
    }));
  }, [data, setPlaceNames]);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={onOptionSubmit}
      middlewares={{ flip: false }}
    >
      <Combobox.Target>
        <Input
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          disabled={!placesLibrary}
          rightSection={
            <CloseButton aria-label="Clear input" onClick={onClearInput} />
          }
          rightSectionPointerEvents="auto"
          placeholder={placeholder.current}
          onFocus={open}
          onBlur={close}
          {...props}
        />
      </Combobox.Target>
      <Combobox.Dropdown hidden={data.length === 0}>
        <Combobox.Options>
          <ScrollArea.Autosize mah={200} type="auto">
            {(exceptPlaceId
              ? data.filter(
                  (suggestion) => suggestion.place_id !== exceptPlaceId,
                )
              : data
            ).map((suggestion) => (
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
