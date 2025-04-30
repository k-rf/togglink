import { style } from "@vanilla-extract/css";

import { vars } from "~/assets/css/theme.css";

export const appStyle = style({
  width: 400,
  height: "100%",

  padding: vars.spacing.xs,
});
