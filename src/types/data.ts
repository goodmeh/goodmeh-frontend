enum ScrapeStatus {
  SCRAPING = "scraping",
  SUMMARIZING = "summarizing",
  ANALYSING = "analysing",
}

export type Place = {
  id: string;
  name: string;
  rating: number;
  weighted_rating: number;
  user_rating_count: number;
  summary: string;
  last_scraped: string;
  image_url: string | null;
  primary_type: string | null;
  business_summary: string | null;
  price_range: string;
  earliest_review_date: string;
  location: {
    lat: number;
    lng: number;
  };
  accuracy: string;
  status?: ScrapeStatus;
};

export type User = {
  id: string;
  name: string;
  photo_uri: string | null;
  rating_count: number;
  review_count: number;
  photo_count: number;
  is_local_guide: boolean;
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
  summary: string | null;
  business_summary: string | null;
  reply?: {
    text: string;
    created_at: string;
  };
};
