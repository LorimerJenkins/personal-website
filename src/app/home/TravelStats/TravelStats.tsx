"use client";
import styles from "./TravelStats.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { VISITED_COUNTRIES } from "@/app/travel/countriesVisited";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useMemo } from "react";

function TravelStats() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("TravelStats");
  const tTravel = tSection("Travel");
  const [locale, setLocale] = useState<SupportedLocale>("en");

  useEffect(() => {
    setLocale(getLocaleFromStorage());

    const handleLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: SupportedLocale }>;
      setLocale(customEvent.detail.locale);
    };

    window.addEventListener("localeChange", handleLocaleChange);

    return () => {
      window.removeEventListener("localeChange", handleLocaleChange);
    };
  }, []);

  const titleText = isLoading ? "Travel" : t("title");
  const viewAllText = isLoading ? "View all countries" : t("viewAll");

  const visitedCountryNames = useMemo(() => {
    return Object.values(VISITED_COUNTRIES).sort();
  }, []);

  const countriesCount = visitedCountryNames.length;
  const worldPercentage = Math.round((countriesCount / 195) * 100);

  // Get 6 most recent or random countries to display
  const displayedCountries = visitedCountryNames.slice(0, 6);

  if (countriesCount === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{titleText}</h2>
          <Link href="/travel" className={styles.viewAllLink}>
            {viewAllText}
            <svg
              className={styles.arrowIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={styles.content}>
          {/* Stats */}
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{countriesCount}</span>
              <span className={styles.statLabel}>{tTravel("countries")}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>{tTravel("continents")}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNumber}>{worldPercentage}%</span>
              <span className={styles.statLabel}>{tTravel("ofWorld")}</span>
            </div>
          </div>

          {/* Country Tags */}
          <div className={styles.countriesGrid}>
            {displayedCountries.map((country) => (
              <div key={country} className={styles.countryTag}>
                <span className={styles.countryCheckmark}>✓</span>
                <span className={styles.countryName}>{country}</span>
              </div>
            ))}
            {countriesCount > 6 && (
              <Link href="/travel" className={styles.moreTag}>
                +{countriesCount - 6} more
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelStats;
