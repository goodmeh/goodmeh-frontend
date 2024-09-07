type Location = {
  lat: number;
  lng: number;
};

export type Place = {
  id: string;
  name: string;
  location: Location;
  primaryType: string;
  imageUrl?: string;
  rating: number;
  weightedRating: number;
  userRatingCount: number;
  summary: string;
  lastUpdated: string;
};
