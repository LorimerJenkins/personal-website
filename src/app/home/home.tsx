"use client";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TimelineWavyLine from "./TimelineWavyLine/TimelineWavyLine";
import TimelineContent from "./TimelineContent/TimelineContent";
import { timelineData } from "./timelineData";

const heightPerSection = 800;
const heroHeight = 600;
const totalHeight = heroHeight + timelineData.length * heightPerSection;

function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wavyLineProps = {
    totalHeight,
    heightPerSection,
    heroHeight,
    yearsCount: timelineData.length,
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
