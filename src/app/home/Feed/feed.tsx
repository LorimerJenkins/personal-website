"use client";
import { useEffect } from "react";
import styles from "./feed.module.css";

export function Feed() {
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
      // Cleanup scripts on unmount
      document
        .querySelectorAll('script[src*="sociablekit.com"]')
        .forEach((s) => s.remove());
    };
  }, []);

  return (
    <section className={styles.feedSection}>
      <div className={styles.feedContainer}>
        <h2 className={styles.sectionTitle}>Latest Updates</h2>
        <p className={styles.sectionSubtitle}>
          Check out my latest content from YouTube and X
        </p>

        <div className={styles.feedGrid}>
          {/* YouTube Feed */}
          <div className={styles.feedCard}>
            <div className={styles.feedHeader}>
              <img
                src="/images/icons/social-media/youtube.svg"
                alt="YouTube"
                className={styles.feedIcon}
              />
              <h3 className={styles.feedTitle}>YouTube</h3>
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
              <h3 className={styles.feedTitle}>X (Twitter)</h3>
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
