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
  onSelect?: (value: string) => void;
} & Omit<AutocompleteProps, "value" | "onChange" | "data">;

export const PlacesAutocompleteField: React.FC<Props> = ({
  onChange,
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
  }, [value, onChange]);

  return (
    <Autocomplete
      value={value}
      onChange={setValue}
      data={data.map((suggestion) => suggestion.description)}
      disabled={!places}
      {...props}
    />
  );
};
