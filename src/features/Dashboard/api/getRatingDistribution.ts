import api from "@/lib/api";

export type GetRatingDistributionResponse = {
  rating_count: {
    [key: string]: number;
  };
  total_count: number;
};

const MOCK_RATING_DISTRIBUTION: GetRatingDistributionResponse = {
  rating_count: {
    "1": 11,
    "2": 9,
    "3": 37,
    "4": 99,
    "5": 390,
  },
  total_count: 546,
};

export const getMockRatingDistribution = async (placeId: string) => {
  return new Promise<GetRatingDistributionResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RATING_DISTRIBUTION);
    }, 500);
  });
};

export const getRatingDistribution = async (placeId: string) => {
  const response = await api.get<GetRatingDistributionResponse>(
    `/v1/dashboard/rating-count/${placeId}`,
  );
  return response.data;
};
