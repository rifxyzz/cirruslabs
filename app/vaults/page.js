export default function VaultsPage() {
  const vaults = [
    { name: "ETH / USDG ", cap: "$1.00M", tvl: "$37.50K", apr: "5%" },
    { name: "CIRRUS / USDG ", cap: "$500.00K", tvl: "$205.00", apr: "500%" },
  ];
  return (
    <div className="stack">
      <h1 className="page-kicker">VAULTS</h1>
      <div className="vault-grid">
        {vaults.map((v) => (
          <article key={v.name} className="glass-card">
            <div className="card-head">
              <h2>{v.name}</h2>
              <span className="muted tiny">Vault Cap {v.cap}</span>
            </div>
            <div className="kv two">
              <div>
                <span className="muted">TVL</span>
                <strong>{v.tvl}</strong>
              </div>
              <div>
                <span className="muted">APR</span>
                <strong className="accent">{v.apr}</strong>
              </div>
            </div>
            <div className="kv two">
              <div>
                <span className="muted">My Position</span>
                <strong>$0.00</strong>
              </div>
              <div>
                <span className="muted">Estimated Earnings</span>
                <strong>$0.00</strong>
              </div>
            </div>
            <button className="neu-button compact">Deposit</button>
          </article>
        ))}
      </div>
    </div>
  );
}
