import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Provider } from "react-redux";

import { ViewModeProvider } from "@/contexts/ViewModeContext";
import { store } from "@/stores/store";

import { theme } from "./theme";

type AppProviderProps = {
  children?: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ViewModeProvider>
        <APIProvider apiKey={import.meta.env.VITE_MAPS_API_KEY ?? ""}>
          <MantineProvider defaultColorScheme="auto" theme={theme}>
            {children}
          </MantineProvider>
        </APIProvider>
      </ViewModeProvider>
    </Provider>
  );
};
