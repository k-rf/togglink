import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "~/entrypoints/options/app";
import { ThemeProvider } from "~/provider/theme-provider";

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
