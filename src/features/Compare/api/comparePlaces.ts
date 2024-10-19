import api from "@/lib/api";
import { AudienceLabel } from "@/types/data";

export type MetricComparisonResult = {
  property: AudienceLabel;
  score_1: number;
  score_2: number;
  description_1: AudienceLabel;
  description_2: AudienceLabel;
  is_place_1_better: boolean | null;
};

export type ComparePlacesResponse = MetricComparisonResult[];

export const comparePlaces = async (placeId1: string, placeId2: string) => {
  const response = await api.get<ComparePlacesResponse>(`/v1/places/compare`, {
    params: {
      place_id_1: placeId1,
      place_id_2: placeId2,
    },
  });
  return response.data;
};
