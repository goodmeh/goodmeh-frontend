import { Center, Image, Text } from "@mantine/core";

import classes from "./HeroSection.module.scss";

type Props = {
  imageUrl: string;
  title: string;
};

export const HeroSection: React.FC<Props> = ({ imageUrl, title }) => {
  return (
    <div>
      <Center>
        <Image
          src={imageUrl}
          h={{ base: 100, xs: 130, sm: 160 }}
          w="auto"
          my="md"
        />
      </Center>
      <Text
        className={classes.HeroSection__Title}
        ta="center"
        mx="auto"
        fw="700"
      >
        {title}
      </Text>
    </div>
  );
};
