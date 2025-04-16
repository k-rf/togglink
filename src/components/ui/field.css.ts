import { style } from "@vanilla-extract/css";

import { vars } from "~/assets/css/theme.css";

const baseStyle = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  height: "1.5rem",
  width: "100%",

  padding: `0 ${vars.spacing.xs}`,
  border: `1px solid ${vars.color.grey[500]}`,
  boxSizing: "border-box",
  borderRadius: 4,
});

export const rootStyle = style([baseStyle]);
