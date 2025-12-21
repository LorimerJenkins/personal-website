"use client";
import { useEffect } from "react";
import styles from "./feed.module.css";
import { useTranslation } from "@/hooks/useTranslation";

export function Feed() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Feed");

  const sectionTitle = isLoading ? "Latest Updates" : t("sectionTitle");
  const sectionSubtitle = isLoading
    ? "Check out my latest content from YouTube and X"
    : t("sectionSubtitle");
  const youtubeText = isLoading ? "YouTube" : t("youtube");
  const twitterText = isLoading ? "X (Twitter)" : t("twitter");

  useEffect(() => {
    // Load YouTube widget script
    const ytScript = document.createElement("script");
    ytScript.src =
      "https://widgets.sociablekit.com/youtube-channel-videos/widget.js";
    ytScript.defer = true;
    document.body.appendChild(ytScript);

    // Load Twitter widget script
    const twScript = document.createElement("script");
    twScript.src = "https://widgets.sociablekit.com/twitter-feed/widget.js";
    twScript.defer = true;
    document.body.appendChild(twScript);

    return () => {
      document
        .querySelectorAll('script[src*="sociablekit.com"]')
        .forEach((s) => s.remove());
    };
  }, []);

  return (
    <section className={styles.feedSection}>
      <div className={styles.feedContainer}>
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>

        <div className={styles.feedGrid}>
          {/* YouTube Feed */}
          <div className={styles.feedCard}>
            <div className={styles.feedHeader}>
              <img
                src="/images/icons/social-media/youtube.svg"
                alt="YouTube"
                className={styles.feedIcon}
              />
              <h3 className={styles.feedTitle}>{youtubeText}</h3>
            </div>
            <div className={styles.feedContent}>
              <div
                className="sk-ww-youtube-channel-videos"
                data-embed-id="25635676"
              ></div>
            </div>
          </div>

          {/* X (Twitter) Feed */}
          <div className={styles.feedCard}>
            <div className={styles.feedHeader}>
              <img
                src="/images/icons/social-media/x.svg"
                alt="X"
                className={styles.feedIcon}
              />
              <h3 className={styles.feedTitle}>{twitterText}</h3>
            </div>
            <div className={styles.feedContent}>
              <div
                className="sk-ww-twitter-feed"
                data-embed-id="25635679"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feed;
