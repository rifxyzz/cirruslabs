"use client";

const REWARDS = [
  { ticker: "NVDA", name: "NVIDIA", logo: "/tokens/NVDA.png", pending: "12.4800 NVDA", value: "$1,842.10" },
  { ticker: "SPCX", name: "SpaceX", logo: "/tokens/SPCX.png", pending: "3.2500 SPCX", value: "$462.88" },
  { ticker: "TSLA", name: "Tesla", logo: "/tokens/TSLA.png", pending: "8.9100 TSLA", value: "$2,104.55" },
];

export default function RewardsPage() {
  return (
    <div className="stack">
      <h1 className="hero-title">COMMUNITY REWARDS</h1>
      <div className="vault-grid">
        {REWARDS.map((item) => (
          <article key={item.ticker} className="glass-card reward-card">
            <div className="card-head">
              <div className="mini-head">
                <img src={item.logo} alt={item.ticker} />
                <div>
                  <strong>Claim Rewards</strong>
                  <div className="muted tiny">{item.name} [{item.ticker}]</div>
                </div>
              </div>
            </div>
            <div className="kv two">
              <div>
                <span className="muted">Pending</span>
                <strong className="pending-italic">{item.pending}</strong>
              </div>
              <div>
                <span className="muted">Value</span>
                <strong>{item.value}</strong>
              </div>
            </div>
            <button className="neu-button compact primary">Claim</button>
          </article>
        ))}
      </div>
    </div>
  );
}