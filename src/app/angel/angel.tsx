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

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>{t("loading")}</p>
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
              href="https://twitter.com/intent/tweet?text=Hey%20%40Lorimer_Jenkins%2C%20here%27s%20my%20pitch%3A%0A%0AMy%20name%20is%3A%20Jeff%20Bezos%0A%0AI%20am%20building%3A%20Amazon%0A%0AMy%20customer%20is%3A%20Anyone%20too%20lazy%20to%20leave%20their%20house%0A%0AMy%20customer%20acquisition%20strategy%20is%3A%20Undercut%20everyone%20until%20they%20go%20bankrupt%2C%20then%20raise%20prices.%20Also%2C%20put%20a%20speaker%20in%20their%20home%20that%27s%20always%20listening."
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
                      <a href={investment.founderX} target="_blank">
                        {investment.founder}
                      </a>{" "}
                      · {t(investment.roundKey)} · {investment.year}
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
