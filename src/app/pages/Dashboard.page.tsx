import { Grid } from "@mantine/core";
import { useEffect, useState } from "react";

import {
  CountBasedChart,
  CountBasedChartData,
} from "@/components/data/CountBasedChart";
import {
  CriteriaBasedChart,
  CriteriaBasedChartData,
} from "@/components/data/CriteriaBasedChart";
import {
  PercentageBasedChart,
  PercentageBasedChartData,
} from "@/components/data/PercentageBasedChart";
import {
  TimeBasedChart,
  TimeBasedChartData,
} from "@/components/data/TimeBasedChart";
import { getCriteria } from "@/features/Dashboard/api/getCriteria";
import { getKeywordCount } from "@/features/Dashboard/api/getKeywordCount";
import { getRatingDistribution } from "@/features/Dashboard/api/getRatingDistribution";
import { getMockRatingTrend } from "@/features/Dashboard/api/getRatingTrend";
import { getMockReviewsWithMedia } from "@/features/Dashboard/api/getReviewsWithMedia";
const CHART_COLORS = [
  "indigo.6",
  "yellow.6",
  "teal.6",
  "gray.6",
  "blue.6",
  "green.6",
  "red.6",
];

const placeId = "ChIJcXPxPAAb2jERncmNWc0znBk";

const DashboardPage: React.FC = () => {
  const [ratingDistribution, setRatingDistribution] = useState<
    PercentageBasedChartData[]
  >([]);
  const [keywordCount, setKeywordCount] = useState<CountBasedChartData[]>([]);
  const [ratingTrend, setRatingTrend] = useState<TimeBasedChartData[]>([]);
  const [reviewAge, setReviewAge] = useState<PercentageBasedChartData[]>([]);
  const [criteria, setCriteria] = useState<CriteriaBasedChartData[]>([]);
  const [reviewsWithMedia, setReviewsWithMedia] = useState<
    PercentageBasedChartData[]
  >([]);
  useEffect(() => {
    getRatingDistribution(placeId).then((data) => {
      setRatingDistribution(
        Object.entries(data.rating_count).map(([rating, count], index) => {
          return {
            name: `${rating} Star`,
            value: count,
            color: CHART_COLORS[index],
          };
        }),
      );
    });
    getKeywordCount(placeId).then((data) => {
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
        data.data.map(({ date, MonAvg, CumAvg, RollAvg }) => {
          return { date, MonAvg, CumAvg, RollAvg };
        }),
      );
    });
    getMockReviewsWithMedia(placeId).then((data) => {
      setReviewsWithMedia(
        data.map(({ label, amount }, index) => {
          return {
            name: label,
            value: amount,
            color: CHART_COLORS[index],
          };
        }),
      );
    });
    getCriteria(placeId).then((data) => {
      setCriteria(data);
    });
  }, []);
  return (
    <Grid gutter={50} styles={{ inner: { maxWidth: "100%" } }}>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <TimeBasedChart data={ratingTrend} title="Rating Trend" />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <PercentageBasedChart
          data={ratingDistribution}
          title="★ Rating Percentage"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <CriteriaBasedChart data={criteria} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <PercentageBasedChart
          data={reviewsWithMedia}
          title="Reviews with Media"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <CountBasedChart data={keywordCount} title="Keywords" />
      </Grid.Col>
    </Grid>
  );
};

export const Component = DashboardPage;
Component.displayName = "DashboardPage";
