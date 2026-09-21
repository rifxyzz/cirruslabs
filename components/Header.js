"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import WalletButton from "./WalletButton";
import { KER_CA } from "../lib/chain";
import { shortAddress } from "../lib/tokens";

const NAV = [
  { href: "/", label: "Dashboard" },
  { href: "/trade", label: "Trade" },
  { href: "/liquidity", label: "Liquidity" },
  { href: "/cirrus", label: "Kerdos" },
  { href: "/rewards", label: "BONUS REWARDS", special: true },
  { href: "/vaults", label: "Vaults" },
  { href: "/portfolio", label: "Portfolio" },
  {
    href: "https://relay.link/bridge/robinhood?fromChainId=1&fromCurrency=0x0000000000000000000000000000000000000000",
    label: "Bridge",
    external: true,
  },
];

export default function Header() {
  const path = usePathname();
  const [copied, setCopied] = useState(false);

  async function copyCa() {
    if (!KER_CA) return;
    try {
      await navigator.clipboard.writeText(KER_CA);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <header className="site-header">
      <div className="header-left">
        <Link href="/" className="brand">
          <img src="/cirrus-logo.jpeg" alt="KERDOS" className="brand-mark" />
          <span>KERDOS</span>
        </Link>
      </div>

      <nav className="nav-pill">
        {NAV.map((item) => {
          const active = item.href === "/" ? path === "/" : path.startsWith(item.href);
          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            );
          }
          if (item.special) {
            return (
              <Link key={item.href} href={item.href} className="clip-btn rewards-clip">
                BONUS REWARDS
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-link active" : "nav-link"}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="header-right">
        <button className="ca-chip" onClick={copyCa} title={KER_CA || "pending"}>
          <span className="ca-label">CA $KER</span>
          <span className={KER_CA ? "ca-addr" : "ca-addr pending-italic"}>
            {copied ? "Copied" : KER_CA ? shortAddress(KER_CA) : "pending"}
          </span>
        </button>
        <WalletButton />
      </div>
    </header>
  );
}