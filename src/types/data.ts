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
