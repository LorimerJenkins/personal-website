"use client";
import styles from "./blog-post.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { fetchBlogPost, type BlogPostData } from "../BlogLoader";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import SubstackSignup from "@/components/SubstackSignup/SubstackSignup";
import LatestWritings from "@/components/LatestWritings/LatestWritings";

interface BlogPostProps {
  slug: string;
}

function BlogPost({ slug }: BlogPostProps) {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Writing");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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
    setPostLoading(true);
    setNotFound(false);
    fetchBlogPost(slug, locale).then((data) => {
      if (data) {
        setPost(data);
      } else {
        setNotFound(true);
      }
      setPostLoading(false);
    });
  }, [slug, locale]);

  if (isLoading || postLoading) {
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

  if (notFound || !post) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p>Post not found</p>
        </div>
        <LatestWritings />
        <SubstackSignup />
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <Link href="/writing" className={styles.backLink}>
          ← {t("backToBlogs")}
        </Link>
        <article className={styles.article}>
          {post.headerImage && (
            <div className={styles.headerImageWrapper}>
              <img
                src={post.headerImage}
                alt={post.title}
                className={styles.headerImage}
              />
            </div>
          )}
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.date}>{post.date}</p>
          <div className={styles.content}>
            <p style={{ whiteSpace: "pre-line" }}>{post.content}</p>
          </div>
        </article>
      </div>
      <LatestWritings />
      <SubstackSignup />
      <Footer />
    </div>
  );
}

export default BlogPost;
