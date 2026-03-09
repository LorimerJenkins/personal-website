import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "Instagram token not configured" },
      { status: 500 },
    );
  }

  try {
    const fields =
      "id,media_type,media_url,thumbnail_url,permalink,timestamp,caption,like_count,comments_count,video_views";
    const res = await fetch(
      `https://graph.instagram.com/v21.0/me/media?fields=${fields}&limit=50&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Instagram media" },
        { status: res.status },
      );
    }

    const data = await res.json();

    const reels = data.data
      ?.filter((p: any) => p.media_type === "VIDEO")
      .slice(0, 3);

    if (!reels?.length) {
      return NextResponse.json({ error: "No reels found" }, { status: 404 });
    }

    return NextResponse.json(
      reels.map((reel: any) => {
        const caption = reel.caption ?? "";
        const title = caption.split("\n")[0].slice(0, 60) || undefined;
        return {
          id: reel.id,
          mediaUrl: reel.media_url,
          thumbnailUrl: reel.thumbnail_url,
          permalink: reel.permalink,
          title,
          likeCount: reel.like_count?.toString(),
          commentsCount: reel.comments_count?.toString(),
          viewCount: reel.video_views?.toString(),
        };
      }),
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
