import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontSizes: {
    xxl: "1.50rem",
    xxxl: "1.75rem",
    xxxxl: "2.00rem",
  },
  components: {
    Skeleton: {
      styles: {
        root: {
          cursor: "wait",
        },
      },
    },
  },
  primaryColor: "yellow",
  fontFamily: "Helvetica, sans-serif",
});
