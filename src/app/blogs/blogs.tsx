"use client";
import styles from "./blogs.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { blogPosts } from "./data/blogPosts";

function Blogs() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Blogs");

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
        <div className={styles.blogList}>
          {blogPosts.map((post) => (
            <Link
              href={`/blogs/${post.slug}`}
              key={post.id}
              className={styles.blogCard}
            >
              <h2 className={styles.blogTitle}>{post.title}</h2>
              <p className={styles.blogExcerpt}>{post.excerpt}</p>
              <span className={styles.blogDate}>{post.date}</span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blogs;
