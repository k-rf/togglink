import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ThemeProvider } from "~/provider/theme-provider";

import { App } from "./app";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
