"use client";

import { http, createConfig } from "wagmi";
import { injected } from "@wagmi/connectors/injected";
import { walletConnect } from "@wagmi/connectors/walletConnect";
import { robinhood, WALLETCONNECT_PROJECT_ID } from "./chain";

const metadata = {
  name: "Cirrus Labs",
  description: "Cirrus Labs liquidity and exchange on Robinhood Chain",
  url: "https://cirruslabs.app",
  icons: ["/cirrus-logo.jpeg"],
};

export const wagmiConfig = createConfig({
  chains: [robinhood],
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      metadata,
      showQrModal: true,
    }),
  ],
  transports: {
    [robinhood.id]: http("https://rpc.mainnet.chain.robinhood.com"),
  },
  ssr: true,
});