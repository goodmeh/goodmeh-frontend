import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";

import {
  CountBasedChart,
  CountBasedChartData,
} from "@/components/data/CountBasedChart";
import { CriteriaBasedChart } from "@/components/data/CriteriaBasedChart";
import {
  PercentageBasedChart,
  PercentageBasedChartData,
} from "@/components/data/PercentageBasedChart";
import {
  TimeBasedChart,
  TimeBasedChartData,
} from "@/components/data/TimeBasedChart";
import { getMockKeywordCount } from "@/features/Dashboard/api/getKeywordCount";
import {
  getMockRatingDistribution,
  getRatingDistribution,
} from "@/features/Dashboard/api/getRatingDistribution";
import {
  getMockRatingTrend,
  getRatingTrend,
} from "@/features/Dashboard/api/getRatingTrend";

const CHART_COLORS = [
  "indigo.6",
  "yellow.6",
  "teal.6",
  "gray.6",
  "blue.6",
  "green.6",
  "red.6",
];

const PERCENTAGE_CHART_DATA = [
  { name: "Enthus", value: 300, color: "indigo.6" },
  { name: "Trollers", value: 300, color: "yellow.6" },
  { name: "Lurkers", value: 200, color: "teal.6" },
  { name: "Bots", value: 200, color: "gray.6" },
];

const CRITERIA_BASED_CHART_DATA = [
  { criteria: "Pricing", score: 7.8 },
  { criteria: "Confidence", score: 3.8 },
  { criteria: "Longevity", score: 8.8 },
  { criteria: "Location", score: 5.9 },
  { criteria: "Reputation", score: 9.9 },
];

const placeId = "ChIJcXPxPAAb2jERncmNWc0znBk";

const DashboardPage: React.FC = () => {
  const [ratingDistribution, setRatingDistribution] = useState<
    PercentageBasedChartData[]
  >([]);
  const [keywordCount, setKeywordCount] = useState<CountBasedChartData[]>([]);
  const [ratingTrend, setRatingTrend] = useState<TimeBasedChartData[]>([]);
  useEffect(() => {
    getMockRatingDistribution(placeId).then((data) => {
      setRatingDistribution(
        data.map(({ rating, count }, index) => {
          return {
            name: `${rating} Star`,
            value: count,
            color: CHART_COLORS[index],
          };
        }),
      );
    });
    getMockKeywordCount(placeId).then((data) => {
      setKeywordCount(
        Object.entries(data).map(([keyword, count]) => {
          return {
            keyword,
            count,
          };
        }),
      );
    });
    getMockRatingTrend(placeId).then((data) => {
      setRatingTrend(
        data.data.map(({ date, value }) => {
          return { date, value };
        }),
      );
    });
  }, []);
  return (
    <Grid gutter={50} styles={{ inner: { maxWidth: "100%" } }}>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <TimeBasedChart data={ratingTrend} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <PercentageBasedChart
          data={ratingDistribution}
          title="★ Rating Percentage"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <CriteriaBasedChart data={CRITERIA_BASED_CHART_DATA} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <PercentageBasedChart
          data={PERCENTAGE_CHART_DATA}
          title="Types of users"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <CountBasedChart data={keywordCount} />
      </Grid.Col>
    </Grid>
  );
};

export const Component = DashboardPage;
Component.displayName = "DashboardPage";
