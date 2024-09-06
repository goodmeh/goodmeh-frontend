import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import React from "react";
import { theme } from "./theme";

type AppProviderProps = {
  children?: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      {children}
    </MantineProvider>
  );
};
