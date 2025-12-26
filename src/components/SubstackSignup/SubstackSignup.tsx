"use client";
import styles from "./SubstackSignup.module.css";
import { useTranslation } from "@/hooks/useTranslation";

function SubstackSignup() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("SubstackSignup");

  const titleText = isLoading ? "Stay Updated" : t("title");
  const descriptionText = isLoading
    ? "Join my newsletter to get new blog posts delivered straight to your inbox. I write about startups, crypto, building in public and lessons learned from my journey as a founder."
    : t("description");

  return (
    <section className={styles.signupSection}>
      <div className={styles.signupContainer}>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{titleText}</h3>
          <p className={styles.description}>{descriptionText}</p>
        </div>
        <div className={styles.embedWrapper}>
          <iframe
            src="https://lorimer.substack.com/embed"
            width="100%"
            height="150"
            frameBorder="0"
            scrolling="no"
            className={styles.substackEmbed}
          />
        </div>
      </div>
    </section>
  );
}

export default SubstackSignup;
