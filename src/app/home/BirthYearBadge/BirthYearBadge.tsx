"use client";
import styles from "./BirthYearBadge.module.css";

interface BirthYearBadgeProps {
  heroHeight: number;
  heightPerSection: number;
  timelineLength: number;
}

function BirthYearBadge({
  heroHeight,
  heightPerSection,
  timelineLength,
}: BirthYearBadgeProps) {
  // Calculate position at end of timeline
  const topPosition = heroHeight + (timelineLength - 2) * heightPerSection + 50;

  return (
    <div className={styles.container} style={{ top: `${topPosition}px` }}>
      <div className={styles.badge}>
        <div className={styles.emoji}>🎂</div>
        <div className={styles.text}>Born 30th July 2003</div>
      </div>
    </div>
  );
}

export default BirthYearBadge;
