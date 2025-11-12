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

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.left}>
          <p>{madeWithText}</p>
          <p>© Lorimer Jenkins {currentYear}</p>
        </div>
        <div className={styles.right}>
          <a className={styles.legal} href="/legal/TOS.pdf" target="_blank">
            {termsText}
          </a>
          <a className={styles.legal} href="/legal/PP.pdf" target="_blank">
            {privacyText}
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
