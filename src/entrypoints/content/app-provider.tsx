import React from "react";

import { AppRouter } from "../background";

import { ChromeClientProvider } from "./context/chrome-client.context";

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
