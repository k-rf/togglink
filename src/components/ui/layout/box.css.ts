import { createVar, style } from "@vanilla-extract/css";

export const widthVar = createVar();

export const rootStyle = style({
  display: "flex",
  width: widthVar,
});
