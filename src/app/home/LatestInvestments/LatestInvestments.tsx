"use client";
import styles from "./LatestInvestments.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { portfolio } from "@/app/angel/investments";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";

function LatestInvestments() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("AngelPage");
  const tLatest = tSection("LatestInvestments");
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

  const titleText = isLoading
    ? "Angel Investments"
    : tLatest("investmentsTitle");
  const viewAllText = isLoading ? "View portfolio" : tLatest("viewPortfolio");

  // Get the 3 most recent investments (portfolio is already in chronological order, so reverse)
  const latestInvestments = [...portfolio].reverse().slice(0, 3);

  if (portfolio.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{titleText}</h2>
          <Link href="/angel" className={styles.viewAllLink}>
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

        <div className={styles.investmentsGrid}>
          {latestInvestments.map((investment, index) => (
            <a
              href={investment.website}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className={styles.investmentCard}
            >
              <div className={styles.cardHeader}>
                <div className={styles.logoContainer}>
                  <img
                    src={investment.logo}
                    alt={investment.name}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.badges}>
                  <span className={styles.categoryTag}>
                    {t(
                      `category${
                        investment.category.charAt(0).toUpperCase() +
                        investment.category.slice(1)
                      }`,
                    )}
                  </span>
                  {investment.acquiredBy && (
                    <span className={styles.acquiredBadge}>Acquired</span>
                  )}
                </div>
              </div>

              <p className={styles.description}>
                {t(investment.descriptionKey)}
              </p>

              <div className={styles.cardFooter}>
                <span className={styles.founders}>
                  {investment.founders.map((f) => f.name).join(" & ")}
                </span>
                <span className={styles.roundYear}>
                  {t(investment.roundKey)} · {t(`month${investment.month}`)}{" "}
                  {investment.year}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestInvestments;
