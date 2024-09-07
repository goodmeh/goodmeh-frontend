import api from "@/lib/api";
import { Place } from "@/types";

export const getPlace = (id: string) => {
  return api.get<Place>(`/v1/places/${id}`);
};
