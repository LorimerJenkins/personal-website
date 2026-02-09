"use client";
import styles from "./travel.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { VISITED_COUNTRIES } from "./countriesVisited";
import { getCountryContent } from "./countryContent";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const DEFAULT_COUNTRY = "United Kingdom";

function Travel() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Travel");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] =
    useState<string>(DEFAULT_COUNTRY);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocale(getLocaleFromStorage());
    const handleLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: SupportedLocale }>;
      setLocale(customEvent.detail.locale);
    };
    window.addEventListener("localeChange", handleLocaleChange);
    return () => window.removeEventListener("localeChange", handleLocaleChange);
  }, []);

  const visitedCountryNames = useMemo(
    () => Object.values(VISITED_COUNTRIES).sort(),
    [],
  );

  const alphabet = useMemo(() => {
    const letters = new Set(
      visitedCountryNames.map((name) => name[0].toUpperCase()),
    );
    return Array.from(letters).sort();
  }, [visitedCountryNames]);

  const filteredCountries = useMemo(() => {
    if (!selectedLetter) return visitedCountryNames;
    return visitedCountryNames.filter(
      (name) => name[0].toUpperCase() === selectedLetter,
    );
  }, [visitedCountryNames, selectedLetter]);

  const countriesByLetter = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    visitedCountryNames.forEach((name) => {
      const letter = name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(name);
    });
    return grouped;
  }, [visitedCountryNames]);

  const countryContent = useMemo(
    () => getCountryContent(selectedCountry),
    [selectedCountry],
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const isVisited = (geoId: string) => geoId in VISITED_COUNTRIES;

  const handleCountrySelect = useCallback((countryName: string) => {
    setSelectedCountry(countryName);
    setActiveImageIndex(0);
  }, []);

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);

  const titleText = isLoading ? "Countries I Have Visited" : t("title");
  const subtitleText = isLoading
    ? "Exploring the world one country at a time"
    : t("subtitle");

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.body}>
          <div>Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.body}>
        {/* Title */}
        <div className={styles.titleBar}>
          <div>
            <h1 className={styles.title}>{titleText}</h1>
            <p className={styles.subtitle}>{subtitleText}</p>
          </div>
          <div className={styles.titleCountry}>
            <span className={styles.titleCountryLabel}>
              {t("viewing") || "Viewing"}
            </span>
            <span className={styles.titleCountryName}>{selectedCountry}</span>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className={styles.bento}>
          {/* Big Photo — top-left */}
          <div className={styles.cubeBigPhoto}>
            <img
              src={countryContent.images[activeImageIndex]}
              alt={`${selectedCountry} - photo ${activeImageIndex + 1}`}
              className={styles.cubeBigPhotoImg}
              key={`${selectedCountry}-${activeImageIndex}`}
            />
            <div className={styles.cubeBigPhotoOverlay}>
              <span className={styles.cubeBigPhotoIndex}>
                {activeImageIndex + 1} / {countryContent.images.length}
              </span>
            </div>
          </div>

          {/* Stats — right of big photo */}
          <div className={styles.cubeStats}>
            <div className={styles.statCube}>
              <span className={styles.statNumber}>
                {visitedCountryNames.length}
              </span>
              <span className={styles.statLabel}>{t("countries")}</span>
            </div>
            <div className={styles.statCube}>
              <span className={styles.statNumber}>6</span>
              <span className={styles.statLabel}>{t("continents")}</span>
            </div>
            <div className={styles.statCube}>
              <span className={styles.statNumber}>
                {Math.round((visitedCountryNames.length / 195) * 100)}%
              </span>
              <span className={styles.statLabel}>{t("ofWorld")}</span>
            </div>
          </div>

          {/* Review — top-right */}
          <div className={styles.cubeReview}>
            <span className={styles.reviewQuote}>&ldquo;</span>
            <p className={styles.reviewText}>{countryContent.review}</p>
            <div className={styles.reviewFooter}>
              <span className={styles.reviewAuthor}>— Lorimer</span>
            </div>
          </div>

          {/* 4 Thumbnails — bottom-left */}
          <div className={styles.cubeThumbs}>
            {countryContent.images.slice(1).map((image, index) => {
              const realIndex = index + 1;
              return (
                <button
                  key={`${selectedCountry}-${realIndex}`}
                  className={`${styles.cubeThumb} ${
                    activeImageIndex === realIndex ? styles.cubeThumbActive : ""
                  }`}
                  onClick={() => handleThumbnailClick(realIndex)}
                >
                  <img
                    src={image}
                    alt={`${selectedCountry} thumbnail ${realIndex + 1}`}
                    className={styles.cubeThumbImg}
                  />
                </button>
              );
            })}
          </div>

          {/* Country List — bottom-right-left */}
          <div className={styles.cubeList}>
            <div className={styles.listHeader}>
              <h2 className={styles.listTitle}>{t("countriesAZ")}</h2>
              <div className={styles.alphabetFilter}>
                <button
                  className={`${styles.letterBtn} ${
                    selectedLetter === null ? styles.letterBtnActive : ""
                  }`}
                  onClick={() => setSelectedLetter(null)}
                >
                  {t("all")}
                </button>
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                  const has = alphabet.includes(letter);
                  return (
                    <button
                      key={letter}
                      className={`${styles.letterBtn} ${
                        selectedLetter === letter ? styles.letterBtnActive : ""
                      } ${!has ? styles.letterBtnDisabled : ""}`}
                      onClick={() => has && setSelectedLetter(letter)}
                      disabled={!has}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.listScroll} ref={listRef}>
              {selectedLetter ? (
                <div className={styles.letterGroup}>
                  <span className={styles.letterHeading}>{selectedLetter}</span>
                  <div className={styles.countryItems}>
                    {filteredCountries.map((country) => (
                      <button
                        key={country}
                        className={`${styles.countryItem} ${
                          selectedCountry === country
                            ? styles.countryItemActive
                            : ""
                        }`}
                        onClick={() => handleCountrySelect(country)}
                      >
                        <span className={styles.countryDot} />
                        <span>{country}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                Object.entries(countriesByLetter).map(([letter, countries]) => (
                  <div key={letter} className={styles.letterGroup}>
                    <span className={styles.letterHeading}>{letter}</span>
                    <div className={styles.countryItems}>
                      {countries.map((country) => (
                        <button
                          key={country}
                          className={`${styles.countryItem} ${
                            selectedCountry === country
                              ? styles.countryItemActive
                              : ""
                          }`}
                          onClick={() => handleCountrySelect(country)}
                        >
                          <span className={styles.countryDot} />
                          <span>{country}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Map — bottom-right-right */}
          <div className={styles.cubeMap} onMouseMove={handleMouseMove}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 110, center: [0, 25] }}
              className={styles.mapSvg}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const geoId = geo.id;
                    const visited = isVisited(geoId);
                    const isUK = geoId === "826";
                    const name =
                      VISITED_COUNTRIES[geoId] || geo.properties.name;
                    const isSelected = selectedCountry === name;

                    const fill = isSelected
                      ? "#ffffff"
                      : isUK
                        ? "#000000"
                        : visited
                          ? "var(--accent-primary)"
                          : "#d1d5db";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHoveredCountry(name)}
                        onMouseLeave={() => setHoveredCountry(null)}
                        onClick={() => {
                          if (visited || isUK) handleCountrySelect(name);
                        }}
                        style={{
                          default: {
                            fill,
                            stroke: isSelected
                              ? "var(--accent-primary)"
                              : "#fff",
                            strokeWidth: isSelected ? 1.5 : 0.4,
                            outline: "none",
                            transition: "all 0.3s ease",
                          },
                          hover: {
                            fill,
                            stroke: isSelected
                              ? "var(--accent-primary)"
                              : "#fff",
                            strokeWidth: isSelected ? 1.5 : 0.6,
                            outline: "none",
                            cursor: visited || isUK ? "pointer" : "default",
                            filter:
                              visited || isUK ? "brightness(1.15)" : "none",
                          },
                          pressed: { fill, outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            <div className={styles.mapLegendBar}>
              <span className={styles.legendPill}>
                <span className={styles.legendDot} data-visited="born" />
                {t("bornHere")}
              </span>
              <span className={styles.legendPill}>
                <span className={styles.legendDot} data-visited="true" />
                {t("visited")}
              </span>
              <span className={styles.legendPill}>
                <span className={styles.legendDot} data-visited="false" />
                {t("notYet")}
              </span>
            </div>

            {hoveredCountry && (
              <div
                className={styles.tooltip}
                style={{
                  left: tooltipPosition.x + 15,
                  top: tooltipPosition.y - 10,
                }}
              >
                <span className={styles.tooltipName}>{hoveredCountry}</span>
                {hoveredCountry === "United Kingdom" ? (
                  <span className={styles.tooltipBadgeBorn}>
                    {t("bornHere")}
                  </span>
                ) : Object.values(VISITED_COUNTRIES).includes(
                    hoveredCountry,
                  ) ? (
                  <span className={styles.tooltipBadge}>{t("visited")}</span>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Travel;
