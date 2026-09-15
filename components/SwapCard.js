"use client";

import { useEffect, useMemo, useState } from "react";
import { parseUnits, formatUnits } from "viem";
import { useAccount, useBalance, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { SWAP_TOKENS, TOKENS, ZERO, formatUsd } from "../lib/tokens";

function TokenSelect({ value, onChange, exclude }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {SWAP_TOKENS.filter((t) => t.symbol !== exclude).map((t) => (
        <option key={t.symbol} value={t.symbol}>
          {t.symbol}
        </option>
      ))}
    </select>
  );
}

export default function SwapCard({ defaultFrom = "ETH", defaultTo = "USDG", title = "Swap" }) {
  const { address, isConnected } = useAccount();
  const [fromSym, setFromSym] = useState(defaultFrom);
  const [toSym, setToSym] = useState(defaultTo);
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const from = TOKENS[fromSym];
  const to = TOKENS[toSym];

  const { data: nativeBal } = useBalance({
    address,
    query: { enabled: Boolean(address) && from.address === ZERO },
  });
  const { data: tokenBal } = useBalance({
    address,
    token: from.address === ZERO ? undefined : from.address,
    query: { enabled: Boolean(address) && from.address !== ZERO },
  });

  const balance = from.address === ZERO ? nativeBal : tokenBal;
  const balLabel = balance ? Number(formatUnits(balance.value, balance.decimals)).toFixed(4) : "0.00";

  const { sendTransactionAsync } = useSendTransaction();
  const [txHash, setTxHash] = useState();
  const { isLoading: pending, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isSuccess) setStatus("Swap confirmed on Robinhood Chain.");
  }, [isSuccess]);

  const amountWei = useMemo(() => {
    if (!amount || Number(amount) <= 0) return null;
    try {
      return parseUnits(amount, from.decimals).toString();
    } catch {
      return null;
    }
  }, [amount, from.decimals]);

  async function fetchQuote() {
    if (!address || !amountWei) return;
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tokenIn: from.address,
          tokenOut: to.address,
          amount: amountWei,
          swapper: address,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Quote unavailable");
      setQuote(data);
      setStatus("Quote ready.");
    } catch (err) {
      setQuote(null);
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!amountWei || !address) {
      setQuote(null);
      return;
    }
    const t = setTimeout(fetchQuote, 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountWei, from.address, to.address, address]);

  const outAmount = useMemo(() => {
    const q = quote?.quote;
    if (!q) return "";
    const raw =
      q.output?.amount ||
      q.outputAmount ||
      q.amountOut ||
      q.outputs?.[0]?.endAmount ||
      q.outputs?.[0]?.startAmount;
    if (!raw) return "";
    try {
      return Number(formatUnits(BigInt(raw), to.decimals)).toFixed(6);
    } catch {
      return String(raw);
    }
  }, [quote, to.decimals]);

  function flip() {
    setFromSym(toSym);
    setToSym(fromSym);
    setAmount(outAmount || "");
    setQuote(null);
  }

  async function execute() {
    if (!address) {
      setStatus("Connect a wallet to continue.");
      return;
    }
    if (!amountWei) {
      setStatus("Enter an amount.");
      return;
    }
    setLoading(true);
    setStatus("Preparing transaction…");
    try {
      const approvalRes = await fetch("/api/approval", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          walletAddress: address,
          amount: amountWei,
          token: from.address,
          tokenOut: to.address,
        }),
      });
      const approval = await approvalRes.json();
      if (approval.approval) {
        setStatus("Confirm token approval in your wallet.");
        const hash = await sendTransactionAsync({
          to: approval.approval.to,
          data: approval.approval.data,
          value: approval.approval.value ? BigInt(approval.approval.value) : undefined,
        });
        setTxHash(hash);
        setStatus("Approval submitted. Waiting for confirmation…");
        return;
      }

      let workingQuote = quote;
      if (!workingQuote) {
        const qRes = await fetch("/api/quote", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            tokenIn: from.address,
            tokenOut: to.address,
            amount: amountWei,
            swapper: address,
          }),
        });
        workingQuote = await qRes.json();
        if (!qRes.ok) throw new Error(workingQuote.error || "Quote unavailable");
        setQuote(workingQuote);
      }

      const swapRes = await fetch("/api/swap", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          quote: workingQuote.quote,
          permitData: workingQuote.permitData,
        }),
      });
      const built = await swapRes.json();
      if (!swapRes.ok) throw new Error(built.error || "Unable to build swap");

      const tx = built.swap || built.transaction || built;
      setStatus("Confirm the swap in your wallet.");
      const hash = await sendTransactionAsync({
        to: tx.to,
        data: tx.data,
        value: tx.value ? BigInt(tx.value) : undefined,
      });
      setTxHash(hash);
      setStatus("Swap submitted. Waiting for confirmation…");
    } catch (err) {
      setStatus(err.shortMessage || err.message || "Transaction rejected.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass-card swap-card">
      <div className="card-head">
        <h2>{title}</h2>
        <span className="muted">ETH · USDG · WETH · CIRRUS</span>
      </div>

      <div className="swap-leg">
        <div className="leg-meta">
          <span>From</span>
          <span>Bal: {balLabel} {from.symbol}</span>
        </div>
        <div className="leg-row">
          <input
            inputMode="decimal"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
          />
          <div className="token-pick">
            <img src={from.logo} alt="" />
            <TokenSelect
              value={fromSym}
              exclude={toSym}
              onChange={(v) => setFromSym(v)}
            />
          </div>
        </div>
      </div>

      <button className="flip-btn" onClick={flip} type="button" aria-label="Reverse pair">
        ↕
      </button>

      <div className="swap-leg">
        <div className="leg-meta">
          <span>To</span>
          <span>{to.name}</span>
        </div>
        <div className="leg-row">
          <input readOnly placeholder="0" value={outAmount} />
          <div className="token-pick">
            <img src={to.logo} alt="" />
            <TokenSelect
              value={toSym}
              exclude={fromSym}
              onChange={(v) => setToSym(v)}
            />
          </div>
        </div>
      </div>

      <button
        className="neu-button full primary"
        disabled={loading || pending}
        onClick={execute}
      >
        {!isConnected ? "Connect Wallet" : loading || pending ? "Processing…" : "Swap"}
      </button>

      {status && <p className="status-line">{status}</p>}
      {quote?.quote && outAmount && (
        <p className="muted tiny">
          Estimated output {outAmount} {to.symbol}
          {quote.quote.gasFeeUSD ? ` · network ${formatUsd(quote.quote.gasFeeUSD)}` : ""}
        </p>
      )}
    </section>
  );
}
