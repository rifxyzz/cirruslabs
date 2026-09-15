"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { shortAddress } from "../lib/tokens";
import { CHAIN_ID } from "../lib/chain";

export default function WalletButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  if (isConnected && chainId !== CHAIN_ID) {
    return (
      <button
        className="neu-button compact"
        onClick={() => switchChain({ chainId: CHAIN_ID })}
      >
        Switch Network
      </button>
    );
  }

  if (isConnected) {
    return (
      <button className="neu-button compact" onClick={() => disconnect()}>
        {shortAddress(address)}
      </button>
    );
  }

  const injected = connectors.find((c) => c.id === "injected") || connectors[0];
  const wc = connectors.find((c) => c.id === "walletConnect");

  return (
    <div className="wallet-actions">
      <button
        className="neu-button compact primary"
        disabled={isPending}
        onClick={() => connect({ connector: injected })}
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
      </button>
      {wc && (
        <button
          className="icon-btn"
          title="WalletConnect QR"
          onClick={() => connect({ connector: wc })}
        >
          ⌘
        </button>
      )}
    </div>
  );
}
