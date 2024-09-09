import { SafeOmit } from "@/types/helpers";
import { Autocomplete, AutocompleteProps } from "@mantine/core";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

type Props = {
  /**
   * This function is called whenever the value of the input changes.
   */
  onChange?: (value: string) => void;
  /**
   * This function is called whenever a suggestion is selected.
   */
  onSelectSuggestion?: (
    value: google.maps.places.AutocompletePrediction,
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
      data={data.map((suggestion) => suggestion.description)}
      disabled={!places}
      onOptionSubmit={(value) =>
        onSelectSuggestion?.(
          data.find((suggestion) => suggestion.description === value)!,
        )
      }
      {...props}
    />
  );
};
