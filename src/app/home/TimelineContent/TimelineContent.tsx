"use client";
import styles from "./TimelineContent.module.css";
import { TimelineYear } from "../timelineData";

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
  return (
    <div className={styles.contentContainer}>
      {/* Hero section - static, not from timeline data */}
      <div className={styles.heroSection} style={{ height: `${heroHeight}px` }}>
        <div className={styles.heroContent}>
          <div className={styles.heroPhotoContainer}>
            <img
              src={"/images/hero.jpg"}
              alt="Lorimer Jenkins"
              className={styles.heroPhoto}
            />
          </div>
          <h2 className={styles.heroTitle}>
            I'm a Builder from England 🇬🇧 interested in Crypto, Startups and
            Software Development with a background in Venture Capital & Acting.
          </h2>
          <a
            href="https://x.com/Lorimer_Jenkins"
            target="_blank"
            className={styles.heroTitle}
            style={{ textDecoration: "underline", margin: 0 }}
          >
            Get in touch.
          </a>
        </div>

        {/* Scroll down indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollText}>Experience my journey</div>
          <div className={styles.scrollText}>Scroll down</div>
          <div className={styles.scrollArrow}>↓</div>
        </div>
      </div>

      {/* Render ALL timeline data as regular sections */}
      {timelineData.map((data, index) => {
        const isLeft = index % 2 === 0;

        // Regular sections for ALL years
        return (
          <div
            key={data.year}
            className={styles.section}
            style={{ height: `${heightPerSection}px` }}
          >
            <div className={styles.sectionInner}>
              <div className={styles.grid}>
                {/* Left side */}
                <div
                  className={`${styles.side} ${isLeft ? styles.activeLeft : styles.inactive}`}
                >
                  {isLeft && (
                    <div className={styles.content}>
                      <div className={styles.headerRow}>
                        <div className={styles.emoji}>{data.milestone}</div>
                        <div className={styles.yearTitle}>{data.year}</div>
                      </div>
                      <h2 className={styles.title}>{data.title}</h2>
                      <p className={styles.description}>{data.description}</p>

                      <div className={styles.photos}>
                        <div className={styles.photoBox}>
                          {data.photo1 ? (
                            <img
                              src={data.photo1}
                              alt={`${data.title} - Photo 1`}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              Photo 1
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo2 ? (
                            <img
                              src={data.photo2}
                              alt={`${data.title} - Photo 2`}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              Photo 2
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo3 ? (
                            <img
                              src={data.photo3}
                              alt={`${data.title} - Photo 3`}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              Photo 3
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side */}
                <div
                  className={`${styles.side} ${!isLeft ? styles.activeRight : styles.inactive}`}
                >
                  {!isLeft && (
                    <div className={styles.content}>
                      <div className={styles.headerRow}>
                        <div className={styles.emoji}>{data.milestone}</div>
                        <div className={styles.yearTitle}>{data.year}</div>
                      </div>
                      <h2 className={styles.title}>{data.title}</h2>
                      <p className={styles.description}>{data.description}</p>

                      <div className={styles.photos}>
                        <div className={styles.photoBox}>
                          {data.photo1 ? (
                            <img
                              src={data.photo1}
                              alt={`${data.title} - Photo 1`}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              Photo 1
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo2 ? (
                            <img
                              src={data.photo2}
                              alt={`${data.title} - Photo 2`}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              Photo 2
                            </span>
                          )}
                        </div>
                        <div className={styles.photoBox}>
                          {data.photo3 ? (
                            <img
                              src={data.photo3}
                              alt={`${data.title} - Photo 3`}
                              className={styles.photoImage}
                            />
                          ) : (
                            <span className={styles.photoPlaceholder}>
                              Photo 3
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
