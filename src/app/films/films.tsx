"use client";
import styles from "./films.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  films,
  ratingCategories,
  computeOverallRating,
  getStats,
  type FilmGenre,
  type FilmRatings,
} from "./filmsData";

function OverallRatingBadge({ rating }: { rating: number }) {
  const getColor = (r: number) => {
    if (r >= 8) return styles.ratingHigh;
    if (r >= 5) return styles.ratingMid;
    return styles.ratingLow;
  };

  return (
    <div className={`${styles.overallBadge} ${getColor(rating)}`}>
      {rating}
      <span className={styles.outOf}>/10</span>
    </div>
  );
}

type SortMode = "rating" | "date";

function Films() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("FilmsPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [filter, setFilter] = useState<string>("all");
  const [mediaFilter, setMediaFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortMode>("rating");
  const [searchQuery, setSearchQuery] = useState<string>("");

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

  const loadingText = isLoading ? "Loading..." : t("loading");
  const titleText = isLoading ? "Films & TV" : t("title");
  const subtitleText = isLoading ? "My film & TV review diary" : t("subtitle");
  const noFilmsText = isLoading ? "No entries yet." : t("noFilms");
  const allText = isLoading ? "All" : t("all");
  const favoritesText = isLoading ? "Favorites" : t("favorites");
  const releasedText = isLoading ? "Released" : t("released");
  const viewFilmText = isLoading ? "View on IMDB →" : t("viewFilm");
  const sortByRatingText = isLoading ? "By Rating" : t("sortByRating");
  const sortByDateText = isLoading ? "By Date" : t("sortByDate");
  const allMediaText = isLoading ? "All" : t("allMedia");
  const filmsOnlyText = isLoading ? "Films" : t("filmsOnly");
  const tvOnlyText = isLoading ? "TV Shows" : t("tvOnly");
  const seasonsText = isLoading ? "seasons" : t("seasons");
  const seasonText = isLoading ? "season" : t("season");
  const totalWatchedText = isLoading ? "Watched" : t("statWatched");
  const avgRatingText = isLoading ? "Avg Rating" : t("statAvgRating");
  const bestRatedText = isLoading ? "Best Rated" : t("statBestRated");
  const worstRatedText = isLoading ? "Worst Rated" : t("statWorstRated");

  const getRatingCategoryLabel = (key: keyof FilmRatings): string => {
    if (isLoading) return key;
    return t(`rating_${key}`);
  };

  const getGenreTranslation = (genreKey: FilmGenre): string => {
    if (isLoading) return genreKey;
    return t(`genre${genreKey}`);
  };

  const uniqueGenres = [
    ...new Set(films.map((film) => film.genreKey).filter(Boolean)),
  ] as FilmGenre[];

  const filteredFilms = films.filter((film) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const desc = film.descriptionKey ? t(film.descriptionKey) : "";
      const matchesSearch =
        film.title.toLowerCase().includes(q) ||
        film.director.toLowerCase().includes(q) ||
        (film.genreKey && film.genreKey.toLowerCase().includes(q)) ||
        desc.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }
    if (mediaFilter === "film" && film.mediaType !== "film") return false;
    if (mediaFilter === "tv" && film.mediaType !== "tv") return false;
    if (filter === "all") return true;
    if (filter === "favorites") return film.favorite;
    return film.genreKey === filter;
  });

  const sortedFilms = [...filteredFilms].sort((a, b) => {
    if (sortBy === "rating")
      return computeOverallRating(b.ratings) - computeOverallRating(a.ratings);
    return (
      new Date(b.dateWatched).getTime() - new Date(a.dateWatched).getTime()
    );
  });

  const stats = getStats(films);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>{loadingText}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <div className={styles.header}>
          <h1 className={styles.title}>{titleText}</h1>
          <p className={styles.subtitle}>{subtitleText}</p>
        </div>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={
              isLoading ? "Search films & shows..." : t("searchPlaceholder")
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className={styles.searchClear}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Stats Banner */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.count}</span>
            <span className={styles.statLabel}>{totalWatchedText}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {stats.average}
              <span className={styles.statOutOf}>/10</span>
            </span>
            <span className={styles.statLabel}>{avgRatingText}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueSmall}>
              {stats.best?.film.title ?? "—"}
            </span>
            <span className={styles.statLabel}>
              {bestRatedText}{" "}
              {stats.best && (
                <span className={styles.statRatingInline}>
                  {stats.best.overall}
                </span>
              )}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueSmall}>
              {stats.worst?.film.title ?? "—"}
            </span>
            <span className={styles.statLabel}>
              {worstRatedText}{" "}
              {stats.worst && (
                <span className={styles.statRatingInline}>
                  {stats.worst.overall}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className={styles.controls}>
          {/* Segmented media toggle */}
          <div className={styles.segmentedToggle}>
            <button
              className={`${styles.segmentButton} ${mediaFilter === "all" ? styles.segmentActive : ""}`}
              onClick={() => setMediaFilter("all")}
            >
              {allMediaText}
            </button>
            <button
              className={`${styles.segmentButton} ${mediaFilter === "film" ? styles.segmentActive : ""}`}
              onClick={() => setMediaFilter("film")}
            >
              🎬 {filmsOnlyText}
            </button>
            <button
              className={`${styles.segmentButton} ${mediaFilter === "tv" ? styles.segmentActive : ""}`}
              onClick={() => setMediaFilter("tv")}
            >
              📺 {tvOnlyText}
            </button>
          </div>

          <div className={styles.filters}>
            <button
              className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
              onClick={() => setFilter("all")}
            >
              {allText}
            </button>
            <button
              className={`${styles.filterButton} ${filter === "favorites" ? styles.active : ""}`}
              onClick={() => setFilter("favorites")}
            >
              {favoritesText}
            </button>
            {uniqueGenres.map((genreKey) => (
              <button
                key={genreKey}
                className={`${styles.filterButton} ${filter === genreKey ? styles.active : ""}`}
                onClick={() => setFilter(genreKey)}
              >
                {getGenreTranslation(genreKey)}
              </button>
            ))}
          </div>

          <div className={styles.sortButtons}>
            <button
              className={`${styles.sortButton} ${sortBy === "rating" ? styles.sortActive : ""}`}
              onClick={() => setSortBy("rating")}
            >
              {sortByRatingText}
            </button>
            <button
              className={`${styles.sortButton} ${sortBy === "date" ? styles.sortActive : ""}`}
              onClick={() => setSortBy("date")}
            >
              {sortByDateText}
            </button>
          </div>
        </div>

        {sortedFilms.length > 0 ? (
          <div className={styles.filmList}>
            {sortedFilms.map((film, index) => {
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
                        sizes="(max-width: 480px) 80px, 120px"
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
                    <div className={styles.filmTitleRow}>
                      <h2 className={styles.filmTitle}>{film.title}</h2>
                      <OverallRatingBadge rating={overall} />
                    </div>
                    <p className={styles.filmDirector}>{film.director}</p>
                    <p className={styles.filmDescription}>
                      {t(film.descriptionKey)}
                    </p>
                    <div className={styles.filmMeta}>
                      {film.genreKey && (
                        <span className={styles.genre}>
                          {getGenreTranslation(film.genreKey)}
                        </span>
                      )}
                      {film.mediaType === "tv" && film.seasons && (
                        <span className={styles.seasonsBadge}>
                          {film.seasons}{" "}
                          {film.seasons === 1 ? seasonText : seasonsText}
                        </span>
                      )}
                      {film.yearReleased && (
                        <span className={styles.yearReleased}>
                          {releasedText} {film.yearReleased}
                        </span>
                      )}
                    </div>

                    <div className={styles.ratingsGrid}>
                      {ratingCategories.map((category) => (
                        <div key={category} className={styles.ratingChip}>
                          <span className={styles.ratingChipLabel}>
                            {getRatingCategoryLabel(category)}
                          </span>
                          <span className={styles.ratingChipValue}>
                            ★ {film.ratings[category]}
                          </span>
                        </div>
                      ))}
                    </div>

                    {film.reviewKey && t(film.reviewKey) && (
                      <p className={styles.filmReview}>{t(film.reviewKey)}</p>
                    )}

                    {film.link && (
                      <a
                        href={film.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.filmLink}
                      >
                        {viewFilmText}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.noFilms}>{noFilmsText}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Films;
