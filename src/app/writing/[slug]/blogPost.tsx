"use client";
import styles from "./blog-post.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogPosts } from "../blogPosts";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import SubstackSignup from "@/components/SubstackSignup/SubstackSignup";

interface BlogPostProps {
  slug: string;
}

function BlogPost({ slug }: BlogPostProps) {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Writing");
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

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p>Post not found</p>
        </div>
        <Footer />
      </div>
    );
  }

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

  const translation = post.translations[locale] || post.translations.en;

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <Link href="/writing" className={styles.backLink}>
          ← {t("backToBlogs")}
        </Link>
        <article className={styles.article}>
          <h1 className={styles.title}>{translation.title}</h1>
          <p className={styles.date}>{translation.date}</p>
          <div className={styles.content}>
            <p style={{ whiteSpace: "pre-line" }}>{translation.content}</p>
          </div>
        </article>
      </div>
      <SubstackSignup />
      <Footer />
    </div>
  );
}

export default BlogPost;
