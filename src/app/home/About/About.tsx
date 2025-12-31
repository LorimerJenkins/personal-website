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

  return (
    <div className={styles.aboutContainer}>
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
