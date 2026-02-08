"use client";
import styles from "./LatestChess.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const CHESS_USERNAME = "CoolLori";
const API_BASE = "https://api.chess.com/pub";

interface RatingRecord {
  rating: number;
  date: number;
  rd?: number;
}

interface GameTypeStats {
  last?: RatingRecord;
  best?: RatingRecord;
  record?: { win: number; loss: number; draw: number };
}

interface PlayerProfile {
  username: string;
  avatar?: string;
  url: string;
  status: string;
}

interface PlayerStats {
  chess_rapid?: GameTypeStats;
  chess_blitz?: GameTypeStats;
  chess_bullet?: GameTypeStats;
  chess_daily?: GameTypeStats;
}

function LatestChess() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("LatestChess");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLocale(getLocaleFromStorage());
    const handleLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: SupportedLocale }>;
      setLocale(customEvent.detail.locale);
    };
    window.addEventListener("localeChange", handleLocaleChange);
    return () => window.removeEventListener("localeChange", handleLocaleChange);
  }, []);

  const fetchData = useCallback(async () => {
    setLoadingData(true);
    setError(false);
    try {
      const [profileRes, statsRes] = await Promise.all([
        fetch(`${API_BASE}/player/${CHESS_USERNAME}`),
        fetch(`${API_BASE}/player/${CHESS_USERNAME}/stats`),
      ]);
      if (!profileRes.ok || !statsRes.ok) throw new Error();
      setProfile(await profileRes.json());
      setStats(await statsRes.json());
    } catch {
      setError(true);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const titleText = isLoading ? "Chess" : t("title");
  const viewAllText = isLoading ? "View full profile" : t("viewAll");
  const winsText = isLoading ? "W" : t("winsShort");
  const lossesText = isLoading ? "L" : t("lossesShort");
  const drawsText = isLoading ? "D" : t("drawsShort");
  const bestText = isLoading ? "Best" : t("best");

  const gameTypes: Array<{
    key: string;
    label: string;
    emoji: string;
    stats?: GameTypeStats;
  }> = [
    {
      key: "rapid",
      label: isLoading ? "Rapid" : t("rapid"),
      emoji: "⏱️",
      stats: stats?.chess_rapid,
    },
    {
      key: "blitz",
      label: isLoading ? "Blitz" : t("blitz"),
      emoji: "🔥",
      stats: stats?.chess_blitz,
    },
    {
      key: "bullet",
      label: isLoading ? "Bullet" : t("bullet"),
      emoji: "⚡",
      stats: stats?.chess_bullet,
    },
  ];

  const totalRecord = gameTypes.reduce(
    (acc, gt) => {
      if (gt.stats?.record) {
        acc.win += gt.stats.record.win;
        acc.loss += gt.stats.record.loss;
        acc.draw += gt.stats.record.draw;
      }
      return acc;
    },
    { win: 0, loss: 0, draw: 0 },
  );

  const totalGames = totalRecord.win + totalRecord.loss + totalRecord.draw;

  // Don't render if we have no data and errored
  if (error && !stats) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>{titleText}</h2>
          <Link href="/chess" className={styles.viewAllLink}>
            {viewAllText}
            <svg
              className={styles.arrowIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loadingData ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
          </div>
        ) : (
          <div className={styles.content}>
            {/* Profile row */}
            {profile && (
              <div className={styles.profileRow}>
                {profile.avatar ? (
                  <div className={styles.avatarWrapper}>
                    <Image
                      src={profile.avatar}
                      alt={profile.username}
                      width={48}
                      height={48}
                      className={styles.avatar}
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className={styles.avatarPlaceholder}>♟️</div>
                )}
                <div className={styles.profileInfo}>
                  <span className={styles.username}>{profile.username}</span>
                  {totalGames > 0 && (
                    <span className={styles.totalRecord}>
                      <span className={styles.recordWin}>
                        {totalRecord.win}
                        {winsText}
                      </span>
                      <span className={styles.recordLoss}>
                        {totalRecord.loss}
                        {lossesText}
                      </span>
                      <span className={styles.recordDraw}>
                        {totalRecord.draw}
                        {drawsText}
                      </span>
                    </span>
                  )}
                </div>
                {totalGames > 0 && (
                  <div className={styles.winRateBar}>
                    <div
                      className={styles.winSegment}
                      style={{
                        width: `${(totalRecord.win / totalGames) * 100}%`,
                      }}
                    />
                    <div
                      className={styles.drawSegment}
                      style={{
                        width: `${(totalRecord.draw / totalGames) * 100}%`,
                      }}
                    />
                    <div
                      className={styles.lossSegment}
                      style={{
                        width: `${(totalRecord.loss / totalGames) * 100}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Rating cards */}
            <div className={styles.ratingsGrid}>
              {gameTypes.map((gt) => {
                if (!gt.stats?.last) return null;
                return (
                  <div key={gt.key} className={styles.ratingCard}>
                    <div className={styles.ratingCardHeader}>
                      <span className={styles.ratingEmoji}>{gt.emoji}</span>
                      <span className={styles.ratingLabel}>{gt.label}</span>
                    </div>
                    <div className={styles.ratingValue}>
                      {gt.stats.last.rating.toLocaleString()}
                    </div>
                    {gt.stats.best && (
                      <div className={styles.ratingBest}>
                        {bestText}: {gt.stats.best.rating.toLocaleString()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default LatestChess;
