"use client";

import { useEffect, useState } from "react";
import { formatUsd } from "../../lib/tokens";

export default function LiquidityPage() {
  const [pools, setPools] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/api/markets")
      .then((r) => r.json())
      .then((d) => setPools(d.pools || []))
      .catch(() => setPools([]));
  }, []);

  const rows = pools.filter((p) => p.pair.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="stack">
      <h1 className="page-kicker">LIQUIDITY</h1>
      <section className="glass-card">
        <div className="card-head">
          <h2>Liquidity Pools</h2>
          <input
            className="search"
            placeholder="Search pools"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pool</th>
                <th>TVL</th>
                <th>Volume (24H)</th>
                <th>Fees (24H)</th>
                <th>APR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.address}>
                  <td>
                    <strong>{p.pair}</strong>
                    <span className="chip">{p.feePercent}%</span>
                  </td>
                  <td>{formatUsd(p.tvlUsd)}</td>
                  <td>{formatUsd(p.volume24hUsd)}</td>
                  <td>{formatUsd(p.fees24h)}</td>
                  <td className="accent">{p.apr ? `${Number(p.apr).toFixed(1)}%` : "—"}</td>
                  <td>
                    <button className="neu-button compact">Provide</button>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr>
                  <td colSpan={6} className="muted">
                    No matching pools.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
