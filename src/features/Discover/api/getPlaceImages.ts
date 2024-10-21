import api from "@/lib/api";

const MOCK_PLACE_IMAGES: string[] = [
  "https://lh5.googleusercontent.com/p/AF1QipMXQc9wTQbHSfHB1bcEnJ1R0lMZAe_vshkxL91r",
  "https://lh5.googleusercontent.com/p/AF1QipOrBm0Teip7iKHFpNFF91uY-uQKP9_U5xmQAayP",
  "https://lh5.googleusercontent.com/p/AF1QipPhJuAmlsYeBFyAxaveWrYPjDMYwSE8ecJPBpB7",
];

export const getMockPlaceImages = async (id: string) => {
  return new Promise<GetPlaceImagesResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        data: MOCK_PLACE_IMAGES,
        has_next: false,
      });
    }, 500);
  });
};

export type GetPlaceImagesResponse = {
  data: string[];
  has_next: boolean;
};

export const getPlaceImages = async (id: string, page: number) => {
  const response = await api.get<GetPlaceImagesResponse>(
    `/v1/places/${id}/images?page=${page}`,
  );
  return response.data;
};
