"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export default function CirrusPage() {
  const { isConnected } = useAccount();
  const [tab, setTab] = useState("stake");
  const [amount, setAmount] = useState("");

  return (
    <div className="center-page">
      <section className="glass-card narrow">
        <div className="card-head">
          <h2>Stake</h2>
          <span className="chip warm">CIRRUS APY 1.3%</span>
        </div>
        <div className="tabs">
          <button className={tab === "stake" ? "chip" : "chip ghost"} onClick={() => setTab("stake")}>
            Stake
          </button>
          <button className={tab === "unstake" ? "chip" : "chip ghost"} onClick={() => setTab("unstake")}>
            Unstake
          </button>
        </div>
        <div className="swap-leg">
          <div className="leg-meta">
            <span>{tab === "stake" ? "Stake ETH" : "Unstake CIRRUS"}</span>
          </div>
          <div className="leg-row">
            <input
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <div className="token-pick">
              <img src={tab === "stake" ? "/tokens/eth.svg" : "/cirrus-logo.jpeg"} alt="" />
              <strong>{tab === "stake" ? "ETH" : "CIRRUS"}</strong>
            </div>
          </div>
        </div>
        <p className="muted tiny">1 ETH = 0.981190 CIRRUS receipt units (illustrative rate).</p>
        <button className="neu-button full primary">
          {isConnected ? (tab === "stake" ? "Stake" : "Unstake") : "Connect Wallet"}
        </button>
      </section>
    </div>
  );
}
