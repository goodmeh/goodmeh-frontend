import api from "@/lib/api";

export type GetRatingDistributionResponse = {
  rating: number;
  count: number;
}[];

const MOCK_RATING_DISTRIBUTION: GetRatingDistributionResponse = [
  { rating: 1, count: 100 },
  { rating: 2, count: 200 },
  { rating: 3, count: 300 },
  { rating: 4, count: 400 },
  { rating: 5, count: 500 },
];

export const getMockRatingDistribution = async (placeId: string) => {
  return new Promise<GetRatingDistributionResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RATING_DISTRIBUTION);
    }, 500);
  });
};

export const getRatingDistribution = async (placeId: string) => {
  const response = await api.get<GetRatingDistributionResponse>(
    `/v1/places/${placeId}/rating-distribution`,
  );
  return response.data;
};
