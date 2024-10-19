import { Stack, Text } from "@mantine/core";
import { useUncontrolled } from "@mantine/hooks";

import { PlaceCard } from "@/features/Discover/components/PlaceCard";
import { PlaceCardSkeleton } from "@/features/Discover/components/PlaceCardSkeleton";
import { usePlaceLoader } from "@/hooks/usePlaceLoader";
import { Place } from "@/types/data";

import { PlacesAutocompleteField } from "./PlacesAutocompleteField";

export type PlaceSearchChildProps = {
  placeCard: React.ReactNode;
  place: Place | undefined;
  placeId: string;
};

type Props = {
  onPlaceIdChange?: (placeId: string | undefined) => void;
  children?: React.FC<PlaceSearchChildProps>;
  onClickCompare?: () => void;
  placeId?: string;
  showCompareButton?: boolean;
};

export const PlaceSearch: React.FC<Props> = ({
  onPlaceIdChange,
  children = ({ placeCard }) => placeCard,
  onClickCompare,
  placeId,
  showCompareButton = false,
}) => {
  const [effectivePlaceId, onChange] = useUncontrolled<string | undefined>({
    value: placeId,
    onChange: onPlaceIdChange,
  });
  const { place, requestStatus } = usePlaceLoader({
    placeId: effectivePlaceId,
  });

  const ChildComponent = children;
  const placeCard = place ? <PlaceCard place={place} /> : <PlaceCardSkeleton />;

  return (
    <Stack>
      <PlacesAutocompleteField
        placeholder="e.g. Haidilao Hot Pot @Northpoint City, Singapore"
        onSelectSuggestion={(location) => {
          onChange(location?.place_id ?? "");
        }}
        showCompareButton={showCompareButton}
        onClickCompare={onClickCompare}
        placeId={effectivePlaceId}
      />

      {effectivePlaceId && !requestStatus?.failed && (
        <ChildComponent
          placeCard={placeCard}
          place={place}
          placeId={effectivePlaceId}
        />
      )}
      {requestStatus?.failed && (
        <Text>
          Our servers are still {requestStatus.status.toLowerCase()} data!
          Please try again later.
        </Text>
      )}
    </Stack>
  );
};
