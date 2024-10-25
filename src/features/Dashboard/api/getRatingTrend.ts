import api from "@/lib/api";

export type GetRatingTrendResponse = {
  name: string;
  data: {
    date: string;
    MonAvg: number | null;
    CumAvg: number | null;
    RollAvg: number | null;
  }[];
};

const MOCK_RATING_TREND: GetRatingTrendResponse = {
  name: "Monthly Average Rating",
  data: [
    { date: "Jan 2023", MonAvg: 4.5, CumAvg: 4.5, RollAvg: 4.8 },
    { date: "Feb 2023", MonAvg: 4.0, CumAvg: 4.25, RollAvg: 4.3 },
    { date: "Mar 2023", MonAvg: 3.8, CumAvg: 4.05, RollAvg: 4.1 },
    { date: "Apr 2023", MonAvg: 3.5, CumAvg: 3.85, RollAvg: 3.5 },
    { date: "May 2023", MonAvg: 3.0, CumAvg: 3.6, RollAvg: 3.1 },
    { date: "Jun 2023", MonAvg: 2.8, CumAvg: 3.4, RollAvg: 3.4 },
    { date: "Jul 2023", MonAvg: 2.5, CumAvg: 3.2, RollAvg: 3.2 },
    { date: "Aug 2023", MonAvg: 4.0, CumAvg: 3.4, RollAvg: 3.4 },
    { date: "Sep 2023", MonAvg: 3.8, CumAvg: 3.6, RollAvg: 3.6 },
    { date: "Oct 2023", MonAvg: 3.5, CumAvg: 3.85, RollAvg: 3.3 },
    { date: "Nov 2023", MonAvg: 4.0, CumAvg: 4.05, RollAvg: 4.05 },
    { date: "Dec 2023", MonAvg: 3.8, CumAvg: 4.25, RollAvg: 4.2 },
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
