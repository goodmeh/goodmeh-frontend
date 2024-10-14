import api from "@/lib/api";

export type GetReviewAgeResponse = {
  dateCreated: string;
  count: number;
}[];

const MOCK_REVIEW_AGE: GetReviewAgeResponse = [
  { dateCreated: "2020", count: 100 },
  { dateCreated: "2021", count: 200 },
  { dateCreated: "2022", count: 300 },
  { dateCreated: "2023", count: 400 },
  { dateCreated: "2024", count: 500 },
];

export const getMockReviewAge = async (placeId: string) => {
  return new Promise<GetReviewAgeResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_REVIEW_AGE);
    }, 500);
  });
};

export const getReviewAge = async (placeId: string) => {
  // to be changed when backend is ready
  const response = await api.get<GetReviewAgeResponse>(
    `/v1/dashboard/review-age/${placeId}`,
  );
  return response.data;
};
