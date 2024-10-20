import {
  // eslint-disable-next-line no-restricted-imports -- The render function below is a wrapper around the render function from @testing-library/react
  render as testingLibraryRender,
  RenderOptions,
} from "@testing-library/react";
import { Provider } from "react-redux";

import { AppProvider } from "@/app/AppProvider";
import { AppStore, RootState, setupStore } from "@/stores/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
type ExtendedRenderOptions = {
  preloadedState?: RootState;
  store?: AppStore;
} & Omit<RenderOptions, "queries">;

export function render(
  ui: React.ReactNode,
  extendedRenderOptions: ExtendedRenderOptions = {},
) {
  const {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <AppProvider>
        <Provider store={store}>{children}</Provider>
      </AppProvider>
    ),
  });
}
