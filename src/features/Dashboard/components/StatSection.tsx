import { Card, Divider, Stack } from "@mantine/core";
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
import {
  getPlaceCharacteristicCriteria,
  getReviewCriteria,
} from "@/features/Dashboard/api/getCriteria";
import { getKeywordCount } from "@/features/Dashboard/api/getKeywordCount";
import { getRatingDistribution } from "@/features/Dashboard/api/getRatingDistribution";
import { getRatingTrend } from "@/features/Dashboard/api/getRatingTrend";
import { getReviewsWithMedia } from "@/features/Dashboard/api/getReviewsWithMedia";
import { Place } from "@/types/data";

type Props = {
  place: Place;
};

const CHART_COLORS = [
  "indigo.6",
  "yellow.6",
  "teal.6",
  "gray.6",
  "blue.6",
  "green.6",
  "red.6",
];

export const StatSection: React.FC<Props> = ({ place }) => {
  const placeId = place.id;
  const [ratingDistribution, setRatingDistribution] = useState<
    PercentageBasedChartData[]
  >([]);
  const [keywordCount, setKeywordCount] = useState<CountBasedChartData[]>([]);
  const [ratingTrend, setRatingTrend] = useState<TimeBasedChartData[]>([]);
  const [placeCharacteristicCriteria, setPlaceCharacteristicCriteria] =
    useState<CriteriaBasedChartData[]>([]);
  const [reviewCriteria, setReviewCriteria] = useState<
    CriteriaBasedChartData[]
  >([]);
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
    getRatingTrend(placeId).then((data) => {
      setRatingTrend(
        data.data.map(({ date, MonAvg, CumAvg, RollAvg }) => {
          return { date, MonAvg, CumAvg, RollAvg };
        }),
      );
    });
    getReviewsWithMedia(placeId).then((data) => {
      setReviewsWithMedia([
        {
          name: "Has Media",
          value: data.has_media,
          color: CHART_COLORS[0],
        },
        {
          name: "No Media",
          value: data.no_media,
          color: CHART_COLORS[1],
        },
      ]);
    });
    getPlaceCharacteristicCriteria(placeId).then((data) => {
      setPlaceCharacteristicCriteria(data);
    });
    getReviewCriteria(placeId).then((data) => {
      setReviewCriteria(data);
    });
  }, [placeId]);
  return (
    <Card withBorder>
      <Stack>
        <CriteriaBasedChart
          data={placeCharacteristicCriteria}
          title="Place Characteristics"
        />
        <Divider />
        <CriteriaBasedChart data={reviewCriteria} title="Review Data" />
        <Divider />
        <TimeBasedChart data={ratingTrend} title="Rating Trend" />
        <Divider />
        <CountBasedChart data={keywordCount} title="Keywords" />
        <Divider />
        <PercentageBasedChart
          data={ratingDistribution}
          title="★ Rating Percentage"
        />
        <Divider />
        <PercentageBasedChart
          data={reviewsWithMedia}
          title="Reviews with Media"
        />
      </Stack>
    </Card>
  );
};

export const Component = StatSection;
Component.displayName = "DashboardPage";
