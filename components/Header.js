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
  { href: "/rewards", label: "Community Rewards", special: true },
  { href: "/vaults", label: "Vaults" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/bridge", label: "Bridge" },
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
          if (item.special) {
            return (
              <Link key={item.href} href={item.href} className="rewards-btn">
                <span className="rewards-btn-inner">
                  <svg className="rewards-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                    />
                  </svg>
                  Community Rewards
                  <svg className="rewards-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M5 12h14m-7-7l7 7-7 7"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
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