export default function BridgePage() {
  return (
    <div className="center-page">
      <section className="glass-card narrow">
        <h2>Bridge</h2>
        <p className="muted">
          Move ETH onto Robinhood Chain using the official network bridge, then return here to swap
          into USDG, WETH, or CIRRUS.
        </p>
        <a
          className="neu-button full primary"
          href="https://docs.robinhood.com/chain/connecting"
          target="_blank"
          rel="noreferrer"
        >
          Open Network Guide
        </a>
      </section>
    </div>
  );
}
