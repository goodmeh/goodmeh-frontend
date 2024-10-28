import api from "@/lib/api";

export type GetReviewsWithMediaResponse = {
  has_media: number;
  no_media: number;
  total_count: number;
};

const MOCK_REVIEWS_WITH_MEDIA: GetReviewsWithMediaResponse = {
  has_media: 400,
  no_media: 200,
  total_count: 600,
};

export const getMockReviewsWithMedia = async (placeId: string) => {
  return new Promise<GetReviewsWithMediaResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_REVIEWS_WITH_MEDIA);
    }, 500);
  });
};

export const getReviewsWithMedia = async (placeId: string) => {
  const response = await api.get<GetReviewsWithMediaResponse>(
    `/v1/dashboard/reviews-with-media/${placeId}`,
  );
  return response.data;
};
