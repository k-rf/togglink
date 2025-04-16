import tsconfigPathsPlugin from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPathsPlugin()],
  test: {
    globals: true,
    includeSource: ["src/**/*.ts"],
  },
  define: {
    "import.meta.vitest": "undefined",
  },
});
