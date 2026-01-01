"use client";
import styles from "./travel.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { VISITED_COUNTRIES } from "./countriesVisited";

// TopoJSON world map URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function Travel() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Travel");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    setLocale(getLocaleFromStorage());

    const handleLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: SupportedLocale }>;
      setLocale(customEvent.detail.locale);
    };

    window.addEventListener("localeChange", handleLocaleChange);
    return () => {
      window.removeEventListener("localeChange", handleLocaleChange);
    };
  }, []);

  // Get sorted list of visited country names
  const visitedCountryNames = useMemo(() => {
    return Object.values(VISITED_COUNTRIES).sort();
  }, []);

  // Get unique first letters
  const alphabet = useMemo(() => {
    const letters = new Set(
      visitedCountryNames.map((name) => name[0].toUpperCase()),
    );
    return Array.from(letters).sort();
  }, [visitedCountryNames]);

  // Filter countries by selected letter
  const filteredCountries = useMemo(() => {
    if (!selectedLetter) return visitedCountryNames;
    return visitedCountryNames.filter(
      (name) => name[0].toUpperCase() === selectedLetter,
    );
  }, [visitedCountryNames, selectedLetter]);

  // Group countries by letter for A-Z display
  const countriesByLetter = useMemo(() => {
    const grouped: Record<string, string[]> = {};
    visitedCountryNames.forEach((name) => {
      const letter = name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(name);
    });
    return grouped;
  }, [visitedCountryNames]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  const isVisited = (geoId: string) => {
    return geoId in VISITED_COUNTRIES;
  };

  const loadingText = isLoading ? "Loading..." : t("loading");
  const titleText = isLoading ? "Countries I Have Visited" : t("title");

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.body}>
          <div>{loadingText}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.body} onMouseMove={handleMouseMove}>
        <h1 className={styles.title}>{titleText}</h1>

        <div className={styles.mainLayout}>
          {/* Left Column - Stats and A-Z List */}
          <div className={styles.leftColumn}>
            {/* Stats Bar */}
            <div className={styles.statsBar}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {visitedCountryNames.length}
                </span>
                <span className={styles.statLabel}>{t("countries")}</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>6</span>
                <span className={styles.statLabel}>{t("continents")}</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNumber}>
                  {Math.round((visitedCountryNames.length / 195) * 100)}%
                </span>
                <span className={styles.statLabel}>{t("ofWorld")}</span>
              </div>
            </div>

            {/* A-Z Country List */}
            <section className={styles.listSection}>
              <h2 className={styles.listTitle}>{t("countriesAZ")}</h2>

              {/* Alphabet Filter */}
              <div className={styles.alphabetFilter}>
                <button
                  className={`${styles.letterButton} ${
                    selectedLetter === null ? styles.letterActive : ""
                  }`}
                  onClick={() => setSelectedLetter(null)}
                >
                  {t("all")}
                </button>
                {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
                  const hasCountries = alphabet.includes(letter);
                  return (
                    <button
                      key={letter}
                      className={`${styles.letterButton} ${
                        selectedLetter === letter ? styles.letterActive : ""
                      } ${!hasCountries ? styles.letterDisabled : ""}`}
                      onClick={() => hasCountries && setSelectedLetter(letter)}
                      disabled={!hasCountries}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>

              {/* Scrollable Country Grid */}
              <div className={styles.countryGridWrapper}>
                <div className={styles.countryGrid}>
                  {selectedLetter ? (
                    <div className={styles.letterGroup}>
                      <span className={styles.letterHeading}>
                        {selectedLetter}
                      </span>
                      <div className={styles.countryList}>
                        {filteredCountries.map((country) => (
                          <div key={country} className={styles.countryCard}>
                            <span className={styles.countryCheckmark}>✓</span>
                            <span className={styles.countryName}>
                              {country}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    Object.entries(countriesByLetter).map(
                      ([letter, countries]) => (
                        <div key={letter} className={styles.letterGroup}>
                          <span className={styles.letterHeading}>{letter}</span>
                          <div className={styles.countryList}>
                            {countries.map((country) => (
                              <div key={country} className={styles.countryCard}>
                                <span className={styles.countryCheckmark}>
                                  ✓
                                </span>
                                <span className={styles.countryName}>
                                  {country}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                    )
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Map */}
          <div className={styles.rightColumn}>
            <div className={styles.mapContainer}>
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 130,
                  center: [0, 30],
                }}
                className={styles.worldMap}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const geoId = geo.id;
                      const visited = isVisited(geoId);
                      const isUK = geoId === "826";
                      const countryName =
                        VISITED_COUNTRIES[geoId] || geo.properties.name;

                      const getFillColor = () => {
                        if (isUK) return "#000000";
                        if (visited) return "var(--accent-primary)";
                        return "#d1d5db";
                      };

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => setHoveredCountry(countryName)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          className={styles.country}
                          style={{
                            default: {
                              fill: getFillColor(),
                              stroke: "#ffffff",
                              strokeWidth: 0.5,
                              outline: "none",
                              transition: "fill 0.2s ease",
                            },
                            hover: {
                              fill: getFillColor(),
                              stroke: "#ffffff",
                              strokeWidth: 0.75,
                              outline: "none",
                              cursor: "pointer",
                              filter:
                                visited || isUK ? "brightness(1.15)" : "none",
                            },
                            pressed: {
                              fill: getFillColor(),
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>

              {/* Tooltip */}
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

            {/* Map Legend */}
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} data-visited="born" />
                <span>{t("bornHere")}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} data-visited="true" />
                <span>{t("visited")}</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDot} data-visited="false" />
                <span>{t("notYet")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Travel;
