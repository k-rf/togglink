import { styleVariants } from "@vanilla-extract/css";

const position = {
  start: "start",
  center: "center",
  end: "end",
} as const;

export const alienItemVariant = styleVariants(position, (position) => [{ alignItems: position }]);

export const justifyContentVariant = styleVariants(position, (position) => [
  { justifyContent: position },
]);
