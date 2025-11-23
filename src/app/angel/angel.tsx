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

interface Investment {
  name: string;
  website: string;
  year: number;
  roundKey: string;
  descriptionKey: string;
  logo: string;
}

const portfolio: Investment[] = [
  {
    name: "Astro",
    website: "https://www.astrousd.com/",
    year: 2024,
    roundKey: "preSeed",
    descriptionKey: "astroDescription",
    logo: "/images/angelInvestments/Astro.svg",
  },
];

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

  const loadingText = isLoading ? "Loading..." : t("loading");
  const titleText = isLoading ? "Angel Investing" : t("title");
  const intro1Text = isLoading
    ? "I love meeting founders who are building something they genuinely care about. When I see potential and ways I can help beyond just capital, I'm eager to get involved early."
    : t("intro1");
  const intro3Text = isLoading
    ? "Building something interesting? I'd love to hear about it."
    : t("intro3");
  const getInTouchText = isLoading ? "Get in touch" : t("getInTouch");
  const portfolioTitleText = isLoading ? "My Portfolio" : t("portfolioTitle");
  const crunchbaseText = isLoading ? "See more info on my" : t("crunchbaseText");
  const seeProjectText = isLoading ? "See the project" : t("seeProject");
  const checkAmountText = isLoading ? "$500 and $5,000" : t("checkAmount");

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>{loadingText}</p>
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
          <h1 className={styles.title}>{titleText}</h1>

          <div className={styles.content}>
            <p>{intro1Text}</p>

            <p>
              {t("intro2Part1")} <strong>{checkAmountText}</strong> {t("intro2Part2")}
            </p>
            <p>{intro3Text}</p>
            <a href="https://x.com/Lorimer_Jenkins" target="_blank">
              {getInTouchText}
            </a>
          </div>
        </section>

        {portfolio.length > 0 && (
          <section className={styles.portfolio}>
            <h2 className={styles.sectionTitle}>{portfolioTitleText}</h2>
            <p className={styles.crunchbaseText}>
              {crunchbaseText}{" "}
              
                <a href="https://www.crunchbase.com/person/lorimer-jenkins"
                target="_blank"
              >
                Crunchbase
              </a>
            </p>
            <div className={styles.grid}>
              {portfolio.map((investment, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.logoContainer}>
                    <img
                      src={investment.logo}
                      alt={investment.name}
                      className={styles.logo}
                    />
                  </div>

                  <p className={styles.description}>
                    {t(investment.descriptionKey)}
                  </p>

                  <div className={styles.meta}>
                    <span className={styles.roundYear}>
                      {t(investment.roundKey)} · {investment.year}
                    </span>
                  </div>

                  
                    <a href={investment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    {seeProjectText}
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