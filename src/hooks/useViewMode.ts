import { createContext, useContext } from "react";

export type ViewMode = "consumer" | "business";

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
};

export const ViewModeContext = createContext<Partial<ViewModeContextValue>>({});

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (Object.keys(context).length === 0) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context as ViewModeContextValue;
};
