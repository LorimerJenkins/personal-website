"use client";
import styles from "./Footer.module.css";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Footer");

  const currentYear = new Date().getFullYear();

  const madeWithText = isLoading ? "Made with" : t("madeWith");
  const termsText = isLoading ? "Terms" : t("terms");
  const privacyText = isLoading ? "Privacy" : t("privacy");
  const arweaveNetSiteText = isLoading
    ? "Hosted forever on arweave.net"
    : t("arweaveNetSite");
  const coffeeText = isLoading ? "Buy me a coffee" : t("coffee");
  const submitPRText = isLoading ? "Submit a PR" : t("submitPR");

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.left}>
          <p className={styles.leftText}>{madeWithText}</p>
          <a
            className={styles.legal}
            href="https://lorimer.arweave.net"
            target="_blank"
          >
            {arweaveNetSiteText}
          </a>
          <a
            href="https://github.com/LorimerJenkins/personal-website"
            target="_blank"
            className={styles.leftText}
          >
            {submitPRText}
          </a>
        </div>
        <div className={styles.right}>
          <a className={styles.legal} href="/legal/TOS.pdf" target="_blank">
            {termsText}
          </a>
          <a className={styles.legal} href="/legal/PP.pdf" target="_blank">
            {privacyText}
          </a>
          <p className={styles.legal}>© Lorimer Jenkins {currentYear}</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
