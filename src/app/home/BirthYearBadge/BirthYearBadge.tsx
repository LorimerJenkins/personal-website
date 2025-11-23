"use client";
import styles from "./BirthYearBadge.module.css";
import { useTranslation } from "@/hooks/useTranslation";

function BirthYearBadge() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("BirthYearBadge");

  const bornText = isLoading ? "Born 30th July 2003" : t("born");

  return (
    <div className={styles.container}>
      <div className={styles.badge}>
        <div className={styles.emoji}>🎂</div>
        <div className={styles.text}>{bornText}</div>
      </div>
    </div>
  );
}

export default BirthYearBadge;
