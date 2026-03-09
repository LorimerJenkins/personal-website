"use client";
import { useState, useEffect } from "react";
import styles from "./Landing.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Link from "next/link";
import { blogs } from "@/app/writing/slugs";
import { fetchBlogPost, type BlogPostData } from "@/app/writing/BlogLoader";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";

interface YouTubeVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

interface InstagramReel {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  title?: string;
  likeCount?: string;
  commentsCount?: string;
  viewCount?: string;
}

function formatCount(count: string): string {
  const n = parseInt(count, 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function Landing() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("TimelineContent");
  const [latestVideo, setLatestVideo] = useState<YouTubeVideo | null>(null);
  const [playingDesktop, setPlayingDesktop] = useState(false);
  const [playingMobile, setPlayingMobile] = useState(false);
  const [latestBlog, setLatestBlog] = useState<{
    slug: string;
    data: BlogPostData;
  } | null>(null);
  const [latestReel, setLatestReel] = useState<InstagramReel | null>(null);

  const experienceJourneyText = isLoading
    ? "Experience my story"
    : t("experienceJourney");
  const scrollDownText = isLoading ? "Scroll down to" : t("scrollDown");

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const res = await fetch("/api/youtube");
        if (!res.ok) return;
        setLatestVideo(await res.json());
      } catch {}
    }
    fetchLatestVideo();
  }, []);

  useEffect(() => {
    async function loadLatestBlog() {
      if (blogs.length === 0) return;
      const locale = getLocaleFromStorage();
      const slug = blogs[0].slug;
      const data = await fetchBlogPost(slug, locale);
      if (data) setLatestBlog({ slug, data });
    }
    loadLatestBlog();
  }, []);

  useEffect(() => {
    async function fetchLatestReel() {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) return;
        const data = await res.json();
        setLatestReel(Array.isArray(data) ? data[0] : data);
      } catch {}
    }
    fetchLatestReel();
  }, []);

  const eyeIcon = (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  );
  const likeIcon = (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );
  const commentIcon = (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

  const videoStats = latestVideo &&
    (latestVideo.viewCount ||
      latestVideo.likeCount ||
      latestVideo.commentCount) && (
      <div className={styles.videoStats}>
        {latestVideo.viewCount && (
          <span className={styles.videoStat}>
            {eyeIcon}
            {formatCount(latestVideo.viewCount)}
          </span>
        )}
        {latestVideo.likeCount && (
          <span className={styles.videoStat}>
            {likeIcon}
            {formatCount(latestVideo.likeCount)}
          </span>
        )}
        {latestVideo.commentCount && (
          <span className={styles.videoStat}>
            {commentIcon}
            {formatCount(latestVideo.commentCount)}
          </span>
        )}
      </div>
    );

  const reelStats = latestReel &&
    (latestReel.viewCount ||
      latestReel.likeCount ||
      latestReel.commentsCount) && (
      <div className={styles.videoStats}>
        {latestReel.viewCount && (
          <span className={styles.videoStat}>
            {eyeIcon}
            {formatCount(latestReel.viewCount)}
          </span>
        )}
        {latestReel.likeCount && (
          <span className={styles.videoStat}>
            {likeIcon}
            {formatCount(latestReel.likeCount)}
          </span>
        )}
        {latestReel.commentsCount && (
          <span className={styles.videoStat}>
            {commentIcon}
            {formatCount(latestReel.commentsCount)}
          </span>
        )}
      </div>
    );

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

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>{scrollDownText}</div>
        <div className={styles.scrollText}>{experienceJourneyText}</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>

      {/* ===== Desktop Widgets ===== */}

      {/* YouTube — Bottom Left */}
      {latestVideo && (
        <div className={styles.youtubeWidget}>
          <a
            href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.widgetLabelLink}
          >
            <span className={styles.widgetLabelText}>latest youtube video</span>
            <svg
              className={styles.widgetArrowIcon}
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
          </a>
          <div className={styles.youtubeEmbed}>
            {playingDesktop ? (
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
                onClick={() => setPlayingDesktop(true)}
                aria-label={`Play: ${latestVideo.title}`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${latestVideo.videoId}/mqdefault.jpg`}
                  alt={latestVideo.title}
                  className={styles.thumbnailImg}
                />
                {videoStats}
                <div className={styles.titleOverlay}>
                  <a
                    href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.titleOverlayLink}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {latestVideo.title}
                  </a>
                </div>
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

      {/* Music Player — Bottom Center */}
      <MusicPlayer />

      {/* Right Column — Reel + Blog */}
      <div className={styles.rightColumn}>
        {latestReel && (
          <div className={styles.reelWidget}>
            <a
              href={latestReel.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.widgetLabelLinkRight}
            >
              <svg
                className={styles.widgetArrowIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 7L7 17" />
                <path d="M7 7v10h10" />
              </svg>
              <span className={styles.widgetLabelText}>
                latest instagram reel
              </span>
            </a>
            <a
              href={latestReel.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reelEmbed}
            >
              {latestReel.thumbnailUrl ? (
                <img
                  src={latestReel.thumbnailUrl}
                  alt={latestReel.title ?? "Latest Instagram Reel"}
                  className={styles.thumbnailImg}
                />
              ) : (
                <video
                  src={latestReel.mediaUrl}
                  className={styles.thumbnailImg}
                  muted
                  playsInline
                />
              )}
              {reelStats}
              <div className={styles.titleOverlay}>
                <span className={styles.titleOverlayLink}>
                  {latestReel.title ?? "view on instagram"}
                </span>
              </div>
              <div className={styles.reelPlayIcon}>
                <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>
          </div>
        )}

        {latestBlog && (
          <div className={styles.blogWidget}>
            <Link
              href={`/writing/${latestBlog.slug}`}
              className={styles.widgetLabelLinkRight}
            >
              <svg
                className={styles.widgetArrowIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 7L7 17" />
                <path d="M7 7v10h10" />
              </svg>
              <span className={styles.widgetLabelText}>latest blog post</span>
            </Link>
            <Link
              href={`/writing/${latestBlog.slug}`}
              className={styles.blogEmbed}
            >
              {latestBlog.data.headerImage ? (
                <img
                  src={latestBlog.data.headerImage}
                  alt={latestBlog.data.title}
                  className={styles.thumbnailImg}
                />
              ) : (
                <div className={styles.blogPlaceholder} />
              )}
              <div className={styles.titleOverlay}>
                <span className={styles.titleOverlayLink}>
                  {latestBlog.data.title}
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* ===== Mobile Widgets ===== */}
      {/*
        ┌──────────────┬──────────────┐
        │              │  [reel 45%]  │
        │   YouTube    ├──────────────┤
        │              │  Blog (16:9) │
        └──────────────┴──────────────┘
        │         Music Player        │
      */}
      <div className={styles.mobileWidgets}>
        <div className={styles.mobileRow}>
          {/* Left: YouTube */}
          {latestVideo && (
            <div className={styles.mobileLeft}>
              <a
                href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileLabelLink}
              >
                <span className={styles.mobileLabelText}>latest youtube</span>
                <svg
                  className={styles.mobileLabelIcon}
                  width="12"
                  height="12"
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
              </a>
              <div className={styles.mobileMedia}>
                {playingMobile ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${latestVideo.videoId}?autoplay=1&modestbranding=1&rel=0`}
                    title={latestVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className={styles.mobileIframe}
                  />
                ) : (
                  <button
                    className={styles.mobileThumbnailBtn}
                    onClick={() => setPlayingMobile(true)}
                    aria-label={`Play: ${latestVideo.title}`}
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${latestVideo.videoId}/mqdefault.jpg`}
                      alt={latestVideo.title}
                      className={styles.mobileThumbnailImg}
                    />
                    {videoStats}
                    <div className={styles.mobileTitleOverlay}>
                      <a
                        href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mobileTitleLink}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {latestVideo.title}
                      </a>
                    </div>
                    <div className={styles.mobilePlayBtn}>
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

          {/* Right: Reel above Blog */}
          <div className={styles.mobileRight}>
            {latestReel && (
              <div className={styles.mobileReelItem}>
                <a
                  href={latestReel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileLabelLinkRight}
                >
                  <svg
                    className={styles.mobileLabelIcon}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 7L7 17" />
                    <path d="M7 7v10h10" />
                  </svg>
                  <span className={styles.mobileLabelText}>latest reel</span>
                </a>
                <a
                  href={latestReel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mobileReelEmbed}
                >
                  {latestReel.thumbnailUrl ? (
                    <img
                      src={latestReel.thumbnailUrl}
                      alt={latestReel.title ?? "Latest Reel"}
                      className={styles.mobileThumbnailImg}
                    />
                  ) : (
                    <video
                      src={latestReel.mediaUrl}
                      className={styles.mobileThumbnailImg}
                      muted
                      playsInline
                    />
                  )}
                  {reelStats}
                  <div className={styles.mobileTitleOverlay}>
                    <span className={styles.mobileTitleLink}>
                      {latestReel.title ?? "instagram"}
                    </span>
                  </div>
                </a>
              </div>
            )}

            {latestBlog && (
              <div className={styles.mobileBlogItem}>
                <Link
                  href={`/writing/${latestBlog.slug}`}
                  className={styles.mobileLabelLinkRight}
                >
                  <svg
                    className={styles.mobileLabelIcon}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 7L7 17" />
                    <path d="M7 7v10h10" />
                  </svg>
                  <span className={styles.mobileLabelText}>latest blog</span>
                </Link>
                <Link
                  href={`/writing/${latestBlog.slug}`}
                  className={styles.mobileBlogEmbed}
                >
                  {latestBlog.data.headerImage ? (
                    <img
                      src={latestBlog.data.headerImage}
                      alt={latestBlog.data.title}
                      className={styles.mobileThumbnailImg}
                    />
                  ) : (
                    <div className={styles.mobilePlaceholder} />
                  )}
                  <div className={styles.mobileTitleOverlay}>
                    <span className={styles.mobileTitleLink}>
                      {latestBlog.data.title}
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
