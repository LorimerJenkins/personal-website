"use client";
import styles from "./Landing.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { parseLinks } from "@/utils/parseLinks";

function Landing() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("TimelineContent");

  const heroTitleText = isLoading
    ? "I'm a founder from England currently nomading around the US/UK/EU in AirBnb's. I'm interested in crypto, startups and software development. I have a background in venture capital and acting."
    : t("heroTitle");
  const getInTouchText = isLoading ? "Get in touch" : t("getInTouch");
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

      <div className={styles.heroContent}>
        <h2 className={styles.heroTitle}>{parseLinks(heroTitleText)}</h2>

        <a
          href="mailto:hellolorimerjenkins@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.heroGetInTouch}
        >
          {getInTouchText}
        </a>
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
