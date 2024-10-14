import api from "@/lib/api";

export type GetRatingTrendResponse = {
  name: string;
  data: {
    date: string;
    value: number;
  }[];
};

export const getRatingTrend = async (placeId: string) => {
  const response = await api.get<GetRatingTrendResponse>(
    `/v1/dashboard/trend/${placeId}`,
  );
  return response.data;
};
