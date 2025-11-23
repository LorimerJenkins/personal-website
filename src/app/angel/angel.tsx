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
  round: string;
  description: string;
  logo: string;
}

const portfolio: Investment[] = [
  {
    name: "Astro",
    website: "https://www.astrousd.com/",
    year: 2024,
    round: "Pre-seed",
    description: "Over-collateralised stablecoin issuer",
    logo: "/images/angelInvestments/Astro.svg",
  },
];

function Angel() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Angel");
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

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>Loading...</p>
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
          <h1 className={styles.title}>Angel Investing</h1>

          <div className={styles.content}>
            <p>
              I love meeting founders who are building something they genuinely
              care about. When I see potential and ways I can help beyond just
              capital, I'm eager to get involved early.
            </p>

            <p>
              I typically write checks between <strong>$500 and $5,000</strong>{" "}
              in pre-seed and seed rounds. Although I don't write the biggest
              checks, I try to be useful. Whether that's introductions, product
              feedback, technical advice, or just being someone to talk through
              problems with, I want to be the kind of investor I'd want on my
              cap table.
            </p>
            <p>Building something interesting? I'd love to hear about it.</p>
            <a href="https://x.com/Lorimer_Jenkins" target="_blank">
              Get in touch
            </a>
          </div>
        </section>

        {portfolio.length > 0 && (
          <section className={styles.portfolio}>
            <h2 className={styles.sectionTitle}>My Portfolio</h2>
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

                  <p className={styles.description}>{investment.description}</p>

                  <div className={styles.meta}>
                    <span className={styles.roundYear}>
                      {investment.round} · {investment.year}
                    </span>
                  </div>

                  <a
                    href={investment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    See the project
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
