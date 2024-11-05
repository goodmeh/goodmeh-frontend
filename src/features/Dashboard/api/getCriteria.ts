import api from "@/lib/api";

export type GetCriteriaResponse = {
  criteria: string;
  score: number;
}[];

const MOCK_CRITERIA: GetCriteriaResponse = [
  { criteria: "Instagrammable", score: 5 },
  { criteria: "Years Established", score: 7.7 },
  { criteria: "Pricing", score: 1 },
  { criteria: "Review Confidence", score: 4 },
  { criteria: "Review Credibility", score: 9 },
  { criteria: "Centrality", score: 5 },
];

export const getMockCriteria = async (placeId: string) => {
  return new Promise<GetCriteriaResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CRITERIA);
    }, 500);
  });
};

export const getPlaceCharacteristicCriteria = async (placeId: string) => {
  const response = await api.get<GetCriteriaResponse>(
    `/v1/dashboard/criteria/place-characteristics/${placeId}`,
  );
  return response.data;
};

export const getReviewCriteria = async (placeId: string) => {
  const response = await api.get<GetCriteriaResponse>(
    `/v1/dashboard/criteria/reviews/${placeId}`,
  );
  return response.data;
};
