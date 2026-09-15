import { NextResponse } from "next/server";

const API_URL = process.env.UNISWAP_API_URL || "https://trade-api.gateway.uniswap.org/v1";
const API_KEY = process.env.UNISWAP_API_KEY || "";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      tokenIn,
      tokenOut,
      amount,
      swapper,
      type = "EXACT_INPUT",
    } = body;

    if (!tokenIn || !tokenOut || !amount || !swapper) {
      return NextResponse.json({ error: "Missing quote parameters" }, { status: 400 });
    }

    const payload = {
      tokenIn,
      tokenOut,
      tokenInChainId: 4663,
      tokenOutChainId: 4663,
      type,
      amount: String(amount),
      swapper,
      autoSlippage: "DEFAULT",
      routingPreference: "BEST_PRICE",
      urgency: "normal",
    };

    const res = await fetch(`${API_URL}/quote`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-api-key": API_KEY,
        "x-universal-router-version": "2.1.1",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.detail || data.errorCode || "Quote unavailable", raw: data },
        { status: res.status }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message || "Quote failed" }, { status: 500 });
  }
}
