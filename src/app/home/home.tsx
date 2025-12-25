"use client";
import { useEffect, useState } from "react";
import styles from "./home.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TimelineWavyLine from "./TimelineWavyLine/TimelineWavyLine";
import TimelineContent from "./TimelineContent/TimelineContent";
import Landing from "./Landing/Landing";
import { timelineData } from "./timelineData";
import Feed from "./Feed/feed";
import News from "./News/News";
import About from "./About/About";

const heightPerSection = 800;

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
    heightPerSection,
    yearsCount: timelineData.length,
    timelineData,
  };

  const contentProps = {
    timelineData,
    heightPerSection,
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* Landing and About are now outside timelineContainer */}
      <Landing />
      <About />

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
