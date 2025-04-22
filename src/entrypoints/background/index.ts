import { createChromeHandler } from "trpc-chrome/adapter";
import { defineBackground } from "wxt/utils/define-background";

import { appRouter } from "~/libs/server";

export default defineBackground({
  main: () => {
    createChromeHandler({
      router: appRouter,
      createContext: () => {},
      onError: () => {},
    });
  },
});
