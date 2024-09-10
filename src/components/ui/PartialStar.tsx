import classes from "./PartialStar.module.scss";

export const PartialStar: React.FC<{ fill: number }> = ({ fill }) => {
  const fillPercentage = Math.min(fill * 100, 100);
  return (
    <span
      className={classes.PartialStar}
      style={{
        backgroundImage: `linear-gradient(
            90deg,
            var(--mantine-color-yellow-7),
            var(--mantine-color-yellow-7) ${fillPercentage}%,
            var(--mantine-color-dimmed) ${fillPercentage}%
          )`,
      }}
    >
      ★
    </span>
  );
};
