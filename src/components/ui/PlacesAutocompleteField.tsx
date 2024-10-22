import {
  Autocomplete,
  AutocompleteProps,
  CloseButton,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconSwitchHorizontal } from "@tabler/icons-react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useMemo } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

import { useAppSelector } from "@/stores/store";
import { Place } from "@/types/data";
import { SafeOmit } from "@/types/helpers";

type Props = {
  placeId?: string;
  showCompareButton?: boolean;
  onClickCompare?: () => void;
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
} & SafeOmit<AutocompleteProps, "value" | "onChange" | "data">;

export const PlacesAutocompleteField: React.FC<Props> = ({
  placeId,
  showCompareButton,
  onClickCompare,
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
    onClear?.();
  };

  const findByMainText = useCallback(
    (address: string) => {
      return data.find(
        (suggestion) =>
          address ===
          `${suggestion.structured_formatting.main_text}, ${suggestion.structured_formatting.secondary_text}`,
      );
    },
    [data],
  );

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
    <Autocomplete
      value={value}
      onChange={setValue}
      data={data.map(
        (suggestion) =>
          `${suggestion.structured_formatting.main_text}, ${suggestion.structured_formatting.secondary_text}`,
      )}
      disabled={!placesLibrary}
      onOptionSubmit={(value) => onSelectSuggestion?.(findByMainText(value))}
      rightSection={
        showCompareButton ? (
          <Tooltip label="Compare with another place">
            <CloseButton
              aria-label="Compare with another place"
              onClick={onClickCompare}
              icon={<IconSwitchHorizontal />}
            />
          </Tooltip>
        ) : (
          <CloseButton aria-label="Clear input" onClick={onClearInput} />
        )
      }
      renderOption={({ option }) => (
        <SuggestionOption suggestion={findByMainText(option.value)} />
      )}
      filter={({ options }) => options}
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
