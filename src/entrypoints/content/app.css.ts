import { style } from "@vanilla-extract/css";

export const buttonStyle = style({
  zIndex: "calc(infinity)",
});

// XXX: これがないと、`app.css.ts` がビルドされない。
// これは content script の content か？
export const content = {};
