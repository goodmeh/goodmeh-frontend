import api from "@/lib/api";
import { Review } from "@/types/data";

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    place_id: "place1",
    user: {
      id: "user1",
      name: "Alice Johnson",
      photo_uri:
        "https://lh3.googleusercontent.com/a/ACg8ocLvs_SFC6ZlpqyUkEUqvAmSDMEmGL2GmcY12taGgkOQso4Qxw=s120-c-rp-mo-ba6-br100",
      rating_count: 15,
      review_count: 10,
      photo_count: 5,
      is_local_guide: true,
    },
    rating: 4.5,
    text: "Great experience! The food was delicious and the service was excellent.",
    created_at: "2024-03-15T14:30:00Z",
    weight: 0.8,
    place_name: "Tasty Bites Restaurant",
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipMXQc9wTQbHSfHB1bcEnJ1R0lMZAe_vshkxL91r",
      "https://lh5.googleusercontent.com/p/AF1QipOrBm0Teip7iKHFpNFF91uY-uQKP9_U5xmQAayP",
    ],
    summary:
      "Great experience! The food was delicious and the service was excellent.",
    business_summary:
      "The food was delicious and the service was excellent. The ambiance was great and the food was delicious. The service was excellent. The ambiance was great and the food was delicious. The service was excellent.",
  },
  {
    id: "2",
    place_id: "place1",
    user: {
      id: "user2",
      name: "Bob Smith",
      photo_uri:
        "https://lh3.googleusercontent.com/a/ACg8ocLvs_SFC6ZlpqyUkEUqvAmSDMEmGL2GmcY12taGgkOQso4Qxw=s120-c-rp-mo-ba6-br100",
      rating_count: 8,
      review_count: 6,
      photo_count: 2,
      is_local_guide: true,
    },
    rating: 3.5,
    text: "Decent place, but a bit overpriced for what you get.",
    created_at: "2024-03-10T18:45:00Z",
    weight: 0.6,
    place_name: "Tasty Bites Restaurant",
    image_urls: [],
    summary: "Decent place, but a bit overpriced for what you get.",
    business_summary:
      "The food was delicious and the service was excellent. The ambiance was great and the food was delicious. The service was excellent. The ambiance was great and the food was delicious. The service was excellent.",
  },
  {
    id: "3",
    place_id: "place1",
    user: {
      id: "user3",
      name: "Carol Davis",
      photo_uri:
        "https://lh3.googleusercontent.com/a/ACg8ocLvs_SFC6ZlpqyUkEUqvAmSDMEmGL2GmcY12taGgkOQso4Qxw=s120-c-rp-mo-ba6-br100",
      rating_count: 20,
      review_count: 18,
      photo_count: 12,
      is_local_guide: false,
    },
    rating: 5,
    text: "Absolutely fantastic! The ambiance, food, and service were all top-notch.",
    created_at: "2024-03-05T20:15:00Z",
    weight: 0.9,
    place_name: "Tasty Bites Restaurant",
    image_urls: [
      "https://lh5.googleusercontent.com/p/AF1QipPhJuAmlsYeBFyAxaveWrYPjDMYwSE8ecJPBpB7",
      "https://lh5.googleusercontent.com/p/AF1QipMbMamq64_3toOR64KkISt7InjdZwh0bSSiFRH8",
      "https://lh5.googleusercontent.com/p/AF1QipOFgUK8NQtqbuS3BM-rE3dIIQ8EVMmazYEzy2Kl",
    ],
    summary:
      "Absolutely fantastic! The ambiance, food, and service were all top-notch.",
    business_summary:
      "The food was delicious and the service was excellent. The ambiance was great and the food was delicious. The service was excellent. The ambiance was great and the food was delicious. The service was excellent.",
  },
];

type GetPlaceReviewsResponse = {
  data: Review[];
  has_next: boolean;
};

export const getMockPlaceReviews = async (
  id: string,
): Promise<GetPlaceReviewsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: MOCK_REVIEWS,
        has_next: false,
      });
    }, 500);
  });
};

export const getPlaceReviews = async (id: string, page: number) => {
  const response = await api.get<GetPlaceReviewsResponse>(
    `/v1/places/${id}/reviews?page=${page}`,
  );
  return response.data;
};
