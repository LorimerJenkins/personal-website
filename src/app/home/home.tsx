"use client";
import { useEffect, useState, useRef } from "react";
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
import LatestInvestments from "./LatestInvestments/LatestInvestments";
import LatestBooks from "./LatestBooks/LatestBooks";
import TravelStats from "./TravelStats/TravelStats";
import FAQ from "./Faq/Faq";
import LatestFilms from "./LatestFilms/LatestFilms";
import LatestChess from "./LatestChess/LatestChess";

const heightPerSection = 800;

function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const hasScrolled = useRef(false);

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

  // Handle hash navigation
  useEffect(() => {
    if (!mounted || hasScrolled.current) return;

    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
          hasScrolled.current = true;
        }
      }
    };

    scrollToHash();

    const handleHashChange = () => {
      hasScrolled.current = false;
      scrollToHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [mounted]);

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
      <WorkingOn projectId="astro" />
      <Podcast />

      <div className={styles.timelineContainer}>
        {/* Only render wavy line on desktop */}
        {mounted && !isMobile && <TimelineWavyLine {...wavyLineProps} />}
        <TimelineContent {...contentProps} />
      </div>

      <News />

      <LatestWritings />

      <SubstackSignup />

      <LatestInvestments />
      <LatestBooks />
      <TravelStats />
      <LatestFilms />
      <LatestChess />

      <Feed />
      <FAQ />

      <Footer />
    </div>
  );
}

export default Home;
