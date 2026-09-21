"use client";

import { useEffect, useState } from "react";
import SwapCard from "../components/SwapCard";
import Sparkline from "../components/Sparkline";
import TrueFocus from "../components/TrueFocus";
import { TOKENS, formatUsd, formatPct } from "../lib/tokens";
import { PROTOCOL_TVL, PROTOCOL_VOLUME } from "../lib/chain";

const FALLBACK = [
  { symbol: "PONS", priceUsd: null, change24h: null },
  { symbol: "CASHCAT", priceUsd: null, change24h: null },
  { symbol: "AI", priceUsd: null, change24h: null },
];

export default function DashboardPage() {
  const [markets, setMarkets] = useState({ trending: FALLBACK, pools: [] });

  useEffect(() => {
    let live = true;
    async function load() {
      try {
        const res = await fetch("/api/markets");
        const data = await res.json();
        if (live) setMarkets(data);
      } catch {}
    }
    load();
    const id = setInterval(load, 45000);
    return () => {
      live = false;
      clearInterval(id);
    };
  }, []);

  const featured = markets.pools?.[0];

  return (
    <div className="dash">
      <TrueFocus
        sentence="KERDOS DEX"
        manualMode={false}
        blurAmount={5}
        borderColor="#bcff27"
        glowColor="rgba(188,255,39,0.55)"
        animationDuration={0.7}
        pauseBetweenAnimations={1}
      />

      <div className="dash-grid">
        <section className="glass-card tvl-card">
          <div className="card-head">
            <span className="muted">TVL</span>
            <span className="chip">1D</span>
          </div>
          <div className="stat-xl">{PROTOCOL_TVL}</div>
          <Sparkline up />
          <div className="axis muted tiny">
            <span>Sep 20</span>
            <span>Sep 21</span>
          </div>
        </section>

        <SwapCard title="Swap" />

        <section className="glass-card tvl-card">
          <div className="card-head">
            <span className="muted">Total Swap Volume</span>
            <span className="chip">1D</span>
          </div>
          <div className="stat-xl tight">{PROTOCOL_VOLUME}</div>
          <div className="bars">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} style={{ height: `${20 + ((i * 17) % 70)}%` }} />
            ))}
          </div>
        </section>

        <section className="glass-card trending">
          <h2>Trending</h2>
          <div className="trend-grid">
            {(markets.trending || FALLBACK).map((row) => {
              const meta = TOKENS[row.symbol] || {};
              const up = Number(row.change24h) >= 0;
              return (
                <article key={row.symbol} className="mini-card">
                  <div className="mini-head">
                    <img src={meta.logo} alt="" />
                    <span>{row.symbol}</span>
                  </div>
                  <div className="stat-md">
                    {row.priceUsd != null ? formatUsd(row.priceUsd, 4) : "—"}
                  </div>
                  <div className={up ? "pct up" : "pct down"}>{formatPct(row.change24h)}</div>
                  <Sparkline up={up} />
                </article>
              );
            })}
          </div>
        </section>

        <section className="glass-card positions">
          <h2>My Positions</h2>
          <div className="kv">
            <div>
              <span className="muted">Total Liquidity</span>
              <strong>$0.00</strong>
            </div>
            <div>
              <span className="muted">Pending Yield</span>
              <strong>$0.00</strong>
            </div>
          </div>
        </section>

        <section className="glass-card side-stack">
          <div>
            <div className="card-head">
              <h2>Liquidity</h2>
            </div>
            {featured ? (
              <>
                <div className="pair-line">
                  <strong>{featured.pair}</strong>
                  <span className="chip">{featured.feePercent}%</span>
                </div>
                <div className="kv two">
                  <div>
                    <span className="muted">TVL</span>
                    <strong>{formatUsd(featured.tvlUsd)}</strong>
                  </div>
                  <div>
                    <span className="muted">APR</span>
                    <strong className="accent">
                      {featured.apr ? `${Number(featured.apr).toFixed(1)}%` : "—"}
                    </strong>
                  </div>
                </div>
              </>
            ) : (
              <p className="muted">Loading pool data…</p>
            )}
          </div>
          <div>
            <div className="card-head">
              <h2>Vaults</h2>
              <span className="chip warm">Recommended</span>
            </div>
            <div className="pair-line">
              <strong>Stable KER #1</strong>
              <span className="muted tiny">Vault Cap $7.00M</span>
            </div>
            <div className="kv two">
              <div>
                <span className="muted">TVL</span>
                <strong>$37.50K</strong>
              </div>
              <div>
                <span className="muted">APR</span>
                <strong className="accent">5%</strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}