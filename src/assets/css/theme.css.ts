import { createTheme } from "@vanilla-extract/css";

const [colorClass, colorVars] = createTheme({
  green: {
    /** #C4FF55 */ 100: "#C4FF55",
    /** #A1FF00 */ 200: "#A1FF00",
    /** #8EFF00 */ 300: "#8EFF00",
    /** #7BFF00 */ 400: "#7BFF00",
    /** #68FF00 */ 500: "#68FF00",
    /** #55FF00 */ 600: "#55FF00",
    /** #42FF00 */ 700: "#42FF00",
    /** #2FFF00 */ 800: "#2FFF00",
    /** #1CFF00 */ 900: "#1CFF00",
  },
  red: {
    /** #FFC4C4 */ 100: "#FFC4C4",
    /** #FFA1A1 */ 200: "#FFA1A1",
    /** #FF8E8E */ 300: "#FF8E8E",
    /** #FF7B7B */ 400: "#FF7B7B",
    /** #FF6868 */ 500: "#FF6868",
    /** #FF5555 */ 600: "#FF5555",
    /** #FF4242 */ 700: "#FF4242",
    /** #FF2F2F */ 800: "#FF2F2F",
    /** #FF1C1C */ 900: "#FF1C1C",
  },
  yellow: {
    /** #FFFC55 */ 100: "#FFFC55",
    /** #FFFA00 */ 200: "#FFFA00",
    /** #FFF800 */ 300: "#FFF800",
    /** #FFF600 */ 400: "#FFF600",
    /** #FFF400 */ 500: "#FFF400",
    /** #FFF200 */ 600: "#FFF200",
    /** #FFF000 */ 700: "#FFF000",
    /** #FFEE00 */ 800: "#FFEE00",
    /** #FFEC00 */ 900: "#FFEC00",
  },
  grey: {
    /** #F9F9F9 */ 100: "#F9F9F9",
    /** #EAEAEA */ 200: "#EAEAEA",
    /** #D1D1D1 */ 300: "#D1D1D1",
    /** #A8A8A8 */ 400: "#A8A8A8",
    /** #7A7A7A */ 500: "#7A7A7A",
    /** #525252 */ 600: "#525252",
    /** #333333 */ 700: "#333333",
    /** #1E1E1E */ 800: "#1E1E1E",
    /** #141414 */ 900: "#141414",
  },
});

const [paletteClass, paletteVars] = createTheme({
  primary: "#640D5F",
  secondary: "#D91656",
  accent: "#EE66A6",
  error: "#FFEB55",
  background: colorVars.grey[200],
});

export const [themeClass, vars] = createTheme({
  color: colorVars,
  palette: paletteVars,
  fontSize: {
    /** 0.5rem */ xs: "0.5rem",
    /** 0.75rem */ sm: "0.75rem",
    /** 1.0rem */ md: "1.0rem",
    /** 1.5rem */ lg: "1.5rem",
    /** 2.0rem */ xl: "2.0rem",
  } as const,
  spacing: {
    /**  8px */ xs: "8px",
    /** 16px */ sm: "16px",
    /** 24px */ md: "24px",
    /** 32px */ lg: "32px",
    /** 40px */ xl: "40px",
  } as const,
  font: {},
});

export { colorClass, paletteClass };
