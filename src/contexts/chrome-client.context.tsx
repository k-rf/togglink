import { createContext, use } from "react";

import { AppRouter } from "~/libs/server";

import type { CreateTRPCProxyClient } from "@trpc/client";

interface ChromeClientContext {
  chromeClient: CreateTRPCProxyClient<AppRouter>;
}

export const ChromeClientContext = createContext<ChromeClientContext | undefined>(undefined);
export const ChromeClientProvider = ChromeClientContext.Provider;

export const useChromeClient = () => {
  const ctx = use(ChromeClientContext);

  if (!ctx) {
    throw new Error("`useChromeClient` は `ChromeClientProvider` 内で使用する必要があります");
  }

  return { chromeClient: ctx.chromeClient };
};
