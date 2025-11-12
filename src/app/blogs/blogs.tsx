"use client";
import styles from "./blogs.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogPosts } from "./data/blogPosts";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";

function Blogs() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Blogs");
  const [locale, setLocale] = useState<SupportedLocale>("en");

  useEffect(() => {
    // Set initial locale
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

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <h1 className={styles.pageTitle}>{t("pageTitle")}</h1>
        <a
          className={styles.subStack}
          href="https://lorimer.substack.com/subscribe"
          target="_blank"
        >
          Sign up to receive new blog posts by email.
        </a>
        <div className={styles.blogList}>
          {blogPosts.map((post) => {
            const translation =
              post.translations[locale] || post.translations.en;

            return (
              <Link
                href={`/blogs/${post.slug}`}
                key={post.id}
                className={styles.blogCard}
              >
                <h2 className={styles.blogTitle}>{translation.title}</h2>
                <p className={styles.blogExcerpt}>{translation.excerpt}</p>
                <span className={styles.blogDate}>{translation.date}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blogs;
