import { ViewMode, ViewModeContext } from "@/hooks/useViewMode";
import { useCallback, useState } from "react";

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ViewMode>("consumer");
  const toggleMode = useCallback(() => {
    setMode(mode === "consumer" ? "business" : "consumer");
  }, [mode]);

  return (
    <ViewModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};
