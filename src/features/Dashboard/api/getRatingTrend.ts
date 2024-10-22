import api from "@/lib/api";

export type GetRatingTrendResponse = {
  name: string;
  data: {
    date: string;
    value: number | null;
  }[];
};

const MOCK_RATING_TREND: GetRatingTrendResponse = {
  name: "Monthly Average Rating",
  data: [
    { date: "Jan 2023", value: 3.5 },
    { date: "Feb 2023", value: 4.0 },
    { date: "Mar 2023", value: 3.8 },
    { date: "Apr 2023", value: 3.5 },
    { date: "May 2023", value: null },
    { date: "Jun 2023", value: 3.8 },
    { date: "Jul 2023", value: 3.5 },
    { date: "Aug 2023", value: 4.0 },
    { date: "Sep 2023", value: 3.8 },
    { date: "Oct 2023", value: 3.5 },
    { date: "Nov 2023", value: 4.0 },
    { date: "Dec 2023", value: 3.8 },
  ],
};

export const getMockRatingTrend = async (placeId: string) => {
  return new Promise<GetRatingTrendResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_RATING_TREND);
    }, 500);
  });
};

export const getRatingTrend = async (placeId: string) => {
  const response = await api.get<GetRatingTrendResponse>(
    `/v1/dashboard/trend/${placeId}`,
  );
  return response.data;
};
