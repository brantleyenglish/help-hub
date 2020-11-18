import React from "react";
import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    gray: "#999999",
    grayLight: "#F2F2F2",
    red: "#B23633",
    redDark: "#942E29",
    white: "#FFFFFF",
    blue: "#0e4680",
    lightBlue: "#6291c0",
  },
  fonts: {
    regular: "Roboto-Regular",
    bold: "Roboto-Bold",
    black: "Roboto-Black",
  },
};

const ThemeWrapper = ({ children }: any) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default ThemeWrapper;
