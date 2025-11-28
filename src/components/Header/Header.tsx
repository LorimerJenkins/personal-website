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
import {
  Theme,
  getDefaultTheme,
  getThemeById,
  getDarkThemes,
  getLightThemes,
  applyTheme,
  saveThemePreference,
  loadThemePreference,
} from "@/utils/themes";

function Header() {
  const { locale, changeLanguage, tSection, isLoading } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] =
    useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const t = tSection("Header");
  const tThemes = tSection("Themes");
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedThemeId = loadThemePreference();
    let theme: Theme;

    if (savedThemeId) {
      const savedTheme = getThemeById(savedThemeId);
      theme = savedTheme || getDefaultTheme();
    } else {
      theme = getDefaultTheme();
      saveThemePreference(theme.id);
    }

    setCurrentTheme(theme);
    setMounted(true);
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    saveThemePreference(theme.id);
    setIsThemeDropdownOpen(false);
  };

  const toggleThemeDropdown = () => {
    setIsThemeDropdownOpen(!isThemeDropdownOpen);
    setIsDropdownOpen(false);
  };

  const handleLanguageChange = (langCode: SupportedLocale) => {
    changeLanguage(langCode);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsThemeDropdownOpen(false);
    if (!isDropdownOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsDropdownOpen(false);
      setIsThemeDropdownOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsThemeDropdownOpen(false);
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropdownOpen(false);
        setSearchQuery("");
      }

      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(target)
      ) {
        setIsThemeDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isThemeDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen, isThemeDropdownOpen]);

  // Prevent body scroll when mobile menu is open - improved version
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";

      return () => {
        // Restore body scroll
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMobileMenuOpen]);

  // Handle touch events on mobile menu to prevent scroll propagation
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu || !isMobileMenuOpen) return;

    const handleTouchMove = (e: TouchEvent) => {
      // Allow scrolling within the menu
      const target = e.target as HTMLElement;
      const isScrollable = mobileMenu.scrollHeight > mobileMenu.clientHeight;

      if (isScrollable) {
        const isAtTop = mobileMenu.scrollTop <= 0;
        const isAtBottom =
          mobileMenu.scrollTop + mobileMenu.clientHeight >=
          mobileMenu.scrollHeight;

        // Get touch direction
        const touch = e.touches[0];
        const startY = (mobileMenu as any)._touchStartY || touch.clientY;
        const deltaY = touch.clientY - startY;

        // Prevent overscroll at boundaries
        if ((isAtTop && deltaY > 0) || (isAtBottom && deltaY < 0)) {
          e.preventDefault();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Store touch start position
      (mobileMenu as any)._touchStartY = e.touches[0].clientY;
    };

    mobileMenu.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    mobileMenu.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      mobileMenu.removeEventListener("touchstart", handleTouchStart);
      mobileMenu.removeEventListener("touchmove", handleTouchMove);
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
  const bookshelfText = isLoading ? "Bookshelf" : t("bookshelf");
  const angelText = isLoading ? "Angel" : t("angel");
  const searchPlaceholder = isLoading
    ? "Search languages..."
    : t("searchLanguages");
  const noResultsText = isLoading
    ? "No languages found"
    : t("noLanguagesFound");

  const darkThemes = getDarkThemes();
  const lightThemes = getLightThemes();

  // Get translated theme name
  const getThemeName = (theme: Theme): string => {
    if (isLoading) {
      return theme.nameKey
        .replace("theme", "")
        .replace(/([A-Z])/g, " $1")
        .trim();
    }
    return tThemes(theme.nameKey);
  };

  const darkText = isLoading ? "Dark" : tThemes("dark");
  const lightText = isLoading ? "Light" : tThemes("light");

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
      <Link href="/bookshelf" onClick={closeMobileMenu}>
        <p>{bookshelfText}</p>
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

  const themeSelectorContent =
    mounted && currentTheme ? (
      <div className={styles.themeSelector} ref={themeDropdownRef}>
        <button
          className={styles.themeButton}
          onClick={toggleThemeDropdown}
          type="button"
          aria-label="Select theme"
        >
          <span className={styles.themeButtonText}>
            {getThemeName(currentTheme)}
          </span>
          <span className={styles.arrow}>
            {isThemeDropdownOpen ? "▲" : "▼"}
          </span>
        </button>

        {isThemeDropdownOpen && (
          <div className={styles.themeDropdown}>
            <div className={styles.themeDropdownContent}>
              {/* Dark Themes Section */}
              <div className={styles.themeModeSection}>
                <div className={styles.themeModeHeader}>🌙 {darkText}</div>
                <div className={styles.themeList}>
                  {darkThemes.map((theme) => (
                    <button
                      key={theme.id}
                      className={`${styles.themeItem} ${currentTheme.id === theme.id ? styles.activeTheme : ""}`}
                      onClick={() => handleThemeChange(theme)}
                      type="button"
                    >
                      <div
                        className={styles.themePreview}
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.accentPrimary} 100%)`,
                        }}
                      />
                      <span className={styles.themeName}>
                        {getThemeName(theme)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Light Themes Section */}
              <div className={styles.themeModeSection}>
                <div className={styles.themeModeHeader}>☀️ {lightText}</div>
                <div className={styles.themeList}>
                  {lightThemes.map((theme) => (
                    <button
                      key={theme.id}
                      className={`${styles.themeItem} ${currentTheme.id === theme.id ? styles.activeTheme : ""}`}
                      onClick={() => handleThemeChange(theme)}
                      type="button"
                    >
                      <div
                        className={styles.themePreview}
                        style={{
                          background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.accentPrimary} 100%)`,
                        }}
                      />
                      <span className={styles.themeName}>
                        {getThemeName(theme)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    ) : null;

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
                      className={`${styles.dropdownItem} ${locale === language.code ? styles.active : ""}`}
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
                        className={`${styles.dropdownItem} ${locale === language.code ? styles.active : ""}`}
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
        {themeSelectorContent}
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
        />
        <span
          className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ""}`}
        />
        <span
          className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.open : ""}`}
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu} />
      )}

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileSelectors}>
          <div className={styles.mobileThemeSelector}>{themeSelectorContent}</div>
          <div className={styles.mobileLanguageSelector}>
            {languageSelectorContent}
          </div>
        </div>
        <div className={styles.mobileNavLinks}>{navLinks}</div>
      </div>
    </div>
  );
}

export default Header;