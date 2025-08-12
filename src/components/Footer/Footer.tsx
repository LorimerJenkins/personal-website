"use client";
import styles from "./Footer.module.css";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Footer");

  const contactText = isLoading ? "Contact" : t("contact");

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.left}>
          <a
            href="https://t.me/lorimer_jenkins"
            className={styles.contact}
            target="_blank"
          >
            {contactText}
          </a>
        </div>
        <div className={styles.right}>
          <div className={styles.socials}>
            <a
              href="https://x.com/Lorimer_Jenkins"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/socials/x.svg"
                alt="X"
                height={15}
                width={15}
              />
            </a>

            <a
              href="https://www.linkedin.com/in/lorimerjenkins"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/socials/linkedin.svg"
                alt="Linkedin"
                height={12}
                width={12}
              />
            </a>

            <a
              href="https://github.com/LorimerJenkins"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/images/socials/github.svg"
                alt="GitHub"
                height={15}
                width={15}
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
