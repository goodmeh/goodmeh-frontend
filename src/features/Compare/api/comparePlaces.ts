import api from "@/lib/api";

export type MetricComparisonResult = {
  property: string;
  description_1: string;
  description_2: string;
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
