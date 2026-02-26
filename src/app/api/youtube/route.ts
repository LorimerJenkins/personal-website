import { NextResponse } from "next/server";

const CHANNEL_ID = "UCmaeuAdB_ZnQ7UFOoS_z1pg";

export const revalidate = 3600;

export async function GET() {
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const response = await fetch(feedUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      throw new Error(`YouTube RSS fetch failed: ${response.status}`);
    }

    const xml = await response.text();

    // Extract the first (latest) video entry from the RSS feed
    const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const titleMatch = xml.match(/<entry>[\s\S]*?<title>([^<]+)<\/title>/);
    const thumbnailMatch = xml.match(/<media:thumbnail url="([^"]+)"/);

    if (!videoIdMatch) {
      throw new Error("No video found in feed");
    }

    return NextResponse.json({
      videoId: videoIdMatch[1],
      title: titleMatch?.[1] ?? "Latest Video",
      thumbnail:
        thumbnailMatch?.[1] ??
        `https://i.ytimg.com/vi/${videoIdMatch[1]}/hqdefault.jpg`,
    });
  } catch (error) {
    console.error("Failed to fetch latest YouTube video:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest video" },
      { status: 500 },
    );
  }
}
