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
  founder: string;
  founderX: string;
}

const portfolio: Investment[] = [
  {
    name: "Astro",
    website: "https://www.astrousd.com/",
    year: 2024,
    roundKey: "preSeed",
    descriptionKey: "astroDescription",
    logo: "/images/angelInvestments/Astro.svg",
    founder: "Kadar Sayed Abdi",
    founderX: "https://x.com/0xKadar",
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
  const crunchbaseText = isLoading
    ? "See more information on my"
    : t("crunchbaseText");
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
              {t("intro2Part1")} <strong>{checkAmountText}</strong>{" "}
              {t("intro2Part2")}
            </p>
            <p>{intro3Text}</p>
            <a
              href="https://twitter.com/intent/tweet?text=Hey%20%40Lorimer_Jenkins%2C%20here%27s%20my%20public%20pitch%3A%0A%0AMy%20name%20is%3A%20Jeff%20Bezos%0A%0AI%20am%20building%3A%20Amazon%0A%0AMy%20customer%20is%3A%20Anyone%20too%20lazy%20to%20leave%20their%20house%0A%0AMy%20customer%20acquisition%20strategy%20is%3A%20Undercut%20everyone%20until%20they%20go%20bankrupt%2C%20then%20raise%20prices.%20Also%2C%20put%20a%20speaker%20in%20their%20home%20that%27s%20always%20listening."
              target="_blank"
            >
              {getInTouchText}
            </a>
          </div>
        </section>

        {portfolio.length > 0 && (
          <section className={styles.portfolio}>
            <h2 className={styles.sectionTitle}>{portfolioTitleText}</h2>
            <p className={styles.crunchbaseText}>
              {crunchbaseText}{" "}
              <a
                href="https://www.crunchbase.com/person/lorimer-jenkins"
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
                      {t(investment.roundKey)} · {investment.year} ·{" "}
                      <a href={investment.founderX} target="_blank">
                        {investment.founder}
                      </a>
                    </span>
                  </div>

                  <a
                    href={investment.website}
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
