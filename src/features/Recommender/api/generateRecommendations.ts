import { discoverPlaces } from "@/features/Discover/api/discoverPlaces";
import api from "@/lib/api";
import { Place } from "@/types/data";

export const generateMockRecommendation = (placeIds: string[]) =>
  discoverPlaces().then((places) => places[0]);

export const generateRecommendation = async (placeIds: string[]) => {
  const params = new URLSearchParams();
  placeIds.forEach((placeId, index) => {
    params.set(`place_id_${index + 1}`, placeId);
  });
  const response = await api.get<Place[]>("/v1/recommend", { params });
  return response.data[0];
};
