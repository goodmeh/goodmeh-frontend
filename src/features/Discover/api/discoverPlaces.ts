import api from "@/lib/api";
import { Place } from "@/types/data";

export const discoverPlaces = async (): Promise<Place[]> => {
  const response = await api.get<Place[]>("/v1/places/discover");
  return response.data;
};
