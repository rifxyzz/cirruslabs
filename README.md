# Cirrus Labs

Next.js application for Cirrus Labs on Robinhood Chain (chain ID 4663).

## Features

- Dashboard with protocol TVL fixed at **$32,047**
- Live trending prices for **PONS**, **CASHCAT**, and **AI**
- Wallet connection (injected wallets + WalletConnect)
- Swap ETH, USDG, WETH, and CIRRUS through a server-side trading route
- Looping cloud video background with aurora overlay
- Pages: Dashboard, Trade, Liquidity, Cirrus, Vaults, Portfolio, Bridge

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `NEXT_PUBLIC_CIRRUS_ADDRESS` (replace the placeholder before production)
- `UNISWAP_API_KEY` (server only)

## Deploy on Vercel

Import the folder, keep the Next.js preset, add the environment variables, and deploy.

Robinhood Chain RPC: https://rpc.mainnet.chain.robinhood.com
Explorer: https://robinhoodchain.blockscout.com
