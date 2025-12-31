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
import Podcast from "./Podcast/Podcast";
import SubstackSignup from "../../components/SubstackSignup/SubstackSignup";
import LatestWritings from "@/components/LatestWritings/LatestWritings";
import WorkingOn from "./WorkingOn/WorkingOn";

const heightPerSection = 800;

function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

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

  const handleExpandTimeline = () => {
    setIsTimelineExpanded(true);
  };

  const wavyLineProps = {
    heightPerSection,
    yearsCount: timelineData.length,
    timelineData,
    isExpanded: isTimelineExpanded,
  };

  const contentProps = {
    timelineData,
    heightPerSection,
    isExpanded: isTimelineExpanded,
    onExpand: handleExpandTimeline,
  };

  return (
    <div className={styles.page}>
      <Header />

      <Landing />
      <About />
      <WorkingOn projectId="liquidops" />
      <Podcast />

      <div className={styles.timelineContainer}>
        {/* Only render wavy line on desktop */}
        {mounted && !isMobile && <TimelineWavyLine {...wavyLineProps} />}
        <TimelineContent {...contentProps} />
      </div>

      <News />
      <LatestWritings />

      <Feed />
      <SubstackSignup />

      <Footer />
    </div>
  );
}

export default Home;
