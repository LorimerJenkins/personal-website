import { NextResponse } from "next/server";

const CHANNEL_ID = "UCmaeuAdB_ZnQ7UFOoS_z1pg";
const API_KEY = process.env.YOUTUBE_API_KEY;

export const revalidate = 3600;

export async function GET() {
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const response = await fetch(feedUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`YouTube RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();

    const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = xml.match(/<entry>[\s\S]*?<title>([^<]+)<\/title>/);
    const thumbnailMatch = xml.match(/<media:thumbnail url="([^"]+)"/);

    if (!videoIdMatch) {
      throw new Error("No video found in feed");
    }

    const videoId = videoIdMatch[1];

    let viewCount: string | undefined;
    let likeCount: string | undefined;
    let commentCount: string | undefined;

    if (API_KEY) {
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`,
        { next: { revalidate: 3600 } },
      );
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        const stats = statsData.items?.[0]?.statistics;
        viewCount = stats?.viewCount;
        likeCount = stats?.likeCount;
        commentCount = stats?.commentCount;
      }
    }

    return NextResponse.json({
      videoId,
      title: titleMatch?.[1] ?? "Latest Video",
      thumbnail:
        thumbnailMatch?.[1] ??
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      viewCount,
      likeCount,
      commentCount,
    });
  } catch (error) {
    console.error("Failed to fetch latest YouTube video:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest video" },
      { status: 500 },
    );
  }
}
