import api from "@/lib/api";
import { Place } from "@/types/data";

export type PlacePreviewResponse = {
  id: string;
  name: string;
  rating: number;
  user_rating_count: number;
  last_scraped: string;
  image_url: string | null;
  primary_type: string | null;
};

export const discoverPlaces = async (): Promise<PlacePreviewResponse[]> => {
  const response = await api.get<Place[]>("/v1/places/discover");
  return response.data;
};
