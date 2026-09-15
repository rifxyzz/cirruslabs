"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import WalletButton from "./WalletButton";
import { CIRRUS_CA } from "../lib/chain";
import { shortAddress } from "../lib/tokens";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/trade", label: "Trade" },
  { href: "/liquidity", label: "Liquidity" },
  { href: "/cirrus", label: "Cirrus" },
  { href: "/rewards", label: "Community Rewards" },
  { href: "/vaults", label: "Vaults" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/bridge", label: "Bridge" },
];

export default function Header() {
  const path = usePathname();
  const [copied, setCopied] = useState(false);

  async function copyCa() {
    try {
      await navigator.clipboard.writeText(CIRRUS_CA);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <header className="site-header">
      <div className="header-left">
        <Link href="/" className="brand">
          <img src="/cirrus-logo.jpeg" alt="Cirrus Labs" className="brand-mark" />
          <span>Cirrus Labs</span>
        </Link>
        <button className="ca-chip" onClick={copyCa} title={CIRRUS_CA}>
          <span className="ca-label">CA $CIRRUS</span>
          <span className="ca-addr">{copied ? "Copied" : shortAddress(CIRRUS_CA)}</span>
        </button>
      </div>

      <nav className="nav-pill">
        {NAV.map((item) => {
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? "nav-link active" : "nav-link"}>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="header-right">
        <WalletButton />
      </div>
    </header>
  );
}