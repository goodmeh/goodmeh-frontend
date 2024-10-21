import { useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";

import { ViewMode, ViewModeContext } from "@/hooks/useViewMode";

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>({
    key: "viewMode",
    defaultValue: "consumer",
  });
  const toggleViewMode = useCallback(() => {
    setViewMode(viewMode === "consumer" ? "business" : "consumer");
  }, [viewMode, setViewMode]);

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode, toggleViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};
