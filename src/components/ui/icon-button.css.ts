import { style, styleVariants } from "@vanilla-extract/css";

import { vars } from "~/assets/css/theme.css";

const baseStyle = style({
  borderRadius: 100000,
  backgroundColor: vars.palette.background,
  boxShadow: `0 2px 4px ${vars.color.grey[300]}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const size = {
  xs: { size: "24px", padding: 6 },
  sm: { size: "32px", padding: 8 },
  md: { size: "40px", padding: 10 },
  lg: { size: "48px", padding: 12 },
  xl: { size: "56px", padding: 14 },
};

export const sizeVariants = styleVariants(size, ({ size, padding }) => [
  baseStyle,
  {
    minWidth: size,
    width: size,
    minHeight: size,
    height: size,
    padding: padding,
    color: vars.color.grey[600],
  },
]);
