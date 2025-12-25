"use client";
import styles from "./Landing.module.css";
import { useTranslation } from "@/hooks/useTranslation";

function Landing() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("TimelineContent");

  const experienceJourneyText = isLoading
    ? "Experience my story"
    : t("experienceJourney");
  const scrollDownText = isLoading ? "Scroll down to" : t("scrollDown");

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

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>{scrollDownText}</div>
        <div className={styles.scrollText}>{experienceJourneyText}</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </div>
  );
}

export default Landing;
