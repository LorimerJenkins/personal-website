"use client";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TimelineWavyLine from "./TimelineWavyLine/TimelineWavyLine";
import TimelineContent from "./TimelineContent/TimelineContent";
import { timelineData } from "./timelineData";
import Feed from "./Feed/feed";
import News from "./News/News";

const heightPerSection = 800;
const heroHeight = 600;
const totalHeight = heroHeight + timelineData.length * heightPerSection;

function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Fix for scroll not working - ensure body/html can scroll
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
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
        {/* Only render wavy line on desktop */}
        {mounted && !isMobile && <TimelineWavyLine {...wavyLineProps} />}
        <TimelineContent {...contentProps} />
      </div>

      {/* News section */}
      <News />

      {/* Social Media Feeds Section */}
      <Feed />

      <Footer />
    </div>
  );
}

export default Home;
