"use client";
import Link from "next/link";
import styles from "./Header.module.css";
import { useTranslations } from "next-intl";

function Header() {
  const t = useTranslations("Header");

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}>Lorimer Jenkins</h1>
      </Link>
      <div className={styles.rightSection}>
        <Link href="/about">
          <p>{t("about")}</p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
