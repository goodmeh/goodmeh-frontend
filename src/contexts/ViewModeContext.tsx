import { useCallback, useState } from "react";

import { ViewMode, ViewModeContext } from "@/hooks/useViewMode";

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
