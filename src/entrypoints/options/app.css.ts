import { style } from "@vanilla-extract/css";

import { vars } from "~/assets/css/theme.css";

export const appStyle = style({
  display: "flex",
  flexDirection: "column",

  padding: vars.spacing.xs,
});
