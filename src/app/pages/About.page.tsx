import { Card, Container, ScrollArea, Space, Text, Title } from "@mantine/core";

export const AboutPage: React.FC = () => {
  return (
    <Container p={0} my="auto">
      <Card
        withBorder
        mah="calc(100dvh - var(--app-shell-header-offset) - var(--app-shell-padding) * 2)"
      >
        <ScrollArea.Autosize>
          <Title>The Same Old Story...</Title>
          <Space h="xl" />

          <Title order={2}>&quot;Anything also okay&quot;</Title>
          <Text>
            Always this dreaded statement when trying to decide where to go.
          </Text>

          <Space h="lg" />

          <Title order={2}>&quot;Huh, here good meh?&quot;</Title>
          <Text>
            Then somehow, every suggestion gets shot down (so much for
            &quot;anything&quot; 😒)
          </Text>

          <Space h="lg" />

          <Title order={2}>&quot;Nevermind, you decide!&quot;</Title>
          <Text>
            Ah yes, the classic move to seem easy going while dodging
            responsibility.
          </Text>

          <Space h="lg" />

          <Text>
            Sick and tired of this charade when deciding places to go?
          </Text>

          <Space h="lg" />

          <Text>So were we. But no longer now that we have...</Text>

          <Space h="lg" />

          <Title>What is GoodMeh?</Title>
          <Text>
            Using some serious tech magic (read: advanced AI and machine
            learning), GoodMeh analyzes thousands of real customer reviews to
            spot authentic experiences and filter out the noise.
            <br />
            <br />
            Think of our algorithms as your friendly lobang king who remembers
            every good (and not-so-good) place they&apos;ve ever visited, but
            without the bias. We don&apos;t just look at star ratings - anyone
            can give 5 stars, right?
            <br />
            <br />
            Instead, we dive deep into what people actually say about their
            experiences.
          </Text>
          <Space h="lg" />

          <Title order={1}>What Makes Us Different?</Title>
          <Text>
            Our mission is simple: help you find your next favorite spot without
            the usual headache. Instead of listening to influencers or paid
            reviews, we tap into something more powerful: the real experiences
            of everyday Singaporeans like you.
            <br />
            <br />
            Our smart system cuts through the noise to find those hidden gems
            that might not have the fanciest Instagram feed but will make your
            taste buds super happy. Tell us a few places you already love, and
            we&apos;ll help you discover similar spots that match your taste.
            <br />
            <br />
            No paid promotions
            <br />
            <br />
            No sponsored content
            <br />
            <br />
            No influencer bias
            <br />
            <br />
            Just real recommendations based on real experiences
          </Text>
          <Space h="lg" />

          <Title order={1}>&quot;Y&apos;all sure anot?&quot;</Title>
          <Text>
            Of course lah! We&apos;re a bunch of computer science buddies who
            got tired of asking our friends &quot;eh, where should we go
            ah?&quot; With backgrounds in mathematics, AI, and user experience
            design, we&apos;ve built GoodMeh to be harder, better, faster,
            stronger than your average recommendation engine. Whether
            you&apos;re hunting for that perfect char kway teow in a hidden
            hawker centre or a cozy cafe for your next date, we&apos;ve got your
            back. Ready to find something good? Try GoodMeh lah - confirm plus
            chop you&apos;ll discover something nice!
          </Text>
        </ScrollArea.Autosize>
      </Card>
    </Container>
  );
};

export const Component = AboutPage;
Component.displayName = "AboutPage";
