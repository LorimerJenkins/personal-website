"use client";
import styles from "./Landing.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { parseLinks } from "@/utils/parseLinks";

interface LandingProps {
  heroHeight: number;
}

function Landing({ heroHeight }: LandingProps) {
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
    <div
      className={styles.heroSection}
      style={{ minHeight: heroHeight + "px" }}
    >
      <div className={styles.heroContent}>
        <div className={styles.heroPhotoContainer}>
          <img
            src="/images/hero.jpeg"
            alt="Lorimer Jenkins"
            className={styles.heroPhoto}
          />
        </div>
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
