"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./Landing.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { parseLinks } from "@/utils/parseLinks";

// Define background videos here
const BACKGROUND_VIDEOS = [
  { src: "/videos/landing/1.mp4" },
  { src: "/videos/landing/2.mp4" },
];

function Landing() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("TimelineContent");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const heroTitleText = isLoading
    ? "I'm a founder from England currently nomading around the US/UK/EU in AirBnb's. I'm interested in crypto, startups and software development. I have a background in venture capital and acting."
    : t("heroTitle");
  const getInTouchText = isLoading ? "Get in touch" : t("getInTouch");
  const experienceJourneyText = isLoading
    ? "Experience my story"
    : t("experienceJourney");
  const scrollDownText = isLoading ? "Scroll down to" : t("scrollDown");

  // Handle video end - move to next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === BACKGROUND_VIDEOS.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // Play video when source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [currentVideoIndex]);

  return (
    <div className={styles.heroSection}>
      {/* Video Background */}
      <div className={styles.videoBackground}>
        <video
          ref={videoRef}
          className={styles.backgroundVideo}
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        >
          <source
            src={BACKGROUND_VIDEOS[currentVideoIndex].src}
            type="video/mp4"
          />
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
