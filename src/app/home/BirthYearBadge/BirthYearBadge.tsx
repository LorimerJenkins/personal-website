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
  // Calculate position at the last section of the timeline
  // timelineLength - 1 gives us the index of the last section, then add 0.5 to center it
  const topPosition = heroHeight + (timelineLength - 0.5) * heightPerSection;

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
