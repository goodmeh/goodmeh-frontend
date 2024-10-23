import api from "@/lib/api";
import { AudienceLabel } from "@/types/data";

export type MetricComparisonResult = {
  property: AudienceLabel;
  metric_1: PlaceMetricData;
  metric_2: PlaceMetricData;
  is_place_1_better: boolean | null;
};

export type PlaceMetricData = {
  property: AudienceLabel;
  normalized_score: number;
  level: number;
  description: AudienceLabel;
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
