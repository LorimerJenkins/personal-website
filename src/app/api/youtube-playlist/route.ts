import { NextResponse } from "next/server";

export const revalidate = 3600;

export interface PlaylistVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

async function fetchAllPlaylistVideoIds(
  playlistId: string,
  apiKey: string,
): Promise<string[]> {
  const videoIds: string[] = [];
  let pageToken: string | undefined = undefined;

  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Playlist fetch failed: ${res.status}`);

    const data = await res.json();

    for (const item of data.items ?? []) {
      const id = item.snippet?.resourceId?.videoId;
      if (id) videoIds.push(id);
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return videoIds;
}

async function fetchVideoStats(
  videoIds: string[],
  apiKey: string,
): Promise<PlaylistVideo[]> {
  const videos: PlaylistVideo[] = [];

  // YouTube stats API accepts up to 50 IDs per request
  for (let i = 0; i < videoIds.length; i += 50) {
    const chunk = videoIds.slice(i, i + 50);
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "statistics,snippet");
    url.searchParams.set("id", chunk.join(","));
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Stats fetch failed: ${res.status}`);

    const data = await res.json();

    for (const video of data.items ?? []) {
      videos.push({
        videoId: video.id,
        title: video.snippet?.title ?? "",
        thumbnail:
          video.snippet?.thumbnails?.medium?.url ??
          video.snippet?.thumbnails?.default?.url ??
          "",
        viewCount: video.statistics?.viewCount,
        likeCount: video.statistics?.likeCount,
        commentCount: video.statistics?.commentCount,
      });
    }
  }

  return videos;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("playlistId");
  const sort = searchParams.get("sort") ?? "views"; // "views" | "latest"
  const limit = parseInt(searchParams.get("limit") ?? "9", 10);

  if (!playlistId) {
    return NextResponse.json(
      { error: "playlistId is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "YouTube API key not configured" },
      { status: 500 },
    );
  }

  try {
    // Fetch all video IDs across all pages
    const allVideoIds = await fetchAllPlaylistVideoIds(playlistId, apiKey);

    if (!allVideoIds.length) {
      return NextResponse.json({ error: "Playlist is empty" }, { status: 404 });
    }

    // Fetch stats for every video (batched in 50s)
    const allVideos = await fetchVideoStats(allVideoIds, apiKey);

    // Sort
    if (sort === "views") {
      allVideos.sort(
        (a, b) =>
          parseInt(b.viewCount ?? "0", 10) - parseInt(a.viewCount ?? "0", 10),
      );
    }
    // "latest" keeps playlist order (YouTube returns newest first by default)

    return NextResponse.json(allVideos.slice(0, limit));
  } catch (error) {
    console.error("YouTube playlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
