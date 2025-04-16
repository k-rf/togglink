import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const gapVar = createVar();

const baseStyle = style({
  display: "flex",
  gap: gapVar,
});

const direction = {
  row: "row",
  column: "column",
} as const;

export const directionVariant = styleVariants(direction, (direction) => [
  baseStyle,
  { flexDirection: direction },
]);
