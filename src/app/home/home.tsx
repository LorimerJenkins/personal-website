"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./home.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TimelineWavyLine from "./TimelineWavyLine/TimelineWavyLine";
import TimelineContent from "./TimelineContent/TimelineContent";
import { timelineData } from "./timelineData";

function Home() {
  const [mounted, setMounted] = useState(false);
  const [scrollState, setScrollState] = useState({
    targetY: 0,
    indicatorProgress: 0,
    currentYearIndex: 0,
  });

  const rafRef = useRef<number | null>(null);

  const heightPerSection = 800;
  const heroHeight = 600;
  const totalHeight = heroHeight + timelineData.length * heightPerSection;

  // Optimized scroll handler with requestAnimationFrame
  const updateScrollState = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const targetY = scrollY + viewportHeight * 0.5;

    // Clamp targetY to start from hero area and end at the total height
    const clampedTargetY = Math.min(
      Math.max(targetY, heroHeight * 0.75),
      totalHeight,
    );

    const indicatorProgress = Math.min(
      Math.max(clampedTargetY / totalHeight, 0),
      1,
    );

    const currentYearIndex = Math.floor(
      indicatorProgress * timelineData.length,
    );

    setScrollState({
      targetY: clampedTargetY,
      indicatorProgress,
      currentYearIndex: Math.min(currentYearIndex, timelineData.length - 1),
    });
  }, [totalHeight, heroHeight]);

  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Schedule update on next animation frame for smooth 60fps updates
    rafRef.current = requestAnimationFrame(() => {
      updateScrollState();
    });
  }, [updateScrollState]);

  useEffect(() => {
    setMounted(true);

    // Initial calculation
    updateScrollState();

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, updateScrollState]);

  const currentData = timelineData[scrollState.currentYearIndex];

  // Props for TimelineWavyLine
  const wavyLineProps = {
    totalHeight,
    targetY: scrollState.targetY,
    heightPerSection,
    heroHeight,
    yearsCount: timelineData.length,
    currentMilestone: currentData.milestone,
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
