"use client";
import styles from "./angel.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useMemo } from "react";
import { parseLinks } from "@/utils/parseLinks";
import Link from "next/link";

type Category = "all" | "predictionMarket" | "ventureStudio" | "stablecoins";

interface Investment {
  name: string;
  website: string;
  year: number;
  month: number;
  roundKey: string;
  descriptionKey: string;
  logo: string;
  category: Category;
  founders: { name: string; x: string }[];
  acquired?: boolean;
}

const portfolio: Investment[] = [
  {
    name: "Astro",
    website: "https://www.astrousd.com",
    year: 2024,
    month: 9,
    roundKey: "preSeed",
    descriptionKey: "astroDescription",
    logo: "/images/angelInvestments/astro.svg",
    category: "stablecoins",
    founders: [{ name: "Kadar Sayed Abdi", x: "https://x.com/0xKadar" }],
    acquired: true,
  },
  {
    name: "Upshot",
    website: "https://upshot.cards",
    year: 2025,
    month: 12,
    roundKey: "preSeedExtension",
    descriptionKey: "upshotDescription",
    logo: "/images/angelInvestments/upshot.svg",
    category: "predictionMarket",
    founders: [{ name: "Retrimentum", x: "https://x.com/retrimentum" }],
  },
  // {
  //   name: "Vela Ventures",
  //   website: "https://vela.ventures",
  //   year: 2026,
  //   month: 1,
  //   roundKey: "fundingRound",
  //   descriptionKey: "velaventuresDescription",
  //   logo: "/images/angelInvestments/velaventures.svg",
  //   category: "ventureStudio",
  //   founders: [
  //     { name: "William Kibbler", x: "https://x.com/kibbler_william" },
  //     { name: "Ellis Kilbane", x: "https://x.com/EllisKilbane" },
  //   ],
  // },
];

const categories: { key: Category; labelKey: string }[] = [
  { key: "all", labelKey: "allCategories" },
  { key: "stablecoins", labelKey: "categoryStablecoins" },
  { key: "ventureStudio", labelKey: "categoryVentureStudio" },
  { key: "predictionMarket", labelKey: "categoryPredictionMarket" },
];

// Helper to render markdown-style bold text and links
function renderWithBold(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const textWithLinks = text.replace(linkRegex, (_, linkText, url) => {
    return `%%LINK_START%%${linkText}%%LINK_URL%%${url}%%LINK_END%%`;
  });

  const boldParts = textWithLinks.split(/(\*\*[^*]+\*\*)/g);

  return boldParts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const innerText = part.slice(2, -2);
      return <strong key={i}>{innerText}</strong>;
    }

    if (part.includes("%%LINK_START%%")) {
      const linkParts = part.split(/(%%LINK_START%%.*?%%LINK_END%%)/g);
      return linkParts.map((linkPart, j) => {
        if (linkPart.startsWith("%%LINK_START%%")) {
          const linkMatch = linkPart.match(
            /%%LINK_START%%(.+?)%%LINK_URL%%(.+?)%%LINK_END%%/,
          );
          if (linkMatch) {
            return (
              <a
                key={`${i}-${j}`}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkMatch[1]}
              </a>
            );
          }
        }
        return linkPart;
      });
    }

    return part;
  });
}

