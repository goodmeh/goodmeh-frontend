import { Grid, GridColProps, useMatches } from "@mantine/core";

import { useViewMode } from "@/hooks/useViewMode";

import { FeatureCard } from "./FeatureCard";

const CONSUMER_FEATURES = [
  {
    title: "Keeping It Real",
    description:
      "No more inflated review scores. GoodMeh? ensures that reviews are weighted based on reviewer credibility.",
    icon: "🏆",
  },
  {
    title: "Narrowing It Down",
    description:
      "Filters to help you narrow down reviews based on specific criteria, such as price range, cuisine type, or amenities.",
    icon: "🔍",
  },
  {
    title: "Shorter & Clearer Reviews",
    description:
      "Get a quick overview of a business's reviews, including average rating, sentiment analysis, and more.",
    icon: "📝",
  },
  {
    title: "Choosing Easily & Quickly",
    description:
      "Easily compare different businesses, and make informed decisions on which one to go with.",
    icon: "⚖️",
  },
];

const BUSINESS_FEATURES = [
  {
    title: "Monitor Key Business Metrics",
    description:
      "Comprehensive dashboard to track key metrics, such as average review ratings, customer sentiment, and engagement levels.",
    icon: "📊",
  },
  {
    title: "Manage Reputation & Service Recovery",
    description:
      "Monitor and manage your online reputation, including identifying negative reviews.",
    icon: "🛡️",
  },
  {
    title: "Analyze Customer Feedback",
    description:
      "Provide detailed analysis of customer feedback, including common themes, concerns, and suggestions for improvement.",
    icon: "👂",
  },
  {
    title: "Research Competitor Offerings",
    description:
      "Find out what your competitors are doing, identify gaps in the market, and improve your business.",
    icon: "⚔️",
  },
];

export const FeaturesSection: React.FC = () => {
  const { viewMode } = useViewMode();
  const span = useMatches<GridColProps["span"]>({
    base: 12,
    xs: 6,
  });

  return (
    <Grid>
      {(viewMode == "consumer" ? CONSUMER_FEATURES : BUSINESS_FEATURES).map(
        (feature) => (
          <Grid.Col display="flex" span={span} key={feature.title}>
            <FeatureCard {...feature} />
          </Grid.Col>
        ),
      )}
    </Grid>
  );
};
