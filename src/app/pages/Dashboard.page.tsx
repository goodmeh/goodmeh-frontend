import { CountBasedChart } from "@/components/data/CountBasedChart";
import { CriteriaBasedChart } from "@/components/data/CriteriaBasedChart";
import { PercentageBasedChart } from "@/components/data/PercentageBasedChart";
import { TimeBasedChart } from "@/components/data/TimeBasedChart";

const DashboardPage: React.FC = () => {
  return (
    <>
      <TimeBasedChart />
      <CountBasedChart />
      <CriteriaBasedChart />
      <PercentageBasedChart />
    </>
  );
};

export const Component = DashboardPage;
Component.displayName = "DashboardPage";
