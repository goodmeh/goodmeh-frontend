import api from "@/lib/api";

export type GetKeywordCountResponse = {
  [keyword: string]: number;
};

const MOCK_KEYWORD_COUNT: GetKeywordCountResponse = {
  friendly: 67,
  service: 56,
  staff: 56,
  "great coffee": 13,
  "good coffee": 18,
  cafe: 64,
  waffles: 45,
  white: 41,
  latte: 41,
  magic: 18,
};
export const getMockKeywordCount = async (placeId: string) => {
  return new Promise<GetKeywordCountResponse>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_KEYWORD_COUNT);
    }, 500);
  });
};

export const getKeywordCount = async (placeId: string) => {
  const response = await api.get<GetKeywordCountResponse>(
    `/v1/dashboard/keywords/${placeId}`,
  );
  return response.data;
};
