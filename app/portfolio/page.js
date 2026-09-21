export default function PortfolioPage() {
  return (
    <div className="stack">
      <h1 className="page-kicker">PORTFOLIO</h1>
      <div className="vault-grid">
        <article className="glass-card">
          <span className="muted">My positions</span>
          <div className="stat-xl">$0.00</div>
        </article>
        <article className="glass-card">
          <span className="muted">My KER</span>
          <div className="stat-xl">$0.00</div>
        </article>
        <article className="glass-card">
          <span className="muted">Pending Rewards</span>
          <div className="stat-xl">$0.00</div>
        </article>
      </div>
      <section className="glass-card">
        <h2>My Positions</h2>
        <p className="muted">No results. Connect a wallet to load positions on Robinhood Chain.</p>
      </section>
    </div>
  );
}
