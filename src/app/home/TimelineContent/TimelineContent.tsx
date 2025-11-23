"use client";
import styles from "./TimelineContent.module.css";
import { TimelineYear } from "../timelineData";
import { useTranslation } from "@/hooks/useTranslation";

interface TimelineContentProps {
  timelineData: TimelineYear[];
  heightPerSection: number;
  heroHeight: number;
}

function TimelineContent({
  timelineData,
  heightPerSection,
  heroHeight,
}: TimelineContentProps) {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("TimelineContent");

  const heroTitleText = isLoading
    ? "I'm a Builder from England 🇬🇧 interested in Crypto, Startups and Software Development with a background in Venture Capital & Acting."
    : t("heroTitle");
  const getInTouchText = isLoading ? "Get in touch." : t("getInTouch");
  const experienceJourneyText = isLoading
    ? "Experience my journey"
    : t("experienceJourney");
  const scrollDownText = isLoading ? "Scroll down" : t("scrollDown");
  const photoPlaceholderText = isLoading ? "Photo" : t("photoPlaceholder");

  const twitterUrl = "https://x.com/Lorimer_Jenkins";

  return (
    <div className={styles.contentContainer}>
      <div className={styles.heroSection} style={{ height: heroHeight + "px" }}>
        <div className={styles.heroContent}>
          <div className={styles.heroPhotoContainer}>
            <img
              src="/images/hero.jpeg"
              alt="Lorimer Jenkins"
              className={styles.heroPhoto}
            />
          </div>
          <h2 className={styles.heroTitle}>{heroTitleText}</h2>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.heroTitle}
            style={{ textDecoration: "underline", margin: 0 }}
          >
            {getInTouchText}
          </a>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollText}>{experienceJourneyText}</div>
          <div className={styles.scrollText}>{scrollDownText}</div>
          <div className={styles.scrollArrow}>↓</div>
        </div>
      </div>

      {timelineData.map((data, index) => {
        const isLeft = index % 2 === 0;
        const title = isLoading ? data.titleKey : t(data.titleKey);
        const description = isLoading
          ? data.descriptionKey
          : t(data.descriptionKey);

        return (
          <div
            key={data.year}
            className={styles.section}
            style={{ height: heightPerSection + "px" }}
          >
            <div className={styles.sectionInner}>
              <div className={styles.grid}>
                <div
                  className={
                    styles.side +
                    " " +
                    (isLeft ? styles.activeLeft : styles.inactive)
                  }
                >
                  {isLeft && (
                    <div className={styles.content}>
                      <div className={styles.headerRow}>
                        <div className={styles.emoji}>{data.milestone}</div>
                        <div className={styles.yearTitle}>{data.year}</div>
                      </div>
                      <h2 className={styles.title}>{title}</h2>
                      <p className={styles.description}>{description}</p>
                      <div className={styles.photos}>
                        <div className={styles.photoBox}>
                          {data.photo1 ? (
                            <img
                              src={data.photo1}
                              alt={title + " - " + photoPlaceholderText + " 1"}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              {photoPlaceholderText} 1
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo2 ? (
                            <img
                              src={data.photo2}
                              alt={title + " - " + photoPlaceholderText + " 2"}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              {photoPlaceholderText} 2
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo3 ? (
                            <img
                              src={data.photo3}
                              alt={title + " - " + photoPlaceholderText + " 3"}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              {photoPlaceholderText} 3
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={
                    styles.side +
                    " " +
                    (!isLeft ? styles.activeRight : styles.inactive)
                  }
                >
                  {!isLeft && (
                    <div className={styles.content}>
                      <div className={styles.headerRow}>
                        <div className={styles.emoji}>{data.milestone}</div>
                        <div className={styles.yearTitle}>{data.year}</div>
                      </div>
                      <h2 className={styles.title}>{title}</h2>
                      <p className={styles.description}>{description}</p>
                      <div className={styles.photos}>
                        <div className={styles.photoBox}>
                          {data.photo1 ? (
                            <img
                              src={data.photo1}
                              alt={title + " - " + photoPlaceholderText + " 1"}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              {photoPlaceholderText} 1
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo2 ? (
                            <img
                              src={data.photo2}
                              alt={title + " - " + photoPlaceholderText + " 2"}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              {photoPlaceholderText} 2
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo3 ? (
                            <img
                              src={data.photo3}
                              alt={title + " - " + photoPlaceholderText + " 3"}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              {photoPlaceholderText} 3
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimelineContent;
