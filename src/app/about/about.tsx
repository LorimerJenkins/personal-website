"use client";
import styles from "./about.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";

function About() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("About");

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
        <p className={styles.title}>{t("title1")}</p>
        <p>{t("paragraph1")}</p>
        <p className={styles.title}>{t("title2")}</p>
        <p style={{ whiteSpace: "pre-line" }}>{t("paragraph2")}</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
