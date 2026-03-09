"use client";
import styles from "./Podcast.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";

const PODCAST_PLAYLIST_ID = "PLW2HBCD0eDt8embfQoa1ZUsy4koGl0ftF";
const SORT: "latest" | "views" = "views";

interface PlaylistVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

interface PodcastPlatform {
  id: string;
  name: string;
  icon: string;
  url: string;
}

const podcastPlatforms: PodcastPlatform[] = [
  {
    id: "spotify",
    name: "Spotify",
    icon: "/images/icons/podcast/spotify.png",
    url: "https://open.spotify.com/show/1zX33EudHcW06K2I2i0Y79",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "/images/icons/podcast/youtube.png",
    url: "https://www.youtube.com/@lorimerjenkins/podcasts",
  },
  {
    id: "apple",
    name: "Apple Podcasts",
    icon: "/images/icons/podcast/applePodcasts.png",
    url: "https://podcasts.apple.com/us/podcast/lorimer-jenkins/id1859074446",
  },
  {
    id: "amazon",
    name: "Amazon Music",
    icon: "/images/icons/podcast/amazonMusic.png",
    url: "https://music.amazon.co.uk/podcasts/301f3ed5-e56a-4c5c-857f-792625815655/lorimer-jenkins",
  },
  {
    id: "castbox",
    name: "Castbox",
    icon: "/images/icons/podcast/castbox.png",
    url: "https://castbox.fm/channel/id6901588",
  },
  {
    id: "goodpods",
    name: "Goodpods",
    icon: "/images/icons/podcast/goodpods.png",
    url: "https://goodpods.com/podcasts/lorimer-jenkins-715357",
  },
  {
    id: "iheartradio",
    name: "iHeartRadio",
    icon: "/images/icons/podcast/iheartradio.png",
    url: "https://www.iheart.com/podcast/311238681/",
  },
  {
    id: "overcast",
    name: "Overcast",
    icon: "/images/icons/podcast/overcast.png",
    url: "https://overcast.fm/p5503771-jUYhUF",
  },
  {
    id: "pocketcasts",
    name: "Pocket Casts",
    icon: "/images/icons/podcast/pocketcasts.png",
    url: "https://pca.st/05wo15t3",
  },
];

function formatCount(count: string): string {
  const n = parseInt(count, 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function Podcast() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Podcast");
  const [videos, setVideos] = useState<PlaylistVideo[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const title = isLoading ? "Lorimer's Podcast" : t("title");
  const description = isLoading
    ? "Join me for deep conversations with founders, investors, and builders in the startup ecosystem. I explore the stories behind the projects, the lessons learned, and the future of various technologies."
    : t("description");
  const listenOn = isLoading ? "Listen on" : t("listenOn");

  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const res = await fetch(
          `/api/youtube-playlist?playlistId=${PODCAST_PLAYLIST_ID}&sort=${SORT}`,
        );
        if (!res.ok) return;
        const data = await res.json();
        setVideos(data);
      } catch {
        // Silently fail
      }
    }
    fetchPlaylist();
  }, []);

  const eyeIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );

  const likeIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );

  const commentIcon = (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  return (
    <section id="podcast" className={styles.podcastSection}>
      <div className={styles.podcastContainer}>
        <div className={styles.gridSection}>
          <div className={styles.episodeGrid}>
            {videos.map((video) => (
              <div key={video.videoId} className={styles.episodeItem}>
                {/* Thumbnail / iframe */}
                <div className={styles.episodeCard}>
                  {playingId === video.videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&modestbranding=1&rel=0`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.episodeIframe}
                    />
                  ) : (
                    <button
                      className={styles.episodeThumbnailBtn}
                      onClick={() => setPlayingId(video.videoId)}
                      aria-label={`Play: ${video.title}`}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className={styles.episodeImage}
                      />
                      {/* Play button - YouTube style */}
                      <div className={styles.playButton}>
                        <svg height="100%" viewBox="0 0 68 48" width="100%">
                          <path
                            d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                            fill="#212121"
                            fillOpacity="0.8"
                          />
                          <path d="M 45,24 27,14 27,34" fill="#fff" />
                        </svg>
                      </div>
                    </button>
                  )}
                </div>

                {/* Title + stats below */}
                <div className={styles.episodeMeta}>
                  <p className={styles.episodeTitle}>{video.title}</p>
                  {(video.viewCount ||
                    video.likeCount ||
                    video.commentCount) && (
                    <div className={styles.episodeStats}>
                      {video.viewCount && (
                        <span className={styles.episodeStat}>
                          {eyeIcon}
                          {formatCount(video.viewCount)}
                        </span>
                      )}
                      {video.likeCount && (
                        <span className={styles.episodeStat}>
                          {likeIcon}
                          {formatCount(video.likeCount)}
                        </span>
                      )}
                      {video.commentCount && (
                        <span className={styles.episodeStat}>
                          {commentIcon}
                          {formatCount(video.commentCount)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.textSection}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <div className={styles.platformsSection}>
            <span className={styles.listenOnLabel}>{listenOn}</span>
            <div className={styles.platformsGrid}>
              {podcastPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.platformLink}
                  aria-label={platform.name}
                >
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className={styles.platformIcon}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Podcast;
