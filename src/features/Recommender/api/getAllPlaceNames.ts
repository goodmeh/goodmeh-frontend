import api from "@/lib/api";

export const getAllPlaceNames = async () => {
  const response = await api.get<Record<string, string>>("/v1/places");
  return response.data;
};
