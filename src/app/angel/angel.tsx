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
import { portfolio, categories, type Category } from "./investments";

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
  const subtitleText = isLoading
    ? "Backing founders building the future"
    : t("subtitle");

  // Filter portfolio by category
  const filteredPortfolio = useMemo(() => {
    if (selectedCategory === "all") {
      return [...portfolio].reverse();
    }
    return [...portfolio]
      .filter((investment) => investment.category === selectedCategory)
      .reverse();
  }, [selectedCategory]);

  // Count investments per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: portfolio.length };
    portfolio.forEach((inv) => {
      counts[inv.category] = (counts[inv.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Get available categories sorted by count (all always first, rest by count descending)
  const availableCategories = useMemo(() => {
    const categoriesWithInvestments = new Set(
      portfolio.map((inv) => inv.category),
    );
    const counts: Record<string, number> = {};
    portfolio.forEach((inv) => {
      counts[inv.category] = (counts[inv.category] || 0) + 1;
    });
    return categories
      .filter(
        (cat) => cat.key === "all" || categoriesWithInvestments.has(cat.key),
      )
      .sort((a, b) => {
        if (a.key === "all") return -1;
        if (b.key === "all") return 1;
        return (counts[b.key] || 0) - (counts[a.key] || 0);
      });
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
        {/* Hero Section */}
        <section className={styles.intro}>
          <h1 className={styles.title}>{t("title")}</h1>
          <p className={styles.subtitle}>{subtitleText}</p>
          {Array.isArray(introAndElevator) && introAndElevator.length > 0 && (
            <p className={styles.introParagraph}>
              {renderWithBold(introAndElevator[0])}
            </p>
          )}
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
                  {categoryCounts[category.key] || 0} {t(category.labelKey)}
                </button>
              ))}
            </div>

            <div className={styles.grid}>
              {filteredPortfolio.length > 0 ? (
                filteredPortfolio.map((investment, index) => (
                  <a
                    key={index}
                    href={investment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                  >
                    {/* Logo */}
                    <div className={styles.logoContainer}>
                      <img
                        src={investment.logo}
                        alt={investment.name}
                        className={styles.logo}
                      />
                    </div>

                    {/* Name */}
                    <h3 className={styles.companyName}>{investment.name}</h3>

                    {/* Category + Acquired */}
                    <div className={styles.tagsRow}>
                      <span className={styles.categoryTag}>
                        {t(
                          `category${
                            investment.category.charAt(0).toUpperCase() +
                            investment.category.slice(1)
                          }`,
                        )}
                      </span>
                      {investment.acquiredBy && (
                        <>
                          <span className={styles.tagSeparator}>·</span>
                          <span className={styles.acquiredBadge}>
                            {t("acquiredBy")}{" "}
                            <span
                              className={styles.acquiredLink}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(
                                  investment.acquiredBy!.website,
                                  "_blank",
                                );
                              }}
                            >
                              {investment.acquiredBy.name}
                            </span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <p className={styles.description}>
                      {parseLinks(t(investment.descriptionKey))}
                    </p>

                    {/* Footer */}
                    <div className={styles.cardFooter}>
                      <span className={styles.founders}>
                        {investment.founders.map((founder, i) => (
                          <span key={i}>
                            {i > 0 && " & "}
                            <span
                              className={styles.founderLink}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open(founder.x, "_blank");
                              }}
                            >
                              {founder.name}
                            </span>
                          </span>
                        ))}
                      </span>
                      <span className={styles.roundYear}>
                        {t(investment.roundKey)} ·{" "}
                        {t(`month${investment.month}`)} {investment.year}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <p className={styles.noResults}>
                  No investments in this category yet.
                </p>
              )}
            </div>
          </section>
        )}

        {/* Remaining Intro Paragraphs */}
        {Array.isArray(introAndElevator) && introAndElevator.length > 1 && (
          <section>
            <div className={styles.content}>
              {introAndElevator.slice(1).map((paragraph, index) => (
                <p key={index}>{renderWithBold(paragraph)}</p>
              ))}
            </div>
          </section>
        )}

        {/* How I Can Help Section */}
        <section>
          <h2 className={styles.sectionTitle}>{t("helpTitle")}</h2>
          <ul className={styles.bulletList}>
            {Array.isArray(helpItems) &&
              helpItems.map((item, index) => (
                <li key={index}>{renderWithBold(item)}</li>
              ))}
          </ul>
        </section>

        {/* Under Pressure Section */}
        <section>
          <h2 className={styles.sectionTitle}>{t("pressureTitle")}</h2>
          <ul className={styles.bulletList}>
            {Array.isArray(pressureItems) &&
              pressureItems.map((item, index) => (
                <li key={index}>{renderWithBold(item)}</li>
              ))}
          </ul>
        </section>

        {/* Mistakes Section */}
        <section>
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
            href="mailto:heylorimerjenkins@gmail.com"
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
