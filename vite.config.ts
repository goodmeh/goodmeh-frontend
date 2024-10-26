/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import eslint from "vite-plugin-eslint2";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    checker({
      typescript: true,
    }),
    tsconfigPaths(),
  ],
  server: {
    port: 3203,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/_mantine";`,
        api: "modern-compiler",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    setupFiles: "./vitest.setup.ts",
  },
});
