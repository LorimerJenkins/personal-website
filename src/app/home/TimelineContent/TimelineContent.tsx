"use client";
import styles from "./TimelineContent.module.css";
import { TimelineYear, TimelinePhoto } from "../timelineData";
import { useTranslation } from "@/hooks/useTranslation";
import { parseLinks } from "@/utils/parseLinks";

interface TimelineContentProps {
  timelineData: TimelineYear[];
  heightPerSection: number;
  heroHeight: number;
}

interface PhotoBoxProps {
  photo: TimelinePhoto;
  alt: string;
  placeholderText: string;
  index: number;
  title?: string;
}

function PhotoBox({
  photo,
  alt,
  placeholderText,
  index,
  title,
}: PhotoBoxProps) {
  const imageAlt = title || alt;

  const content = (
    <div
      className={`${styles.photoBox} ${photo.link ? styles.photoBoxClickable : ""}`}
    >
      {photo.src ? (
        <img src={photo.src} alt={imageAlt} className={styles.photoImage} />
      ) : (
        <span className={styles.photoPlaceholder}>
          {placeholderText} {index + 1}
        </span>
      )}
      {title && <div className={styles.photoTitle}>{title}</div>}
      {photo.link && (
        <div className={styles.linkIndicator}>
          <img
            src="/images/icons/misc/link.svg"
            alt="Link"
            className={styles.linkIcon}
          />
        </div>
      )}
    </div>
  );

  if (photo.link) {
    return (
      <a
        href={photo.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.photoLink}
      >
        {content}
      </a>
    );
  }

  return content;
}

function TimelineContent({
  timelineData,
  heightPerSection,
  heroHeight,
}: TimelineContentProps) {
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
  const photoPlaceholderText = isLoading ? "Photo" : t("photoPlaceholder");

  const twitterUrl = "https://x.com/Lorimer_Jenkins";

  // Helper function to get photo title
  const getPhotoTitle = (titleKey?: string): string | undefined => {
    if (!titleKey) return undefined;
    return isLoading ? titleKey : t(titleKey);
  };

  // Extracted component for timeline section content to avoid duplication
  const TimelineSectionContent = ({
    data,
    title,
    description,
  }: {
    data: TimelineYear;
    title: string;
    description: string;
  }) => (
    <div className={styles.content}>
      <div className={styles.headerRow}>
        <img src={data.milestone} alt="" className={styles.milestoneIcon} />
        <div className={styles.yearTitle}>{data.year}</div>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{parseLinks(description)}</p>
      <div className={styles.photos}>
        {data.photos.slice(0, 6).map((photo, index) => (
          <PhotoBox
            key={index}
            photo={photo}
            alt={`${title} - ${photoPlaceholderText} ${index + 1}`}
            placeholderText={photoPlaceholderText}
            index={index}
            title={getPhotoTitle(photo.titleKey)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.contentContainer}>
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
            href={twitterUrl}
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
            style={{ minHeight: heightPerSection + "px" }}
          >
            <div className={styles.sectionInner}>
              <div className={styles.grid}>
                <div
                  className={`${styles.side} ${
                    isLeft ? styles.activeLeft : styles.inactive
                  }`}
                >
                  {isLeft && (
                    <TimelineSectionContent
                      data={data}
                      title={title}
                      description={description}
                    />
                  )}
                </div>
                <div
                  className={`${styles.side} ${
                    !isLeft ? styles.activeRight : styles.inactive
                  }`}
                >
                  {!isLeft && (
                    <TimelineSectionContent
                      data={data}
                      title={title}
                      description={description}
                    />
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
