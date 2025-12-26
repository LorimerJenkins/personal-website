"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./News.module.css";
import { useTranslation } from "@/hooks/useTranslation";

export interface NewsItem {
  titleKey: string;
  link: string;
  headerImage: string;
  publicationLogo: string;
  publicationName: string;
  logoHeight: number;
  date: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    titleKey: "news1Title",
    link: "https://medium.com/@perma_dao/devs-partner-to-build-arweaves-first-lending-protocol-built-with-ao-92abb69c9829",
    headerImage: "/images/news/images/PermaDAO.png",
    publicationLogo: "/images/news/publications/PermaDAO.png",
    publicationName: "PermaDAO",
    logoHeight: 30,
    date: "June 26, 2024",
  },
  {
    titleKey: "news2Title",
    link: "https://www.ibtimes.co.uk/revolutionizing-defi-how-lorimer-jenkins-marton-lederer-are-transforming-arweave-liquidops-1729945",
    headerImage: "/images/news/images/IBTimes.jpeg",
    publicationLogo: "/images/news/publications/IBT.svg",
    publicationName: "IBTimes",
    logoHeight: 12,
    date: "January 7, 2025",
  },
  {
    titleKey: "news3Title",
    link: "https://venturebeat.com/business/unlocking-the-future-of-decentralized-finance-lorimer-jenkins-journey-in-building-defi-and-web3",
    headerImage: "/images/news/images/VentureBeat.jpeg",
    publicationLogo: "/images/news/publications/VentureBeat.svg",
    publicationName: "VentureBeat",
    logoHeight: 24,
    date: "January 29, 2025",
  },
];

const VISIBLE_ITEMS = 3;
const AUTO_ROTATE_INTERVAL = 5000;

export function News() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("News");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reversedItems = useMemo(() => [...NEWS_ITEMS].reverse(), []);

  const sectionTitle = isLoading ? "In the News" : t("sectionTitle");
  const sectionSubtitle = isLoading
    ? "Featured coverage and media appearances"
    : t("sectionSubtitle");

  const maxIndex = reversedItems.length - VISIBLE_ITEMS;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const getNewsTitle = (titleKey: string, fallback: string): string => {
    return isLoading ? fallback : t(titleKey);
  };

  // Calculate the translation percentage based on current index
  // Each item takes up (100 / VISIBLE_ITEMS)% of the visible area
  const getTranslateX = () => {
    const itemWidthPercent = 100 / VISIBLE_ITEMS;
    return -(currentIndex * itemWidthPercent);
  };

  return (
    <section className={styles.newsSection}>
      <div className={styles.newsContainer}>
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>
        <p className={styles.sectionSubtitle}>{sectionSubtitle}</p>

        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className={styles.carouselArrow}
            onClick={goToPrev}
            aria-label="Previous article"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={styles.carouselViewport}>
            <div
              className={styles.newsTrack}
              style={{ transform: `translateX(${getTranslateX()}%)` }}
            >
              {reversedItems.map((item, index) => (
                <a
                  key={`${item.titleKey}-${index}`}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsCard}
                >
                  <div className={styles.newsImageWrapper}>
                    <img
                      src={item.headerImage}
                      alt=""
                      className={styles.newsImage}
                    />
                  </div>
                  <div className={styles.newsContent}>
                    <div className={styles.titleSection}>
                      <h3 className={styles.newsTitle}>
                        {getNewsTitle(item.titleKey, item.publicationName)}
                      </h3>
                      <span className={styles.newsDate}>{item.date}</span>
                    </div>
                    <div className={styles.publicationInfo}>
                      <img
                        src={item.publicationLogo}
                        alt={item.publicationName}
                        className={styles.publicationLogo}
                        style={{ height: `${item.logoHeight}px` }}
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <button
            className={styles.carouselArrow}
            onClick={goToNext}
            aria-label="Next article"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className={styles.dotsContainer}>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
              onClick={() => goToIndex(index)}
              aria-label={`Go to position ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default News;
