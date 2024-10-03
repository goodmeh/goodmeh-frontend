import { PartialStar } from "./PartialStar";

type Props = {
  rating: number;
};

export const RatingStars: React.FC<Props> = ({ rating }) => {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <PartialStar fill={rating - i} key={i} />
      ))}
    </span>
  );
};
