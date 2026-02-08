"use client";
import styles from "./bookshelf.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import Image from "next/image";
import { books, getStats, type Genre } from "./booksData";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      ))}
    </div>
  );
}

type SortMode = "rating" | "date";

function Bookshelf() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("BookshelfPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [filter, setFilter] = useState<string>("all");
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
  const titleText = isLoading ? "Bookshelf" : t("title");
  const subtitleText = isLoading
    ? "Books that have shaped my thinking"
    : t("subtitle");
  const noBooksText = isLoading ? "No books yet." : t("noBooks");
  const allText = isLoading ? "All" : t("all");
  const favoritesText = isLoading ? "Favorites" : t("favorites");
  const readInText = isLoading ? "Read in" : t("readIn");
  const publishedText = isLoading ? "Published" : t("published");
  const viewBookText = isLoading ? "View Book →" : t("viewBook");
  const bookText = isLoading ? "book" : t("book");
  const booksTextPlural = isLoading ? "books" : t("books");
  const sortByRatingText = isLoading ? "By Rating" : t("sortByRating");
  const sortByDateText = isLoading ? "By Date" : t("sortByDate");
  const totalReadText = isLoading ? "Read" : t("statRead");
  const avgRatingText = isLoading ? "Avg Rating" : t("statAvgRating");
  const bestRatedText = isLoading ? "Best Rated" : t("statBestRated");
  const worstRatedText = isLoading ? "Worst Rated" : t("statWorstRated");

  const getGenreTranslation = (genreKey: Genre): string => {
    if (isLoading) return genreKey;
    return t(`genre${genreKey}`);
  };

  const uniqueGenres = [
    ...new Set(books.map((book) => book.genreKey).filter(Boolean)),
  ] as Genre[];

  const filteredBooks = books.filter((book) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const notes = book.notesKey ? t(book.notesKey) : "";
      const matchesSearch =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        (book.genreKey && book.genreKey.toLowerCase().includes(q)) ||
        notes.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }
    if (filter === "all") return true;
    if (filter === "favorites") return book.favorite;
    return book.genreKey === filter;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
    return b.yearRead - a.yearRead;
  });

  const stats = getStats(books);

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
            placeholder={isLoading ? "Search books..." : t("searchPlaceholder")}
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
            <span className={styles.statLabel}>{totalReadText}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>
              {stats.average}
              <span className={styles.statOutOf}>/5</span>
            </span>
            <span className={styles.statLabel}>{avgRatingText}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueSmall}>
              {stats.best?.title ?? "—"}
            </span>
            <span className={styles.statLabel}>
              {bestRatedText}{" "}
              {stats.best && (
                <span className={styles.statRatingInline}>
                  {stats.best.rating}
                </span>
              )}
            </span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValueSmall}>
              {stats.worst?.title ?? "—"}
            </span>
            <span className={styles.statLabel}>
              {worstRatedText}{" "}
              {stats.worst && (
                <span className={styles.statRatingInline}>
                  {stats.worst.rating}
                </span>
              )}
            </span>
          </div>
        </div>

        <div className={styles.controls}>
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

        <div className={styles.bookCount}>
          {sortedBooks.length}{" "}
          {sortedBooks.length === 1 ? bookText : booksTextPlural}
        </div>

        {sortedBooks.length > 0 ? (
          <div className={styles.bookList}>
            {sortedBooks.map((book, index) => (
              <div key={`${book.title}-${index}`} className={styles.bookCard}>
                {book.coverImage && (
                  <div className={styles.coverWrapper}>
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      className={styles.coverImage}
                      sizes="(max-width: 480px) 80px, 120px"
                    />
                    {book.favorite && (
                      <span className={styles.favoriteBadge}>★</span>
                    )}
                  </div>
                )}
                <div className={styles.bookContent}>
                  <div className={styles.bookHeader}>
                    <h2 className={styles.bookTitle}>{book.title}</h2>
                    {book.rating && <StarRating rating={book.rating} />}
                  </div>
                  <p className={styles.bookAuthor}>{book.author}</p>
                  {book.authorBioKey && (
                    <p className={styles.authorBio}>{t(book.authorBioKey)}</p>
                  )}
                  <div className={styles.bookMeta}>
                    {book.genreKey && (
                      <span className={styles.genre}>
                        {getGenreTranslation(book.genreKey)}
                      </span>
                    )}
                    <span className={styles.yearRead}>
                      {readInText} {book.yearRead}
                    </span>
                    {book.yearPublished && (
                      <span className={styles.yearPublished}>
                        {publishedText} {book.yearPublished}
                      </span>
                    )}
                  </div>
                  {book.notesKey && (
                    <p className={styles.bookNotes}>{t(book.notesKey)}</p>
                  )}
                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.bookLink}
                    >
                      {viewBookText}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noBooks}>{noBooksText}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Bookshelf;
