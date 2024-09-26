import { screen } from "@testing-library/react";
import { format } from "date-fns";

import { render } from "@/test/testUtils";
import { Place } from "@/types/data";

import { PlaceCard } from "../PlaceCard";

describe("PlaceCard component", () => {
  const place: Place = {
    id: "mockId",
    name: "Sample Place",
    image_url: "https://example.com/image.jpg",
    weighted_rating: 4.5,
    rating: 4.0,
    user_rating_count: 100,
    primary_type: "Restaurant",
    last_scraped: new Date().toISOString(),
    summary: "This is a sample place summary.",
  };

  it("renders place name", () => {
    render(<PlaceCard place={place} />);
    expect(screen.getByText(place.name)).toBeInTheDocument();
  });

  it("renders place image if imageUrl is provided", () => {
    render(<PlaceCard place={place} />);
    const image = screen.getByAltText(place.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", place.image_url);
  });

  it("renders place rating", () => {
    render(<PlaceCard place={place} />);
    expect(
      screen.getByText((content) => {
        return content.includes(place.rating.toFixed(1));
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(`(${place.user_rating_count})`),
      ),
    ).toBeInTheDocument();
  });

  it("renders place primary type", () => {
    render(<PlaceCard place={place} />);
    expect(screen.getByText(place.primary_type)).toBeInTheDocument();
  });

  it("renders last updated date", () => {
    render(<PlaceCard place={place} />);
    const formattedDate = format(place.last_scraped, "d MMM yyyy, hh:mm a");
    expect(
      screen.getByText(`Last updated: ${formattedDate}`),
    ).toBeInTheDocument();
  });
});
