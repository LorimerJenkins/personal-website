"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import {
  languages,
  languagesByRegion,
  regions,
  SupportedLocale,
} from "@/utils/translations";

function Header() {
  const { locale, changeLanguage, tSection, isLoading } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const t = tSection("Header");
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (langCode: SupportedLocale) => {
    changeLanguage(langCode);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsDropdownOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const filteredLanguages = searchQuery
    ? languages.filter(
        (lang) =>
          lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lang.code.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : null;

  const homeText = isLoading ? "Home" : t("home");
  const writingText = isLoading ? "Writing" : t("writing");
  const linksText = isLoading ? "Links" : t("links");
  const projectsText = isLoading ? "Projects" : t("projects");
  const angelText = isLoading ? "Angel" : t("angel");
  const searchPlaceholder = isLoading
    ? "Search languages..."
    : t("searchLanguages");
  const noResultsText = isLoading
    ? "No languages found"
    : t("noLanguagesFound");

  const navLinks = (
    <>
      <Link href="/" onClick={closeMobileMenu}>
        <p>{homeText}</p>
      </Link>
      <Link href="/writing" onClick={closeMobileMenu}>
        <p>{writingText}</p>
      </Link>
      <Link href="/projects" onClick={closeMobileMenu}>
        <p>{projectsText}</p>
      </Link>
      <Link href="/angel" onClick={closeMobileMenu}>
        <p>{angelText}</p>
      </Link>
      <Link
        href="https://linktr.ee/lorimerjenkins"
        target="_blank"
        onClick={closeMobileMenu}
      >
        <p>{linksText}</p>
      </Link>
    </>
  );

  const languageSelectorContent = (
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
          <div className={styles.searchContainer}>
            <input
              ref={searchInputRef}
              type="text"
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.dropdownContent}>
            {filteredLanguages ? (
              <div className={styles.searchResults}>
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((language) => (
                    <button
                      key={language.code}
                      className={
                        styles.dropdownItem +
                        " " +
                        (locale === language.code ? styles.active : "")
                      }
                      onClick={() => handleLanguageChange(language.code)}
                      type="button"
                    >
                      <span className={styles.flag}>{language.flag}</span>
                      <span className={styles.languageName}>
                        {language.name}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className={styles.noResults}>{noResultsText}</div>
                )}
              </div>
            ) : (
              regions.map((region) => (
                <div key={region} className={styles.regionGroup}>
                  <div className={styles.regionHeader}>{region}</div>
                  <div className={styles.regionLanguages}>
                    {languagesByRegion[region].map((language) => (
                      <button
                        key={language.code}
                        className={
                          styles.dropdownItem +
                          " " +
                          (locale === language.code ? styles.active : "")
                        }
                        onClick={() => handleLanguageChange(language.code)}
                        type="button"
                      >
                        <span className={styles.flag}>{language.flag}</span>
                        <span className={styles.languageName}>
                          {language.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.header}>
      <Link href="/">
        <h1 className={styles.title}>Lorimer Jenkins</h1>
      </Link>

      {/* Desktop Navigation */}
      <div className={styles.rightSection}>
        {navLinks}
        {languageSelectorContent}
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.hamburger}
        onClick={toggleMobileMenu}
        type="button"
        aria-label="Toggle menu"
      >
        <span
          className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ""}`}
        ></span>
        <span
          className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ""}`}
        ></span>
        <span
          className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ""}`}
        ></span>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileNavLinks}>{navLinks}</div>
        <div className={styles.mobileLanguageSelector}>
          {languageSelectorContent}
        </div>
      </div>
    </div>
  );
}

export default Header;
