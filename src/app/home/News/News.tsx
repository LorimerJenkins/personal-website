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
  date: string;
  logoHeight?: number;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    titleKey: "peterPodcastTitle",
    link: "https://open.spotify.com/episode/4EQf8R55hFbTJJ510Zrftv",
    headerImage: "/images/news/images/peterPodcast.png",
    publicationLogo: "/images/news/publications/peterPodcast.jpeg",
    publicationName: "Peter Yuan Lu",
    date: "February 27, 2022",
    logoHeight: 70,
  },
  {
    titleKey: "permawebPioneersTitle",
    link: "https://podcasts.apple.com/us/podcast/using-web2-credentials-for-arweave-transactions-with/id1591551590?i=1000616156424",
    headerImage: "/images/news/images/permawebPioneers.png",
    publicationLogo: "/images/news/publications/permawebPioneers.webp",
    publicationName: "Permaweb Pioneers",
    date: "June 8, 2023",
    logoHeight: 60,
  },
  {
    titleKey: "stampShowTitle",
    link: "https://www.youtube.com/watch?v=0ink14_nKtQ",
    headerImage: "/images/news/images/stampShow.png",
    publicationLogo: "/images/news/publications/stampShow.jpg",
    publicationName: "Stamp Show",
    date: "August 31, 2023",
    logoHeight: 70,
  },
  {
    titleKey: "aoVenturesTitle",
    link: "https://www.youtube.com/watch?v=3YKbquuyjq0&list=PLW2HBCD0eDt_5jmsNk7EEoZZiHEJaczTs&index=1",
    headerImage: "/images/news/images/aoVentures.png",
    publicationLogo: "/images/news/publications/aoVentures.svg",
    publicationName: "AO Ventures",
    date: "April 26, 2024",
    logoHeight: 70,
  },
  {
    titleKey: "news1Title",
    link: "https://medium.com/@perma_dao/devs-partner-to-build-arweaves-first-lending-protocol-built-with-ao-92abb69c9829",
    headerImage: "/images/news/images/PermaDAO.png",
    publicationLogo: "/images/news/publications/PermaDAO.png",
    publicationName: "PermaDAO",
    date: "June 26, 2024",
    logoHeight: 40,
  },
  {
    titleKey: "news2Title",
    link: "https://www.ibtimes.co.uk/revolutionizing-defi-how-lorimer-jenkins-marton-lederer-are-transforming-arweave-liquidops-1729945",
    headerImage: "/images/news/images/IBTimes.jpeg",
    publicationLogo: "/images/news/publications/IBT.svg",
    publicationName: "IBTimes",
    date: "January 7, 2025",
  },
  {
    titleKey: "liquidOpsTitle",
    link: "https://x.com/Liquid_Ops/status/1882818194433560694?s=20",
    headerImage: "/images/news/images/testnetLaunch.png",
    publicationLogo: "/images/news/publications/liquidops.svg",
    publicationName: "LiquidOps",
    date: "January 24, 2025",
    logoHeight: 40,
  },
  {
    titleKey: "news3Title",
    link: "https://venturebeat.com/business/unlocking-the-future-of-decentralized-finance-lorimer-jenkins-journey-in-building-defi-and-web3",
    headerImage: "/images/news/images/VentureBeat.jpeg",
    publicationLogo: "/images/news/publications/VentureBeat.svg",
    publicationName: "VentureBeat",
    date: "January 29, 2025",
  },
  {
    titleKey: "ethDenverTitle",
    link: "https://x.com/EthereumDenver/status/1894919170409812139?s=20",
    headerImage: "/images/news/images/ethDenver.png",
    publicationLogo: "/images/news/publications/ethDenver.png",
    publicationName: "Ethereum Denver",
    date: "February 27, 2025",
    logoHeight: 60,
  },
  {
    titleKey: "communityLabsTitle",
    link: "https://www.youtube.com/watch?v=iXoDpATJEiE&t=868s",
    headerImage: "/images/news/images/communityLabs.jpg",
    publicationLogo: "/images/news/publications/communityLabs.svg",
    publicationName: "Community Labs, Tate Berenbaum, Matt Mason, David Kong",
    date: "August 14, 2025",
    logoHeight: 50,
  },
  {
    titleKey: "aoTitle",
    link: "https://www.youtube.com/watch?v=Gn8nytciY6I",
    headerImage: "/images/news/images/aoTheComputer.png",
    publicationLogo: "/images/news/publications/ao.svg",
    publicationName: "aoTheComputer",
    date: "February 6, 2026",
    logoHeight: 40,
  },
  {
    titleKey: "news4Title",
    link: "https://www.cryptonexa.com/liquid-labs-acquires-astro-to-expand-arweave-defi/",
    headerImage: "/images/news/images/CryptoNexa.JPG",
    publicationLogo: "/images/news/publications/CryptoNexa.png",
    publicationName: "CryptoNexa",
    date: "February 10, 2026",
    logoHeight: 50,
  },
];

const DEFAULT_VISIBLE_ITEMS = 3;
const AUTO_ROTATE_INTERVAL = 5000;

const getVisibleItems = (width: number): number => {
  if (width <= 768) return 1;
  if (width <= 1024) return 2;
  return 3;
};

export function News() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("News");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(DEFAULT_VISIBLE_ITEMS);

  const reversedItems = useMemo(() => [...NEWS_ITEMS].reverse(), []);

  const sectionTitle = isLoading ? "In the wild" : t("sectionTitle");
  const sectionSubtitle = isLoading
    ? "Featured coverage and appearances"
    : t("sectionSubtitle");

  // Track window width and update visible items count
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems(window.innerWidth));
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reversedItems.length - visibleItems);

  // Reset currentIndex if it exceeds new maxIndex after resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

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
  // Each card wrapper takes exactly (100 / visibleItems)% of the track
  const getTranslateX = () => {
    const itemWidthPercent = 100 / visibleItems;
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
                <div
                  key={`${item.titleKey}-${index}`}
                  className={styles.newsCardWrapper}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.newsCard}
                  >
                    <div className={styles.newsImageWrapper}>
                      <img
                        src={item.headerImage}
                        alt={item.publicationName}
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
                          style={
                            item.logoHeight
                              ? { maxHeight: item.logoHeight }
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </a>
                </div>
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
