// eslint-disable-next-line no-restricted-imports -- The render function below is a wrapper around the render function from @testing-library/react
import { render as testingLibraryRender } from "@testing-library/react";

import { AppProvider } from "@/app/AppProvider";

export function render(ui: React.ReactNode) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <AppProvider>{children}</AppProvider>
    ),
  });
}
