"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { languages, SupportedLocale } from "@/utils/translations";

function Header() {
  const { locale, changeLanguage, tSection, isLoading } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const t = tSection("Header");
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (langCode: SupportedLocale) => {
    changeLanguage(langCode);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const aboutText = isLoading ? "About" : t("about");

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}>Lorimer Jenkins</h1>
      </Link>
      <div className={styles.rightSection}>
        <Link href="/about">
          <p>{aboutText}</p>
        </Link>
        <div className={styles.languageSelector}>
          <button
            className={styles.languageButton}
            onClick={toggleDropdown}
            type="button"
          >
            <span className={styles.flag}>{currentLanguage.flag}</span>
            <span className={styles.languageCode}>
              {currentLanguage.code.toUpperCase()}
            </span>
            <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdown}>
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={`${styles.dropdownItem} ${locale === language.code ? styles.active : ""}`}
                  onClick={() => handleLanguageChange(language.code)}
                  type="button"
                >
                  <span className={styles.flag}>{language.flag}</span>
                  <span className={styles.languageName}>{language.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
