import { defineChain } from "viem";

export const robinhood = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.mainnet.chain.robinhood.com"] },
    public: { http: ["https://rpc.mainnet.chain.robinhood.com"] },
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://robinhoodchain.blockscout.com" },
  },
});

export const CHAIN_ID = 4663;
export const RPC_URL = "https://rpc.mainnet.chain.robinhood.com";
export const EXPLORER = "https://robinhoodchain.blockscout.com";
export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  "896c268f111c28759e36d77476fe2277";
export const CIRRUS_CA =
  process.env.NEXT_PUBLIC_CIRRUS_ADDRESS ||
  "0x70C5e9458115EDf6B520bA8C7Ff7b55818C376C3";
export const TVL_DISPLAY = 32047;
export const PROTOCOL_TVL = "$32,047";
export const PROTOCOL_VOLUME = "$184,920.44";
