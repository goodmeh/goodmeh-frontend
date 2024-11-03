import { Group, Image, Text } from "@mantine/core";

import GoodmehLogo from "@/assets/logo/GoodmehLogo.svg";

import classes from "./WelcomeTitle.module.scss";

export const WelcomeTitle: React.FC = () => {
  return (
    <>
      <Group align="center" justify="center">
        <Image src={GoodmehLogo} height={160} my="md" />
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
