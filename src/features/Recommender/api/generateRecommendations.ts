import { discoverPlaces } from "@/features/Discover/api/discoverPlaces";
import api from "@/lib/api";
import { Place } from "@/types/data";

export const generateMockRecommendation = (placeIds: string[]) =>
  discoverPlaces().then((places) => places[0]);

export const generateRecommendation = async (placeIds: string[]) => {
  return api.post<Place>("/v1/places/recommend", { placeIds });
};
