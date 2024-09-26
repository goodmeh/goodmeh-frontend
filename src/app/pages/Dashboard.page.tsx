import { Grid } from "@mantine/core";

import { CountBasedChart } from "@/components/data/CountBasedChart";
import { CriteriaBasedChart } from "@/components/data/CriteriaBasedChart";
import { PercentageBasedChart } from "@/components/data/PercentageBasedChart";
import { TimeBasedChart } from "@/components/data/TimeBasedChart";

const DashboardPage: React.FC = () => {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <TimeBasedChart />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <PercentageBasedChart />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <CriteriaBasedChart />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>
        <PercentageBasedChart />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xs: 12 }}>
        <CountBasedChart />
      </Grid.Col>
    </Grid>
  );
};

export const Component = DashboardPage;
Component.displayName = "DashboardPage";
