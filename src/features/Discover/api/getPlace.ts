import api from "@/lib/api";
import { Place } from "@/types/data";

const MOCK_PLACE: Place = {
  id: "ChIJ1yl3DkYR2jER0EUpkr2Eo28",
  name: "A Hot Hideout @ Bukit Panjang",
  image_url:
    "https://lh5.googleusercontent.com/p/AF1QipNzM7_3zubZ7x_kbZ3How5rsYs3s-LeZwSwjMl5=w529-h298-k-no",
  primary_type: "Chinese Restaurant",
  rating: 4.9,
  weighted_rating: 4.75,
  user_rating_count: 246,
  summary:
    "The Signature Mala Collagen Soup and Mala Stir Fry are a must-try for those seeking a unique Singaporean Mala experience. The restaurant offers a variety of ingredients, including deep-fried lotus roots, potato, and fish, and can be topped with creamy scrambled eggs. All ingredients are priced at $2.88/100g. The restaurant also offers a hidden DIY menu, including deep-fried mantou dipped in peanut sauce for a special peanut butter topping. The food is delicious, but there is a long wait time due to an unexpected equipment malfunction. The secret powder is a must-try, and the Mala Collagen Soup is a must-try.",
  last_scraped: "2024-09-07T14:55:50.855Z",
};

export const getMockPlace = async (id: string) => {
  if (id !== MOCK_PLACE.id) {
    return;
  }
  return new Promise<Place>((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PLACE);
    }, 500);
  });
};

export type RequestPlaceStatusResponse = {
  status: string;
  failed: boolean;
};

type GetPlaceResponse = Place | RequestPlaceStatusResponse;

export const getPlace = async (id: string) => {
  const response = await api.post<GetPlaceResponse>(`/v1/places/${id}`);
  return response.data;
};