import { ViewMode } from "@/hooks/useViewMode";
import { Grid } from "@mantine/core";
import { FeatureCard } from "./FeatureCard";

const CONSUMER_FEATURES = [
  {
    title: "Review Quality Indicator",
    description:
      "No more inflated review scores. GoodMeh? ensures that reviews are weighted based on reviewer credibility.",
    icon: "🏆",
  },
  {
    title: "Review Filtering",
    description:
      "Filters to help you narrow down reviews based on specific criteria, such as price range, cuisine type, or amenities.",
    icon: "🔍",
  },
  {
    title: "Review Summary",
    description:
      "Get a quick overview of a business's reviews, including average rating, sentiment analysis, and more.",
    icon: "📝",
  },
  {
    title: "Review Comparison Tool",
    description:
      "Easily compare reviews across different businesses, and make informed decisions.",
    icon: "⚖️",
  },
];

const BUSINESS_FEATURES = [
  {
    title: "Business Dashboard",
    description:
      "Comprehensive dashboard to track key metrics, such as average review ratings, customer sentiment, and engagement levels.",
    icon: "📊",
  },
  {
    title: "Reputation Management",
    description:
      "Monitor and manage your online reputation, including identifying negative reviews.",
    icon: "🛡️",
  },
  {
    title: "Customer Feedback Analysis",
    description:
      "Provide detailed analysis of customer feedback, including common themes, concerns, and suggestions for improvement.",
    icon: "👂",
  },
  {
    title: "Lorem, ipsum",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, iure perferendis provident reprehenderit rem debitis!",
    icon: "⚔️",
  },
];

type FeaturesSectionProps = {
  view: ViewMode;
};

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ view }) => {
  return (
    <Grid>
      {(view == "consumer" ? CONSUMER_FEATURES : BUSINESS_FEATURES).map(
        (feature) => (
          <Grid.Col display="flex" span={6} key={feature.title}>
            <FeatureCard {...feature} />
          </Grid.Col>
        ),
      )}
    </Grid>
  );
};
