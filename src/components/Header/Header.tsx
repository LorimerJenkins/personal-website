"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { languages, SupportedLocale } from "@/utils/translations";

function Header() {
  const { locale, changeLanguage, tSection, isLoading } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const homeText = isLoading ? "Home" : t("home");

  const blogsText = isLoading ? "Blogs" : t("blogs");

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}>Lorimer Jenkins</h1>
      </Link>
      <div className={styles.rightSection}>
        <Link href="/">
          <p>{homeText}</p>
        </Link>
        <Link href="/blogs">
          <p>{blogsText}</p>
        </Link>
        <div className={styles.languageSelector} ref={dropdownRef}>
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
