"use client";

import { useState } from "react";
import { useAccount } from "wagmi";

export default function KerdosPage() {
  const { isConnected } = useAccount();
  const [tab, setTab] = useState("stake");
  const [amount, setAmount] = useState("");

  return (
    <div className="center-page">
      <section className="glass-card narrow">
        <div className="card-head">
          <h2>Stake</h2>
          <span className="chip warm">KER APY 60.3%</span>
        </div>
        <div className="tabs">
          <button className={tab === "stake" ? "chip" : "chip ghost"} onClick={() => setTab("stake")}>Stake</button>
          <button className={tab === "unstake" ? "chip" : "chip ghost"} onClick={() => setTab("unstake")}>Unstake</button>
        </div>
        <div className="swap-leg">
          <div className="leg-meta">
            <span>{tab === "stake" ? "Stake KER" : "Unstake KER"}</span>
          </div>
          <div className="leg-row">
            <input
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <div className="token-pick">
              <img src="/cirrus-logo.jpeg" alt="KER" />
              <strong>KER</strong>
            </div>
          </div>
        </div>
        <p className="muted tiny">1 KER = 1 KER receipt unit.</p>
        <button className="neu-button full primary">
          {isConnected ? (tab === "stake" ? "Stake KER" : "Unstake KER") : "Connect Wallet"}
        </button>
      </section>
    </div>
  );
}