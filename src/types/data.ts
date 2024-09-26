export type Place = {
  id: string;
  name: string;
  primary_type: string;
  image_url?: string;
  rating: number;
  weighted_rating: number;
  user_rating_count: number;
  summary: string;
  last_scraped: string;
};

export type User = {
  id: string;
  name: string;
  photo_uri: string | null;
  rating_count: number;
  review_count: number;
  photo_count: number;
};

export type Review = {
  id: string;
  place_id: string;
  user: User;
  rating: number;
  text: string;
  created_at: string;
  weight: number;
  place_name: string;
  image_urls: string[];
};
