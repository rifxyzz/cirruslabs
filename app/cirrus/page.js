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
          <span className="chip warm">CIRRUS APY 60.3%</span>
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
            <span>{tab === "stake" ? "Stake CIRRUS" : "Unstake CIRRUS"}</span>
          </div>
          <div className="leg-row">
            <input
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <div className="token-pick">
              <img src="/cirrus-logo.jpeg" alt="CIRRUS" />
              <strong>CIRRUS</strong>
            </div>
          </div>
        </div>
        <p className="muted tiny">1 CIRRUS = 1 CIRRUS receipt unit.</p>
        <button className="neu-button full primary">
          {isConnected ? (tab === "stake" ? "Stake CIRRUS" : "Unstake CIRRUS") : "Connect Wallet"}
        </button>
      </section>
    </div>
  );
}