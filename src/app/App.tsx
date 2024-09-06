import React from "react";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./AppProvider";
import { router } from "./router";

export const App: React.FC = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};
