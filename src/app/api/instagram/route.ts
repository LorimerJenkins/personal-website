import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "No Instagram token" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp,caption,like_count,comments_count,video_views&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      const errorBody = await res.text();
      console.error("Instagram API error:", errorBody);
      throw new Error(`Instagram API failed: ${res.status}`);
    }

    const data = await res.json();

    const latestReel = data.data?.find((p: any) => p.media_type === "VIDEO");

    if (!latestReel) {
      return NextResponse.json({ error: "No reel found" }, { status: 404 });
    }

    const caption = latestReel.caption ?? "";
    const title = caption.split("\n")[0].slice(0, 60) || "Latest Reel";

    return NextResponse.json({
      id: latestReel.id,
      mediaUrl: latestReel.media_url,
      thumbnailUrl: latestReel.thumbnail_url,
      permalink: latestReel.permalink,
      title,
      likeCount: latestReel.like_count?.toString(),
      commentsCount: latestReel.comments_count?.toString(),
      viewCount: latestReel.video_views?.toString(),
    });
  } catch (error) {
    console.error("Failed to fetch Instagram reel:", error);
    return NextResponse.json(
      { error: "Failed to fetch reel" },
      { status: 500 },
    );
  }
}
