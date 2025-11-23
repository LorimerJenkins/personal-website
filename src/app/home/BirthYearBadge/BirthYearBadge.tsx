"use client";
import styles from "./BirthYearBadge.module.css";

function BirthYearBadge() {
  return (
    <div className={styles.container}>
      <div className={styles.badge}>
        <div className={styles.emoji}>🎂</div>
        <div className={styles.text}>Born 30th July 2003</div>
      </div>
    </div>
  );
}

export default BirthYearBadge;
