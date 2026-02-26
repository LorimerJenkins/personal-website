"use client";
import { useState, useEffect } from "react";
import styles from "./Landing.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";

interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
}

function Landing() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("TimelineContent");
  const [latestVideo, setLatestVideo] = useState<YouTubeVideo | null>(null);
  const [playing, setPlaying] = useState(false);

  const experienceJourneyText = isLoading
    ? "Experience my story"
    : t("experienceJourney");
  const scrollDownText = isLoading ? "Scroll down to" : t("scrollDown");

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) return;
        const data = await res.json();
        setLatestVideo(data);
      } catch {
        // Silently fail — widget just won't show
      }
    }
    fetchLatestVideo();
  }, []);

  return (
    <div className={styles.heroSection}>
      {/* Video Background */}
      <div className={styles.videoBackground}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* Latest YouTube Video - Bottom Left */}
      {latestVideo && (
        <div className={styles.youtubeWidget}>
          <div className={styles.youtubeLabel}>
            <span className={styles.youtubeLabelText}>
              latest youtube video
            </span>
            <svg
              className={styles.youtubeArrowIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 7l10 10" />
              <path d="M17 7v10H7" />
            </svg>
          </div>
          <div className={styles.youtubeEmbed}>
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${latestVideo.videoId}?autoplay=1&modestbranding=1&rel=0`}
                title={latestVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.youtubeIframe}
              />
            ) : (
              <button
                className={styles.youtubeThumbnail}
                onClick={() => setPlaying(true)}
                aria-label={`Play: ${latestVideo.title}`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${latestVideo.videoId}/mqdefault.jpg`}
                  alt={latestVideo.title}
                  className={styles.thumbnailImg}
                />
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
        </div>
      )}

      {/* Music Player - Bottom Center */}
      <MusicPlayer />

      {/* Scroll Indicator - Bottom Right */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>{scrollDownText}</div>
        <div className={styles.scrollText}>{experienceJourneyText}</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </div>
  );
}

export default Landing;
