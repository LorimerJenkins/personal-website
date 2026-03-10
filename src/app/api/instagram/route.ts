// app/api/instagram/route.ts
import { NextResponse } from "next/server";

export const revalidate = 3600;

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
  // Upstash REST API: value goes in the URL path, not the body
  await fetch(
    `${UPSTASH_URL}/set/instagram_token/${encodeURIComponent(token)}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
      cache: "no-store",
    },
  );
}

export async function GET() {
  try {
    let token = await getTokenFromRedis();

    if (!token) {
      token = process.env.INSTAGRAM_TOKEN ?? null;
      if (!token) {
        return NextResponse.json(
          { error: "No Instagram token available" },
          { status: 500 },
        );
      }
      await saveTokenToRedis(token);
    }

    const fields =
      "id,media_type,media_url,thumbnail_url,permalink,caption,like_count,comments_count,timestamp";
    const url = `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=50&access_token=${token}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(
        { error: "Instagram API error", details: err },
        { status: res.status },
      );
    }

    const data = await res.json();
    const items = data.data ?? [];

    const reels = items
      .filter(
        (item: any) =>
          item.media_type === "VIDEO" || item.media_type === "REEL",
      )
      .slice(0, 3)
      .map((item: any) => ({
        id: item.id,
        mediaUrl: item.media_url,
        thumbnailUrl: item.thumbnail_url ?? null,
        permalink: item.permalink,
        title: item.caption ? item.caption.split("\n")[0].slice(0, 80) : null,
        likeCount: item.like_count?.toString() ?? null,
        commentsCount: item.comments_count?.toString() ?? null,
        viewCount: item.video_views?.toString() ?? null,
      }));

    return NextResponse.json(reels);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
