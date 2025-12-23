"use client";
import styles from "./Footer.module.css";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const gitHash = process.env.NEXT_PUBLIC_GIT_HASH || "unknown";
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Footer");

  const currentYear = new Date().getFullYear();

  const madeWithText = isLoading ? "Made with" : t("madeWith");
  const termsText = isLoading ? "Terms" : t("terms");
  const privacyText = isLoading ? "Privacy" : t("privacy");
  const disclosuresText = isLoading ? "Disclosures" : t("disclosures");

  const arweaveNetSiteText = isLoading
    ? "Hosted forever on arweave.net"
    : t("arweaveNetSite");
  const submitPRText = isLoading ? "Submit a PR" : t("submitPR");
  const reportBugText = isLoading ? "Report a bug" : t("reportBug");

  const socialLinks = [
    {
      name: "Instagram",
      icon: "/images/icons/social-media/instagram.svg",
      url: "https://www.instagram.com/lorimer_jenkins",
    },
    {
      name: "TikTok",
      icon: "/images/icons/social-media/tiktok.svg",
      url: "https://www.tiktok.com/@lorimer.jenkins",
    },
    {
      name: "YouTube",
      icon: "/images/icons/social-media/youtube.svg",
      url: "https://www.youtube.com/@lorimerjenkins",
    },
    {
      name: "X",
      icon: "/images/icons/social-media/x.svg",
      url: "https://x.com/lorimer_jenkins",
    },
    {
      name: "LinkedIn",
      icon: "/images/icons/social-media/linkedin.svg",
      url: "https://www.linkedin.com/in/lorimerjenkins",
    },
    {
      name: "Facebook",
      icon: "/images/icons/social-media/facebook.svg",
      url: "https://www.facebook.com/lorimerjenkins",
    },
  ];

  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.socialBar}>
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            className={styles.socialLink}
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span
              className={styles.socialIcon}
              style={{
                WebkitMaskImage: `url(${social.icon})`,
                maskImage: `url(${social.icon})`,
              }}
            />
          </a>
        ))}
      </div>
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

          <a
            href={`https://github.com/LorimerJenkins/personal-website/commit/${gitHash}`}
            target="_blank"
            className={styles.leftText}
          >
            {gitHash}
          </a>

          <a
            href="https://forms.gle/7CqPk9GaJyxdx25E7"
            target="_blank"
            className={styles.leftText}
          >
            {reportBugText}
          </a>
        </div>
        <div className={styles.right}>
          <a className={styles.legal} href="/terms" target="_blank">
            {termsText}
          </a>
          <a className={styles.legal} href="/privacy" target="_blank">
            {privacyText}
          </a>
          <a className={styles.legal} href="/disclosures" target="_blank">
            {disclosuresText}
          </a>
          <p className={styles.legal}>© Lorimer Jenkins {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
