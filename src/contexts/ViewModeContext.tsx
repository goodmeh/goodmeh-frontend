import { ViewMode, ViewModeContext } from "@/hooks/useViewMode";
import { useCallback, useState } from "react";

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>("consumer");
  const toggleViewMode = useCallback(() => {
    setViewMode(viewMode === "consumer" ? "business" : "consumer");
  }, [viewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};
