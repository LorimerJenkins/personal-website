"use client";
import styles from "./blog-post.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogPosts } from "../data/blogPosts";
import { getLocaleFromStorage } from "@/utils/translations";
import { useState, useEffect } from "react";

interface BlogPostProps {
  slug: string;
}

function BlogPost({ slug }: BlogPostProps) {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Blogs");
  const [locale, setLocale] = useState<string>("en");

  useEffect(() => {
    setLocale(getLocaleFromStorage());
  }, []);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p>Blog post not found</p>
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

  const translation =
    post.translations[locale as keyof typeof post.translations] ||
    post.translations.en;

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <Link href="/blogs" className={styles.backLink}>
          ← {t("backToBlogs")}
        </Link>
        <article className={styles.article}>
          <h1 className={styles.title}>{translation.title}</h1>
          <p className={styles.date}>{post.date}</p>
          <div className={styles.content}>
            <p style={{ whiteSpace: "pre-line" }}>{translation.content}</p>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}

export default BlogPost;
