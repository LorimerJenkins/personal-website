"use client";
import styles from "./LatestWritings.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogPosts } from "@/app/writing/blogPosts";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";

function LatestWritings() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("LatestWritings");
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

  const titleText = isLoading ? "Latest Writing" : t("title");
  const viewAllText = isLoading ? "View all posts" : t("viewAll");
  const readMoreText = isLoading ? "Read more" : t("readMore");

  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{titleText}</h2>
          <Link href="/writing" className={styles.viewAllLink}>
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

        <div className={styles.postsGrid}>
          {latestPosts.map((post) => {
            const translation =
              post.translations[locale] || post.translations.en;

            return (
              <Link
                href={`/writing/${post.slug}`}
                key={post.id}
                className={styles.postCard}
              >
                <span className={styles.postDate}>{translation.date}</span>
                <h3 className={styles.postTitle}>{translation.title}</h3>
                <p className={styles.postExcerpt}>{translation.excerpt}</p>
                <span className={styles.readMore}>
                  {readMoreText}
                  <svg
                    className={styles.readMoreIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default LatestWritings;
