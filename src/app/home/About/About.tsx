"use client";
import styles from "./About.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { parseLinks } from "@/utils/parseLinks";

function About() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("About");

  const aboutText = isLoading
    ? "I'm a founder from England currently nomading around the US/UK/EU in AirBnb's. I'm interested in crypto, startups and software development. I have a background in venture capital and acting. I'm also a content creator and run a podcast called [Lorimer's Podcast](/#podcast)."
    : t("description");
  const getInTouchText = isLoading ? "Get in touch" : t("getInTouch");
  const taglineText = isLoading
    ? "ENTREPRENEUR • BUILDER • CREATOR • INVESTOR"
    : t("tagline");
  const mumQuoteText = isLoading
    ? '"Mr professional businessman"'
    : t("mumQuote");
  const mumAttributionText = isLoading ? "~ my Mum" : t("mumAttribution");

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.mumLabel}>
        <span className={styles.mumText}>{mumQuoteText}</span>
        <span className={styles.mumAttribution}>{mumAttributionText}</span>
        <svg
          className={styles.mumArrow}
          viewBox="0 0 60 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 5 Q20 25, 45 45"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M35 42 L45 45 L40 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <div className={styles.imageSection}>
        <img
          src="/images/random/suit.png"
          alt="Lorimer Jenkins in a suit"
          className={styles.suitImage}
        />
      </div>
      <div className={styles.textSection}>
        <img
          src="/images/random/lorimerSignatureWhite.png"
          alt="Lorimer Jenkins signature"
          className={`${styles.signature} ${styles.signatureDark}`}
        />
        <img
          src="/images/random/lorimerSignatureBlack.png"
          alt="Lorimer Jenkins signature"
          className={`${styles.signature} ${styles.signatureLight}`}
        />
        <p className={styles.tagline}>{taglineText}</p>
        <p className={styles.aboutText}>{parseLinks(aboutText)}</p>

        <a
          href="mailto:hellolorimerjenkins@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.getInTouch}
        >
          {getInTouchText}
        </a>
      </div>
    </div>
  );
}

export default About;
