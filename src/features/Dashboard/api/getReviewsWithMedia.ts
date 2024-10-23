import api from "@/lib/api";

export type GetReviewsWithMediaResponse = {
  label: string;
  amount: number;
}[];

const MOCK_REVIEWS_WITH_MEDIA: GetReviewsWithMediaResponse = [
  { label: "Has Media", amount: 100 },
  { label: "No Media", amount: 200 },
];

export const getMockReviewsWithMedia = async (placeId: string) => {
  return new Promise<GetReviewsWithMediaResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_REVIEWS_WITH_MEDIA);
    }, 500);
  });
};

export const getReviewsWithMedia = async (placeId: string) => {
  const response = await api.get<GetReviewsWithMediaResponse>(
    `/v1/dashboard/reviews/${placeId}`,
  );
  return response.data;
};
