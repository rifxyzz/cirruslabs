import { CIRRUS_CA } from "./chain";

export const ZERO = "0x0000000000000000000000000000000000000000";

export const TOKENS = {
  ETH: {
    symbol: "ETH",
    name: "Ether",
    address: ZERO,
    decimals: 18,
    logo: "/tokens/eth.svg",
  },
  WETH: {
    symbol: "WETH",
    name: "Wrapped Ether",
    address: "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73",
    decimals: 18,
    logo: "/tokens/eth.svg",
  },
  USDG: {
    symbol: "USDG",
    name: "Global Dollar",
    address: "0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168",
    decimals: 6,
    logo: "/tokens/usdg.svg",
  },
  CIRRUS: {
    symbol: "CIRRUS",
    name: "Cirrus",
    address: CIRRUS_CA,
    decimals: 18,
    logo: "/cirrus-logo.jpeg",
  },
  PONS: {
    symbol: "PONS",
    name: "Pons",
    address: "0x39dBED3a2bd333467115dE45665cC57F813C4571",
    decimals: 18,
    logo: "/tokens/pons.svg",
  },
  CASHCAT: {
    symbol: "CASHCAT",
    name: "Cash Cat",
    address: "0x020bfC650A365f8BB26819deAAbF3E21291018b4",
    decimals: 18,
    logo: "/tokens/cashcat.png",
  },
  AI: {
    symbol: "AI",
    name: "AI",
    address: "0x2E8c31162b855A2ffa90F6F8634643Ad6F111e18",
    decimals: 18,
    logo: "/tokens/ai.webp",
  },
};

export const SWAP_TOKENS = [
  TOKENS.ETH,
  TOKENS.USDG,
  TOKENS.WETH,
  TOKENS.CIRRUS,
];

export const TRENDING = [TOKENS.PONS, TOKENS.CASHCAT, TOKENS.AI];

export const ERC20_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
];

export function shortAddress(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function formatUsd(n, digits = 2) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  const v = Number(n);
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(2)}B`;
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(2)}K`;
  if (v >= 1) return `$${v.toFixed(digits)}`;
  if (v >= 0.01) return `$${v.toFixed(4)}`;
  return `$${v.toPrecision(3)}`;
}

export function formatPct(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  const v = Number(n);
  const sign = v > 0 ? "+" : "";
  return `${sign}${v.toFixed(2)}%`;
}
