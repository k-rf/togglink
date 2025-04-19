import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import tsconfigPathsPlugin from "vite-tsconfig-paths";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  imports: false,
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["storage"],
    host_permissions: ["https://api.notion.com/*"],
  },
  vite: () => ({
    plugins: [vanillaExtractPlugin(), tsconfigPathsPlugin()],
    define: {
      "import.meta.vitest": "undefined",
    },
  }),
});
