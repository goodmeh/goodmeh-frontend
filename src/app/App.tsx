import React from "react";
import { AppProvider } from "./AppProvider";
import { Router } from "./router";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};
