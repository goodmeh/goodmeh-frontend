import { Group, Text } from "@mantine/core";

import GoodmehLogo from "@/assets/logo/GoodMehLogo.svg";

import classes from "./WelcomeTitle.module.scss";

export const WelcomeTitle: React.FC = () => {
  return (
    <>
      <Group align="center" justify="center">
        {/* <GoodmehLogo height={200} pointerEvents="none" /> */}
        <img src={GoodmehLogo} alt="GoodMeh Logo" />
      </Group>
      <Text
        className={classes.Welcome__Subtitle}
        ta="center"
        maw={580}
        mx="auto"
        fw="700"
      >
        good or meh? you decide lor.
      </Text>
    </>
  );
};
