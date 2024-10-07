import {
  Autocomplete,
  AutocompleteProps,
  CloseButton,
  Text,
} from "@mantine/core";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

import { SafeOmit } from "@/types/helpers";

type Props = {
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
} & SafeOmit<AutocompleteProps, "value" | "onChange" | "data">;

export const PlacesAutocompleteField: React.FC<Props> = ({
  onChange,
  onSelectSuggestion,
  ...props
}) => {
  const places = useMapsLibrary("places");
  const {
    value,
    setValue,
    suggestions: { data },
    init,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "sg" },
    },
    initOnMount: false,
  });

  const onClearInput = () => {
    setValue("");
    onSelectSuggestion?.(undefined);
  };

  const findByMainText = useCallback(
    (mainText: string) => {
      return data.find(
        (suggestion) => suggestion.structured_formatting.main_text == mainText,
      );
    },
    [data],
  );

  useEffect(() => {
    if (places) {
      init();
    }
  }, [places, init]);

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- This effect should only run when the value changes
  }, [value]);

  return (
    <Autocomplete
      value={value}
      onChange={setValue}
      data={data.map(
        (suggestion) => suggestion.structured_formatting.main_text,
      )}
      disabled={!places}
      onOptionSubmit={(value) => onSelectSuggestion?.(findByMainText(value))}
      rightSection={
        <CloseButton aria-label="Clear input" onClick={onClearInput} />
      }
      renderOption={({ option }) => (
        <SuggestionOption suggestion={findByMainText(option.value)} />
      )}
      {...props}
    />
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
