"use client";
import styles from "./writing.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogs } from "./Blogs";
import { fetchAllBlogPosts, type LoadedBlog } from "./BlogLoader";
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
  const [loadedBlogs, setLoadedBlogs] = useState<LoadedBlog[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);

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
    setBlogsLoading(true);
    const slugs = blogs.map((b) => b.slug);
    fetchAllBlogPosts(slugs, locale).then((results) => {
      setLoadedBlogs(results);
      setBlogsLoading(false);
    });
  }, [locale]);

  const loadingText = isLoading ? "Loading..." : t("loading");
  const titleText = isLoading ? "Writing" : t("title");
  const subtitleText = isLoading ? "My thoughts and essays" : t("subtitle");

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

        <div className={styles.blogList}>
          {blogsLoading ? (
            <p style={{ margin: 0 }}>{loadingText}</p>
          ) : (
            loadedBlogs.map((blog) => (
              <Link
                href={"/writing/" + blog.slug}
                key={blog.slug}
                className={styles.blogCard}
              >
                <h2 className={styles.blogTitle}>{blog.data.title}</h2>
                <p className={styles.blogExcerpt}>{blog.data.excerpt}</p>
                <span className={styles.blogDate}>{blog.data.date}</span>
              </Link>
            ))
          )}
        </div>
      </div>

      <SubstackSignup />
      <Footer />
    </div>
  );
}

export default Writing;
