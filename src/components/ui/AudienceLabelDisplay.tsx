import { useViewMode } from "@/hooks/useViewMode";
import { AudienceLabel } from "@/types/data";

export const AudienceLabelDisplay: React.FC<{ label: AudienceLabel }> = ({
  label,
}) => {
  const { viewMode } = useViewMode();
  return <>{viewMode === "business" ? label.biz : label.casual}</>;
};
