import { Title } from "@mantine/core";
import classes from "./WelcomeTitle.module.scss";

export const WelcomeTitle: React.FC = () => {
  return (
    <>
      <Title className={classes.title} ta="center">
        {"GoodMeh?".split("").map((char) => (
          <span>{char}</span>
        ))}
      </Title>
      <Title order={6} size="h1" ta="center" maw={580} mx="auto" fw="500">
        Good or Meh? You decide lor.
      </Title>
    </>
  );
};
