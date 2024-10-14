import api from "@/lib/api";

export type GetRatingDistributionResponse = {
  rating: number;
  count: number;
}[];

export const getRatingDistribution = async (placeId: string) => {
  const response = await api.get<GetRatingDistributionResponse>(
    `/v1/places/${placeId}/rating-distribution`,
  );
  return response.data;
};
