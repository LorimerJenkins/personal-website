"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./home.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TimelineWavyLine from "./TimelineWavyLine/TimelineWavyLine";
import TimelineContent from "./TimelineContent/TimelineContent";
import { timelineData } from "./timelineData";

const heightPerSection = 800;
const heroHeight = 600;
const totalHeight = heroHeight + timelineData.length * heightPerSection;

// Calculate initial values immediately (not in useEffect)
function getInitialScrollState() {
  if (typeof window === "undefined") {
    return {
      targetY: heroHeight + heightPerSection * 0.5,
      currentYearIndex: 0,
    };
  }

  const viewportHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const targetY = scrollY + viewportHeight * 0.5;
  const clampedTargetY = Math.min(
    Math.max(targetY, heroHeight + heightPerSection * 0.5),
    totalHeight,
  );
  const indicatorProgress = Math.min(
    Math.max(clampedTargetY / totalHeight, 0),
    1,
  );
  const currentYearIndex = Math.min(
    Math.floor(indicatorProgress * timelineData.length),
    timelineData.length - 1,
  );

  return { targetY: clampedTargetY, currentYearIndex };
}

function Home() {
  const [mounted, setMounted] = useState(false);
  const [targetY, setTargetY] = useState(() => getInitialScrollState().targetY);
  const [currentYearIndex, setCurrentYearIndex] = useState(
    () => getInitialScrollState().currentYearIndex,
  );

  const rafRef = useRef<number | null>(null);

  const updateScrollState = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const newTargetY = scrollY + viewportHeight * 0.5;

    // Clamp targetY to start from first section and end at total height
    const clampedTargetY = Math.min(
      Math.max(newTargetY, heroHeight + heightPerSection * 0.5),
      totalHeight,
    );

    const indicatorProgress = Math.min(
      Math.max(clampedTargetY / totalHeight, 0),
      1,
    );

    const newYearIndex = Math.min(
      Math.floor(indicatorProgress * timelineData.length),
      timelineData.length - 1,
    );

    setTargetY(clampedTargetY);
    setCurrentYearIndex(newYearIndex);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    // Immediately calculate on mount
    updateScrollState();
    setMounted(true);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, updateScrollState]);

  const currentData = timelineData[currentYearIndex];

  const wavyLineProps = {
    totalHeight,
    targetY,
    heightPerSection,
    heroHeight,
    yearsCount: timelineData.length,
    currentMilestone: currentData.milestone,
    timelineData,
  };

  const contentProps = {
    timelineData,
    heightPerSection,
    heroHeight,
  };

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.timelineContainer}>
        {mounted && <TimelineWavyLine {...wavyLineProps} />}
        <TimelineContent {...contentProps} />
      </div>

      <Footer />
    </div>
  );
}

export default Home;
