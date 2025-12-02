"use client";
import styles from "./angel.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import { parseLinks } from "@/utils/parseLinks";

interface Investment {
  name: string;
  website: string;
  year: number;
  roundKey: string;
  descriptionKey: string;
  logo: string;
  founders: { name: string; x: string }[];
}

const portfolio: Investment[] = [
  {
    name: "Astro",
    website: "https://www.astrousd.com",
    year: 2024,
    roundKey: "preSeed",
    descriptionKey: "astroDescription",
    logo: "/images/angelInvestments/astro.svg",
    founders: [{ name: "Kadar Sayed Abdi", x: "https://x.com/0xKadar" }],
  },
  {
    name: "Vela Ventures",
    website: "https://vela.ventures",
    year: 2025,
    roundKey: "fundingRound",
    descriptionKey: "velaventuresDescription",
    logo: "/images/angelInvestments/velaventures.svg",
    founders: [
      { name: "William Kibbler", x: "https://x.com/kibbler_william" },
      { name: "Ellis Kilbane", x: "https://x.com/EllisKilbane" },
    ],
  },
  {
    name: "Upshot",
    website: "https://upshot.cards",
    year: 2025,
    roundKey: "bridgeRound",
    descriptionKey: "upshotDescription",
    logo: "/images/angelInvestments/upshot.svg",
    founders: [{ name: "Retrimentum", x: "https://x.com/retrimentum" }],
  },
];

// Helper to render markdown-style bold text
function renderWithBold(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function Angel() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("AngelPage");
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

  // Get intro paragraphs as array
  const introParagraphs = t("introParagraphs") as unknown as string[];
  const loadingText = isLoading ? "Loading..." : t("loading");

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
        <section className={styles.intro}>
          <h1 className={styles.title}>{t("title")}</h1>

          <div className={styles.content}>
            {Array.isArray(introParagraphs) &&
              introParagraphs.map((paragraph, index) => (
                <p key={index}>{renderWithBold(paragraph)}</p>
              ))}

            <a
              href="mailto:hellolorimerjenkins@gmail.com"
              target="_blank"
              className={styles.ctaLink}
            >
              {t("getInTouch")}
            </a>
          </div>
        </section>

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
            <div className={styles.grid}>
              {[...portfolio].reverse().map((investment, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.logoContainer}>
                    <img
                      src={investment.logo}
                      alt={investment.name}
                      className={styles.logo}
                    />
                  </div>

                  <p className={styles.description}>
                    {parseLinks(t(investment.descriptionKey))}
                  </p>

                  <div className={styles.meta}>
                    <span className={styles.roundYear}>
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
                      {" · "}
                      {t(investment.roundKey)} · {investment.year}
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
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Angel;
