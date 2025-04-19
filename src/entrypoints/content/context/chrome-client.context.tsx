import { createContext, use } from "react";

import { AppRouter } from "~/entrypoints/background";

import type { CreateTRPCProxyClient } from "@trpc/client";

interface ChromeClientContext {
  chromeClient: CreateTRPCProxyClient<AppRouter>;
}

export const ChromeClientContext = createContext<ChromeClientContext | undefined>(undefined);
export const ChromeClientProvider = ChromeClientContext.Provider;

export const useChromeClient = () => {
  const ctx = use(ChromeClientContext);

  if (!ctx) {
    throw new Error("useChromeClient must be used within a ChromeClientProvider");
  }

  return { chromeClient: ctx.chromeClient };
};
