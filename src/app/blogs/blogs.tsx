"use client";
import styles from "./blogs.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";

function About() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Blogs");

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>here</div>
      <Footer />
    </div>
  );
}

export default About;
