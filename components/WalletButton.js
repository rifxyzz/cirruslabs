"use client";

import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { CHAIN_ID } from "../lib/chain";

export default function WalletButton() {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
    const wrong = chainId && chainId !== CHAIN_ID;
    return (
      <div className="wallet-actions">
        {wrong ? (
          <button className="rainbow-hover" onClick={() => switchChain({ chainId: CHAIN_ID })}>
            <span className="sp">Switch Network</span>
          </button>
        ) : null}
        <button className="rainbow-hover" onClick={() => disconnect()}>
          <span className="sp">{short}</span>
        </button>
      </div>
    );
  }

  const injected = connectors.find((c) => c.id === "injected") || connectors[0];

  return (
    <button
      className="rainbow-hover"
      disabled={isPending}
      onClick={() => injected && connect({ connector: injected })}
    >
      <span className="sp">{isPending ? "Connecting" : "Connect Wallet"}</span>
    </button>
  );
}