function Angel() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("AngelPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

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

  const introAndElevator = t("introAndElevator") as unknown as string[];
  const helpItems = t("helpItems") as unknown as string[];
  const pressureItems = t("pressureItems") as unknown as string[];
  const mistakesItems = t("mistakesItems") as unknown as string[];
  const loadingText = isLoading ? "Loading..." : t("loading");

  // Filter portfolio by category
  const filteredPortfolio = useMemo(() => {
    if (selectedCategory === "all") {
      return [...portfolio].reverse();
    }
    return [...portfolio]
      .filter((investment) => investment.category === selectedCategory)
      .reverse();
  }, [selectedCategory]);

  // Get available categories (only show categories that have investments)
  const availableCategories = useMemo(() => {
    const categoriesWithInvestments = new Set(
      portfolio.map((inv) => inv.category),
    );
    return categories.filter(
      (cat) => cat.key === "all" || categoriesWithInvestments.has(cat.key),
    );
  }, []);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>{t(loadingText)}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        {/* Hero Section - Combined Intro and Elevator Pitch */}
        <section className={styles.intro}>
          <h1 className={styles.title}>{t("title")}</h1>
          <div className={styles.content}>
            {Array.isArray(introAndElevator) &&
              introAndElevator.map((paragraph, index) => (
                <p key={index}>{renderWithBold(paragraph)}</p>
              ))}
          </div>
        </section>

        {/* Portfolio Section */}
        {portfolio.length > 0 && (
          <section className={styles.portfolio}>
            <h2 className={styles.sectionTitle}>{t("portfolioTitle")}</h2>
            <p className={styles.crunchbaseText}>
              {t("crunchbaseText")}{" "}
              <a
                href="https://www.crunchbase.com/person/lorimer-jenkins"
                target="_blank"
              >
                Crunchbase
              </a>
            </p>

            {/* Category Filter */}
            <div className={styles.categoryFilter}>
              {availableCategories.map((category) => (
                <button
                  key={category.key}
                  className={`${styles.categoryButton} ${
                    selectedCategory === category.key
                      ? styles.categoryButtonActive
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(category.key)}
                >
                  {t(category.labelKey)}
                </button>
              ))}
            </div>

            <div className={styles.grid}>
              {filteredPortfolio.length > 0 ? (
                filteredPortfolio.map((investment, index) => (
                  <div key={index} className={styles.card}>
                    <div className={styles.logoContainer}>
                      <img
                        src={investment.logo}
                        alt={investment.name}
                        className={styles.logo}
                      />
                    </div>

                    <div className={styles.tagsRow}>
                      <span className={styles.categoryTag}>
                        {t(
                          `category${
                            investment.category.charAt(0).toUpperCase() +
                            investment.category.slice(1)
                          }`,
                        )}
                      </span>
                      {investment.acquired && (
                        <span className={styles.acquiredBadge}>
                          {t("acquired")}
                        </span>
                      )}
                    </div>

                    <p className={styles.description}>
                      {parseLinks(t(investment.descriptionKey))}
                    </p>

                    <div className={styles.meta}>
                      <span className={styles.founders}>
                        {investment.founders.map((founder, i) => (
                          <span key={i}>
                            {i > 0 && " & "}
                            <a
                              href={founder.x}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {founder.name}
                            </a>
                          </span>
                        ))}
                      </span>
                      <span className={styles.roundYear}>
                        {t(investment.roundKey)} ·{" "}
                        {t(`month${investment.month}`)} {investment.year}
                      </span>
                    </div>

                    <a
                      href={investment.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      {t("seeProject")}
                    </a>
                  </div>
                ))
              ) : (
                <p className={styles.noResults}>
                  No investments in this category yet.
                </p>
              )}
            </div>
          </section>
        )}

        {/* How I Can Help Section */}
        <section className={styles.helpSection}>
          <h2 className={styles.sectionTitle}>{t("helpTitle")}</h2>
          <ul className={styles.bulletList}>
            {Array.isArray(helpItems) &&
              helpItems.map((item, index) => (
                <li key={index}>{renderWithBold(item)}</li>
              ))}
          </ul>
        </section>

        {/* Under Pressure Section */}
        <section className={styles.helpSection}>
          <h2 className={styles.sectionTitle}>{t("pressureTitle")}</h2>
          <ul className={styles.bulletList}>
            {Array.isArray(pressureItems) &&
              pressureItems.map((item, index) => (
                <li key={index}>{renderWithBold(item)}</li>
              ))}
          </ul>
        </section>

        {/* Mistakes Section */}
        <section className={styles.mistakesSection}>
          <h2 className={styles.sectionTitle}>{t("mistakesTitle")}</h2>
          <ul className={styles.bulletList}>
            {Array.isArray(mistakesItems) &&
              mistakesItems.map((item, index) => (
                <li key={index}>{renderWithBold(item)}</li>
              ))}
          </ul>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>{t("ctaTitle")}</h2>
          <p className={styles.ctaText}>{t("ctaText")}</p>
          <a
            href="mailto:hellolorimerjenkins@gmail.com"
            target="_blank"
            className={styles.ctaButton}
          >
            {t("getInTouch")}
          </a>
        </section>

        {/* Disclosures Link */}
        <section className={styles.disclosuresLink}>
          <p>
            {t("disclosuresText")}{" "}
            <Link target="_blank" href="/disclosures">
              {t("disclosuresLinkText")}
            </Link>
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Angel;
