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
  const [selectedFilm, setSelectedFilm] = useState<number | null>(null);

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

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFilm(null);
    };
    if (selectedFilm !== null) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedFilm]);

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

  const activeFilm = selectedFilm !== null ? sortedFilms[selectedFilm] : null;

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
          <div className={styles.filmGrid}>
            {sortedFilms.map((film, index) => {
              const overall = computeOverallRating(film.ratings);

              return (
                <button
                  key={`${film.title}-${index}`}
                  className={styles.filmTile}
                  onClick={() => setSelectedFilm(index)}
                  aria-label={`${film.title} directed by ${film.director}`}
                >
                  <div className={styles.tileCoverWrapper}>
                    {film.coverImage ? (
                      <Image
                        src={film.coverImage}
                        alt={film.title}
                        fill
                        className={styles.tileCoverImage}
                        sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, 150px"
                      />
                    ) : (
                      <div className={styles.tilePlaceholder}>
                        <span className={styles.tilePlaceholderText}>
                          {film.title}
                        </span>
                      </div>
                    )}
                    {film.favorite && (
                      <span className={styles.tileFavoriteBadge}>★</span>
                    )}
                    <span className={styles.tileMediaBadge}>
                      {film.mediaType === "tv" ? "TV" : "FILM"}
                    </span>
                    <span
                      className={`${styles.tileRatingBadge} ${overall >= 8 ? styles.tileRatingHigh : overall >= 5 ? styles.tileRatingMid : styles.tileRatingLow}`}
                    >
                      {overall}
                    </span>
                  </div>
                  <span className={styles.tileTitle}>{film.title}</span>
                  <span className={styles.tileDirector}>{film.director}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p className={styles.noFilms}>{noFilmsText}</p>
        )}
      </div>

      {/* Modal */}
      {activeFilm && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedFilm(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setSelectedFilm(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className={styles.modalBody}>
              {activeFilm.coverImage && (
                <div className={styles.modalCoverWrapper}>
                  <Image
                    src={activeFilm.coverImage}
                    alt={activeFilm.title}
                    fill
                    className={styles.modalCoverImage}
                    sizes="200px"
                  />
                  {activeFilm.favorite && (
                    <span className={styles.favoriteBadge}>★</span>
                  )}
                  <span className={styles.mediaTypeBadge}>
                    {activeFilm.mediaType === "tv" ? "TV" : "FILM"}
                  </span>
                </div>
              )}
              <div className={styles.modalDetails}>
                <h2 className={styles.filmTitle}>{activeFilm.title}</h2>
                <OverallRatingBadge
                  rating={computeOverallRating(activeFilm.ratings)}
                />
                <p className={styles.filmDirector}>{activeFilm.director}</p>
                <p className={styles.filmDescription}>
                  {t(activeFilm.descriptionKey)}
                </p>
                <div className={styles.filmMeta}>
                  {activeFilm.genreKey && (
                    <span className={styles.genre}>
                      {getGenreTranslation(activeFilm.genreKey)}
                    </span>
                  )}
                  {activeFilm.mediaType === "tv" && activeFilm.seasons && (
                    <span className={styles.seasonsBadge}>
                      {activeFilm.seasons}{" "}
                      {activeFilm.seasons === 1 ? seasonText : seasonsText}
                    </span>
                  )}
                  {activeFilm.yearReleased && (
                    <span className={styles.yearReleased}>
                      {releasedText} {activeFilm.yearReleased}
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
                        ★ {activeFilm.ratings[category]}
                      </span>
                    </div>
                  ))}
                </div>

                {activeFilm.reviewKey && t(activeFilm.reviewKey) && (
                  <p className={styles.filmReview}>{t(activeFilm.reviewKey)}</p>
                )}

                {activeFilm.link && (
                  <a
                    href={activeFilm.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.filmLink}
                  >
                    {viewFilmText}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Films;
