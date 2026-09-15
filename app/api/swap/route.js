import { NextResponse } from "next/server";

const API_URL = process.env.UNISWAP_API_URL || "https://trade-api.gateway.uniswap.org/v1";
const API_KEY = process.env.UNISWAP_API_KEY || "";

export async function POST(req) {
  try {
    const body = await req.json();
    const res = await fetch(`${API_URL}/swap`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-api-key": API_KEY,
        "x-universal-router-version": "2.1.1",
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.detail || data.errorCode || "Swap build failed", raw: data },
        { status: res.status }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: err.message || "Swap failed" }, { status: 500 });
  }
}
