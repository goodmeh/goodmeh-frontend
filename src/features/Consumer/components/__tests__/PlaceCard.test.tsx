import { render } from "@/test/testUtils";
import { Place } from "@/types/data";
import { screen } from "@testing-library/react";
import { format } from "date-fns";
import { PlaceCard } from "../PlaceCard";

describe("PlaceCard component", () => {
  const place: Place = {
    id: "mockId",
    name: "Sample Place",
    imageUrl: "https://example.com/image.jpg",
    weightedRating: 4.5,
    rating: 4.0,
    userRatingCount: 100,
    primaryType: "Restaurant",
    lastUpdated: new Date().toISOString(),
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
    expect(image).toHaveAttribute("src", place.imageUrl);
  });

  it("renders place rating and weighted rating", () => {
    render(<PlaceCard place={place} />);
    expect(
      screen.getByText((content) => {
        return content.includes(place.weightedRating.toFixed(1));
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) =>
        content.includes(`(${place.userRatingCount})`),
      ),
    ).toBeInTheDocument();
  });

  it("renders place primary type", () => {
    render(<PlaceCard place={place} />);
    expect(screen.getByText(place.primaryType)).toBeInTheDocument();
  });

  it("renders last updated date", () => {
    render(<PlaceCard place={place} />);
    const formattedDate = format(place.lastUpdated, "d MMM yyyy, hh:mm a");
    expect(
      screen.getByText(`Last updated: ${formattedDate}`),
    ).toBeInTheDocument();
  });
});
