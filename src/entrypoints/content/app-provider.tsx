import React from "react";

import { ChromeClientProvider } from "~/contexts/chrome-client.context";
import { AppRouter } from "~/libs/server";

import type { CreateTRPCProxyClient } from "@trpc/client";

interface Props {
  children: React.ReactNode;
  chromeClient: CreateTRPCProxyClient<AppRouter>;
}

export const AppProvider = ({ children, chromeClient }: Props) => {
  return (
    <ChromeClientProvider value={{ chromeClient: chromeClient }}>{children}</ChromeClientProvider>
  );
};
