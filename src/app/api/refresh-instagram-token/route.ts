import { NextResponse } from "next/server";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function getTokenFromRedis(): Promise<string | null> {
  try {
    const res = await fetch(`${UPSTASH_URL}/get/instagram_token`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      cache: "no-store",
    });
    const data = await res.json();
    return data.result ?? null;
  } catch {
    return null;
  }
}

async function saveTokenToRedis(token: string) {
  await fetch(`${UPSTASH_URL}/set/instagram_token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: token }),
  });
}

export async function GET() {
  try {
    // Get current token from Redis (fall back to env var)
    let currentToken = await getTokenFromRedis();
    if (!currentToken) {
      currentToken = process.env.INSTAGRAM_TOKEN ?? null;
    }

    if (!currentToken) {
      return NextResponse.json(
        { error: "No token to refresh" },
        { status: 500 },
      );
    }

    // Exchange for a fresh long-lived token
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const err = await res.json();
      console.error("Instagram token refresh failed:", err);
      return NextResponse.json(
        { error: "Refresh failed", details: err },
        { status: res.status },
      );
    }

    const data = await res.json();
    const newToken = data.access_token;

    // Save new token to Redis — this is the key step
    await saveTokenToRedis(newToken);

    console.log(
      "Instagram token refreshed and saved to Redis. Expires in:",
      data.expires_in,
      "seconds",
    );

    return NextResponse.json({
      success: true,
      expires_in: data.expires_in,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
