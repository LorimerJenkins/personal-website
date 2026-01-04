"use client";
import styles from "./FAQ.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { faqItems } from "./faqData";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import { parseLinks } from "@/utils/parseLinks";

function FAQ() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("FAQ");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const titleText = isLoading ? "Frequently Asked Questions" : t("title");

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (faqItems.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{titleText}</h2>
        </div>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ""}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleItem(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>
                  {t(item.questionKey)}
                </span>
                <span className={styles.toggleIcon}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 4.5L6 8L9.5 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`${styles.faqAnswer} ${openIndex === index ? styles.faqAnswerOpen : ""}`}
              >
                <div className={styles.answerInner}>
                  <p className={styles.answerText}>
                    {parseLinks(t(item.answerKey))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
