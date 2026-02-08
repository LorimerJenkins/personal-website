"use client";
import styles from "./LatestFilms.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { films, computeOverallRating } from "@/app/films/filmsData";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import Image from "next/image";

function OverallRatingBadge({ rating }: { rating: number }) {
  const cls =
    rating >= 8
      ? styles.ratingHigh
      : rating >= 5
        ? styles.ratingMid
        : styles.ratingLow;

  return (
    <span className={`${styles.overallBadge} ${cls}`}>
      {rating}
      <span className={styles.outOf}>/10</span>
    </span>
  );
}

function LatestFilms() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("LatestFilms");
  const [locale, setLocale] = useState<SupportedLocale>("en");

  useEffect(() => {
    setLocale(getLocaleFromStorage());

    const handleLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: SupportedLocale }>;
      setLocale(customEvent.detail.locale);
    };

    window.addEventListener("localeChange", handleLocaleChange);

    return () => {
      window.removeEventListener("localeChange", handleLocaleChange);
    };
  }, []);

  const titleText = isLoading ? "Recent Watches" : t("title");
  const viewAllText = isLoading ? "View all films" : t("viewAll");

  // Get the 3 most recently watched films/shows (sorted by dateWatched descending)
  const latestFilms = [...films]
    .sort(
      (a, b) =>
        new Date(b.dateWatched).getTime() - new Date(a.dateWatched).getTime(),
    )
    .slice(0, 3);

  if (films.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{titleText}</h2>
          <Link href="/films" className={styles.viewAllLink}>
            {viewAllText}
            <svg
              className={styles.arrowIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={styles.filmsGrid}>
          {latestFilms.map((film, index) => {
            const overall = computeOverallRating(film.ratings);

            return (
              <div key={`${film.title}-${index}`} className={styles.filmCard}>
                {film.coverImage && (
                  <div className={styles.coverWrapper}>
                    <Image
                      src={film.coverImage}
                      alt={film.title}
                      fill
                      className={styles.coverImage}
                      sizes="(max-width: 480px) 60px, 80px"
                    />
                    {film.favorite && (
                      <span className={styles.favoriteBadge}>★</span>
                    )}
                    <span className={styles.mediaTypeBadge}>
                      {film.mediaType === "tv" ? "TV" : "FILM"}
                    </span>
                  </div>
                )}
                <div className={styles.filmContent}>
                  <h3 className={styles.filmTitle}>{film.title}</h3>
                  <p className={styles.filmDirector}>{film.director}</p>
                  <OverallRatingBadge rating={overall} />
                  <span className={styles.yearWatched}>
                    {film.yearReleased ?? ""}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LatestFilms;
