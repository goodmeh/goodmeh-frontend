import "@mantine/charts/styles.css";
import "./index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app/App";

// This resolves the issue where rebuilding produces different hashes for the same file,
// causing the browser to load the old filename (which doesn't exist).
// https://vitejs.dev/guide/build#load-error-handling
window.addEventListener("vite:preloadError", (e) => {
  e.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
