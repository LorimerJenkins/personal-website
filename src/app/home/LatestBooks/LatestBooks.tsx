"use client";
import styles from "./LatestBooks.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { books } from "@/app/bookshelf/booksData";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import Image from "next/image";

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

function LatestBooks() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("LatestBooks");
  const tBookshelf = tSection("BookshelfPage");
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

  const titleText = isLoading ? "Recent Reads" : t("title");
  const viewAllText = isLoading ? "View bookshelf" : t("viewBookshelf");

  // Get the 3 most recently read books (sorted by yearRead descending)
  const latestBooks = [...books]
    .sort((a, b) => b.yearRead - a.yearRead)
    .slice(0, 3);

  if (books.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{titleText}</h2>
          <Link href="/bookshelf" className={styles.viewAllLink}>
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

        <div className={styles.booksGrid}>
          {latestBooks.map((book, index) => (
            <div key={index} className={styles.bookCard}>
              {book.coverImage && (
                <div className={styles.coverWrapper}>
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className={styles.coverImage}
                    sizes="(max-width: 480px) 60px, 80px"
                  />
                  {book.favorite && (
                    <span className={styles.favoriteBadge}>★</span>
                  )}
                </div>
              )}
              <div className={styles.bookContent}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>{book.author}</p>
                {book.rating && <StarRating rating={book.rating} />}
                <span className={styles.yearRead}>
                  {tBookshelf("readIn")} {book.yearRead}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestBooks;
