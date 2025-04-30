import { createTRPCProxyClient } from "@trpc/client";
import ReactDOM from "react-dom/client";
import { chromeLink } from "trpc-chrome/link";
import { createIntegratedUi } from "wxt/utils/content-script-ui/integrated";
import { defineContentScript } from "wxt/utils/define-content-script";

import { AppRouter } from "~/libs/server";
import { sleep } from "~/utils/sleep";

import { App } from "./app";
import { AppProvider } from "./app-provider";

export default defineContentScript({
  matches: ["https://track.toggl.com/*"],
  runAt: "document_idle",
  main: async (ctx) => {
    await sleep(5000);

    const port = chrome.runtime.connect();
    const chromeClient = createTRPCProxyClient<AppRouter>({
      links: [chromeLink({ port: port })],
    });

    const ui = createIntegratedUi(ctx, {
      position: "inline",
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(
          <AppProvider chromeClient={chromeClient}>
            <App />
          </AppProvider>,
        );
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
