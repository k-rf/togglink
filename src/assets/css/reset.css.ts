import { globalStyle } from "@vanilla-extract/css";

import { resetLayer } from "./layers.css";

globalStyle(":root", {
  "@layer": {
    [resetLayer]: {
      all: "unset",
      display: "revert",
    },
  },
});

globalStyle("button", {
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  outline: "none",
  padding: 0,
  appearance: "none",
});

globalStyle("input", {
  backgroundColor: "transparent",
  border: "none",
  outline: "none",
  padding: 0,
  appearance: "none",
});
