"use client";
import styles from "./writing.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogPosts } from "./blogPosts";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import SubstackSignup from "@/components/SubstackSignup/SubstackSignup";

function Writing() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("WritingPage");
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

  const loadingText = isLoading ? "Loading..." : t("loading");
  const titleText = isLoading ? "Writing" : t("title");

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
        <h1 className={styles.title}>{titleText}</h1>

        <div className={styles.blogList}>
          {blogPosts.map((post) => {
            const translation =
              post.translations[locale] || post.translations.en;

            return (
              <Link
                href={"/writing/" + post.slug}
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

      <SubstackSignup />
      <Footer />
    </div>
  );
}

export default Writing;
