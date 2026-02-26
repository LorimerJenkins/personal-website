"use client";
import styles from "./LatestWritings.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogs } from "@/app/writing/Blogs";
import { fetchAllBlogPosts, type LoadedBlog } from "@/app/writing/BlogLoader";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";

function LatestWritings() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("LatestWritings");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [loadedPosts, setLoadedPosts] = useState<LoadedBlog[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

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

  useEffect(() => {
    setPostsLoading(true);
    const slugs = blogs.slice(0, 3).map((b) => b.slug);
    fetchAllBlogPosts(slugs, locale).then((results) => {
      setLoadedPosts(results);
      setPostsLoading(false);
    });
  }, [locale]);

  const titleText = isLoading ? "Latest Writing" : t("title");
  const viewAllText = isLoading ? "View all posts" : t("viewAll");

  if (postsLoading || loadedPosts.length === 0) {
    return null;
  }

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
          {loadedPosts.map((blog) => (
            <Link
              href={`/writing/${blog.slug}`}
              key={blog.slug}
              className={styles.postCard}
            >
              <h3 className={styles.postTitle}>{blog.data.title}</h3>
              <p className={styles.postExcerpt}>{blog.data.excerpt}</p>
              <span className={styles.postDate}>{blog.data.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestWritings;
