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
import { books, type Genre } from "./booksData";

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

function Bookshelf() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("BookshelfPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [filter, setFilter] = useState<string>("all");

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
  const booksText = isLoading ? "books" : t("books");

  // Get translated genre name
  const getGenreTranslation = (genreKey: Genre): string => {
    if (isLoading) return genreKey;
    return t(`genre${genreKey}`);
  };

  // Get unique genres for filtering
  const uniqueGenres = [
    ...new Set(books.map((book) => book.genreKey).filter(Boolean)),
  ] as Genre[];

  // Filter books
  const filteredBooks = books.filter((book) => {
    if (filter === "all") return true;
    if (filter === "favorites") return book.favorite;
    return book.genreKey === filter;
  });

  // Sort by year read (most recent first)
  const sortedBooks = [...filteredBooks].sort(
    (a, b) => b.yearRead - a.yearRead,
  );

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

        <div className={styles.bookCount}>
          {sortedBooks.length} {sortedBooks.length === 1 ? bookText : booksText}
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
