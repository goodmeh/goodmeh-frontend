import { Text, Title } from "@mantine/core";

import classes from "./WelcomeTitle.module.scss";

export const WelcomeTitle: React.FC = () => {
  return (
    <>
      <Title className={classes.Welcome__Title} ta="center">
        {"GoodMeh?".split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </Title>
      <Text
        className={classes.Welcome__Subtitle}
        ta="center"
        maw={580}
        mx="auto"
        fw="500"
      >
        Good or Meh? You decide lor.
      </Text>
    </>
  );
};
