import React from "react";
import { AppProvider } from "./AppProvider";
import HomePage from "./pages/Home.page";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <HomePage />
    </AppProvider>
  );
};
