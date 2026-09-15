import { NextResponse } from "next/server";

const INDEX = process.env.MARKET_INDEX_URL || "https://indexer.scopl.live/api/indexer/pools";

const WATCH = {
  PONS: "0x39dbed3a2bd333467115de45665cc57f813c4571",
  CASHCAT: "0x020bfc650a365f8bb26819deaabf3e21291018b4",
  AI: "0x2e8c31162b855a2ffa90f6f8634643ad6f111e18",
};

function pickBest(pools, address) {
  const matches = pools.filter((p) => {
    const base = (p.baseTokenAddress || "").toLowerCase();
    const quote = (p.quoteTokenAddress || "").toLowerCase();
    return base === address || quote === address;
  });
  matches.sort((a, b) => (b.tvlUsd || 0) - (a.tvlUsd || 0));
  return matches[0] || null;
}

function tokenPrice(pool, address) {
  if (!pool) return null;
  const base = (pool.baseTokenAddress || "").toLowerCase();
  if (base === address) {
    return {
      priceUsd: pool.baseTokenPriceUsd ?? pool.priceUsd,
      change24h: pool.priceChange24h,
      volume24h: pool.volume24hUsd,
      tvl: pool.tvlUsd,
      spark: pool,
    };
  }
  return {
    priceUsd: pool.quoteTokenPriceUsd,
    change24h: pool.priceChange24h != null ? -Number(pool.priceChange24h) : null,
    volume24h: pool.volume24hUsd,
    tvl: pool.tvlUsd,
    spark: pool,
  };
}

export async function GET() {
  try {
    const res = await fetch(INDEX, { next: { revalidate: 30 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Market feed unavailable" }, { status: 502 });
    }
    const json = await res.json();
    const pools = Array.isArray(json?.data) ? json.data : [];

    const trending = Object.entries(WATCH).map(([symbol, address]) => {
      const pool = pickBest(pools, address);
      const stats = tokenPrice(pool, address);
      return {
        symbol,
        address,
        priceUsd: stats?.priceUsd ?? null,
        change24h: stats?.change24h ?? null,
        volume24h: stats?.volume24h ?? null,
        tvl: stats?.tvl ?? null,
      };
    });

    const topPools = pools
      .filter((p) => p.tvlUsd > 10000)
      .slice(0, 18)
      .map((p) => ({
        pair: p.pair,
        version: p.version,
        feePercent: p.feePercent,
        tvlUsd: p.tvlUsd,
        volume24hUsd: p.volume24hUsd,
        apr: p.rawFeeApr1d,
        address: p.address,
        base: p.baseTokenName,
        quote: p.quoteTokenName,
        baseAddress: p.baseTokenAddress,
        quoteAddress: p.quoteTokenAddress,
        priceChange24h: p.priceChange24h,
        fees24h: p.volume24hUsd && p.feePercent ? (p.volume24hUsd * p.feePercent) / 100 : 0,
      }));

    return NextResponse.json({
      trending,
      pools: topPools,
      tvl: 32047,
      updatedAt: json.updatedAt || new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      {
        trending: [
          { symbol: "PONS", address: WATCH.PONS, priceUsd: null, change24h: null },
          { symbol: "CASHCAT", address: WATCH.CASHCAT, priceUsd: null, change24h: null },
          { symbol: "AI", address: WATCH.AI, priceUsd: null, change24h: null },
        ],
        pools: [],
        tvl: 32047,
        error: String(err.message || err),
      },
      { status: 200 }
    );
  }
}
