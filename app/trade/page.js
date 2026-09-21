"use client";

import SwapCard from "../../components/SwapCard";
import Sparkline from "../../components/Sparkline";

export default function TradePage() {
  return (
    <div className="split-page">
      <section className="glass-card chart-panel">
        <div className="card-head">
          <div className="mini-head">
            <img src="/tokens/eth.svg" alt="" />
            <strong>ETH</strong>
          </div>
          <div className="range-pills">
            <span className="chip">1D</span>
            <span className="chip ghost">1W</span>
            <span className="chip ghost">1M</span>
          </div>
        </div>
        <div className="stat-xl">Live market</div>
        <p className="muted">Swap ETH into USDG, WETH, or KER on Robinhood Chain.</p>
        <div className="chart-placeholder">
          <Sparkline up />
        </div>
      </section>
      <SwapCard title="Swap" defaultFrom="ETH" defaultTo="USDG" />
    </div>
  );
}
