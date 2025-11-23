"use client";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TimelineWavyLine from "./TimelineWavyLine/TimelineWavyLine";
import TimelineContent from "./TimelineContent/TimelineContent";
import BirthYearBadge from "./BirthYearBadge/BirthYearBadge";
import { timelineData } from "./timelineData";

function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(Math.max(scrolled / documentHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heightPerSection = 800;
  const heroHeight = 600;

  // Total height: hero + 2025 section + regular sections (2024 down to last) + space for badge
  // We render 2025 twice (as hero + as first timeline section)
  const totalHeight =
    heroHeight + (timelineData.length - 1) * heightPerSection + 150;

  // Calculate indicator position - only on client
  const viewportHeight = mounted ? window.innerHeight : 800;
  const scrollY = mounted ? window.scrollY : 0;
  const targetY = scrollY + viewportHeight * 0.5;

  // Clamp targetY to start from hero area
  const clampedTargetY = Math.max(targetY, heroHeight * 0.75);

  const indicatorProgress = Math.min(
    Math.max(clampedTargetY / totalHeight, 0),
    1,
  );

  const currentYearIndex = Math.floor(indicatorProgress * timelineData.length);
  const currentData =
    timelineData[Math.min(currentYearIndex, timelineData.length - 1)];

  // Props for TimelineWavyLine
  const wavyLineProps = {
    totalHeight,
    targetY: clampedTargetY,
    heightPerSection,
    heroHeight,
    yearsCount: timelineData.length,
    currentEmoji: currentData.milestone,
    timelineData,
  };

  // Props for TimelineContent
  const contentProps = {
    timelineData,
    heightPerSection,
    heroHeight,
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.timelineContainer}>
        {/* Only render interactive components after mounting */}
        {mounted && (
          <>
            {/* Wavy line with indicator at the end */}
            <TimelineWavyLine {...wavyLineProps} />

            {/* Birth year badge positioned at end */}
            <BirthYearBadge
              heroHeight={heroHeight}
              heightPerSection={heightPerSection}
              timelineLength={timelineData.length}
            />
          </>
        )}

        {/* Content sections - always render for SEO */}
        <TimelineContent {...contentProps} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
