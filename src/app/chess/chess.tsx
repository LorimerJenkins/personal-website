"use client";
import styles from "./chess.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const CHESS_USERNAME = "CoolLori";
const API_BASE = "https://api.chess.com/pub";

// ── Types ──────────────────────────────────────────────

interface PlayerProfile {
  username: string;
  player_id: number;
  url: string;
  avatar?: string;
  name?: string;
  title?: string;
  status: string;
  country: string;
  location?: string;
  joined: number;
  last_online: number;
  followers: number;
  is_streamer: boolean;
  fide?: number;
}

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

interface TacticsStats {
  highest?: { rating: number; date: number };
  lowest?: { rating: number; date: number };
}

interface PuzzleRushStats {
  best?: { total_attempts: number; score: number };
  daily?: { total_attempts: number; score: number };
}

interface PlayerStats {
  chess_daily?: GameTypeStats;
  chess_rapid?: GameTypeStats;
  chess_blitz?: GameTypeStats;
  chess_bullet?: GameTypeStats;
  chess960_daily?: GameTypeStats;
  tactics?: TacticsStats;
  puzzle_rush?: PuzzleRushStats;
  lessons?: TacticsStats;
  fide?: number;
}

interface GamePlayer {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
}

interface GameData {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  accuracies?: { white: number; black: number };
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: GamePlayer;
  black: GamePlayer;
}

// ── Helpers ──────────────────────────────────────────────

function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(ts: number): string {
  const now = Date.now() / 1000;
  const diff = now - ts;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatTimestamp(ts);
}

function fmt(n: number): string {
  return n.toLocaleString();
}

function getResultForUser(
  game: GameData,
  username: string,
): "win" | "loss" | "draw" {
  const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
  const result = isWhite ? game.white.result : game.black.result;
  if (result === "win") return "win";
  if (
    ["checkmated", "timeout", "resigned", "abandoned", "lose"].includes(result)
  )
    return "loss";
  return "draw";
}

function getResultLabel(result: string): string {
  const map: Record<string, string> = {
    win: "Checkmate",
    checkmated: "Checkmated",
    timeout: "Timeout",
    resigned: "Resigned",
    abandoned: "Abandoned",
    stalemate: "Stalemate",
    insufficient: "Insufficient Material",
    "50move": "50 Move Rule",
    agreed: "Draw Agreed",
    repetition: "Repetition",
    timevsinsufficient: "Time vs Insufficient",
    lose: "Lost",
  };
  return map[result] || result;
}

function getTimeControlLabel(tc: string): string {
  const map: Record<string, string> = {
    bullet: "Bullet",
    blitz: "Blitz",
    rapid: "Rapid",
    daily: "Daily",
  };
  return map[tc] || tc;
}

function getTimeControlEmoji(tc: string): string {
  const map: Record<string, string> = {
    bullet: "⚡",
    blitz: "🔥",
    rapid: "⏱️",
    daily: "📅",
  };
  return map[tc] || "♟️";
}

// ── Component ──────────────────────────────────────────────

function Chess() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("ChessPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [recentGames, setRecentGames] = useState<GameData[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gameFilter, setGameFilter] = useState<string>("all");

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
    setError(null);
    try {
      const [profileRes, statsRes, archivesRes] = await Promise.all([
        fetch(`${API_BASE}/player/${CHESS_USERNAME}`),
        fetch(`${API_BASE}/player/${CHESS_USERNAME}/stats`),
        fetch(`${API_BASE}/player/${CHESS_USERNAME}/games/archives`),
      ]);

      if (!profileRes.ok || !statsRes.ok)
        throw new Error("Failed to load Chess.com data");

      const profileData: PlayerProfile = await profileRes.json();
      const statsData: PlayerStats = await statsRes.json();
      setProfile(profileData);
      setStats(statsData);

      if (archivesRes.ok) {
        const archivesData: { archives: string[] } = await archivesRes.json();
        if (archivesData.archives.length > 0) {
          const recentArchives = archivesData.archives.slice(-2);
          const gameResponses = await Promise.all(
            recentArchives.map((url) => fetch(url)),
          );
          const allGames: GameData[] = [];
          for (const res of gameResponses) {
            if (res.ok) {
              const data: { games: GameData[] } = await res.json();
              allGames.push(...data.games);
            }
          }
          allGames.sort((a, b) => b.end_time - a.end_time);
          setRecentGames(allGames.slice(0, 50));
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const titleText = isLoading ? "Chess" : t("title");
  const subtitleText = isLoading
    ? "My Chess.com profile & game history"
    : t("subtitle");
  const recentGamesText = isLoading ? "Recent Games" : t("recentGames");
  const gamesPlayedText = isLoading ? "Games" : t("gamesPlayed");
  const winsText = isLoading ? "Wins" : t("wins");
  const lossesText = isLoading ? "Losses" : t("losses");
  const drawsText = isLoading ? "Draws" : t("draws");
  const bestText = isLoading ? "Best" : t("best");
  const joinedText = isLoading ? "Joined" : t("joined");
  const lastOnlineText = isLoading ? "Last Online" : t("lastOnline");
  const followersText = isLoading ? "Followers" : t("followers");
  const viewOnChessComText = isLoading
    ? "View on Chess.com →"
    : t("viewOnChessCom");
  const noGamesText = isLoading ? "No recent games found." : t("noGames");
  const allText = isLoading ? "All" : t("all");
  const rapidText = isLoading ? "Rapid" : t("rapid");
  const blitzText = isLoading ? "Blitz" : t("blitz");
  const bulletText = isLoading ? "Bullet" : t("bullet");
  const dailyText = isLoading ? "Daily" : t("daily");
  const tacticsText = isLoading ? "Tactics" : t("tactics");
  const puzzleRushText = isLoading ? "Puzzle Rush" : t("puzzleRush");
  const winRateText = isLoading ? "Win Rate" : t("winRate");
  const errorText = isLoading ? "Could not load data" : t("error");
  const retryText = isLoading ? "Retry" : t("retry");
  const loadingApiText = isLoading
    ? "Fetching Chess.com data..."
    : t("loadingApi");
  const highestText = isLoading ? "Highest" : t("highest");

  const gameTypes: Array<{
    key: string;
    label: string;
    emoji: string;
    stats?: GameTypeStats;
  }> = [
    { key: "rapid", label: rapidText, emoji: "⏱️", stats: stats?.chess_rapid },
    { key: "blitz", label: blitzText, emoji: "🔥", stats: stats?.chess_blitz },
    {
      key: "bullet",
      label: bulletText,
      emoji: "⚡",
      stats: stats?.chess_bullet,
    },
    { key: "daily", label: dailyText, emoji: "📅", stats: stats?.chess_daily },
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
  const winRate =
    totalGames > 0 ? ((totalRecord.win / totalGames) * 100).toFixed(1) : "0";

  const filteredGames = recentGames.filter((game) => {
    if (gameFilter === "all") return true;
    return game.time_class === gameFilter;
  });

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <div className={styles.header}>
          <h1 className={styles.title}>{titleText}</h1>
          <p className={styles.subtitle}>{subtitleText}</p>
        </div>

        {loadingData && (
          <div className={styles.loadingState}>
            <div className={styles.spinner} />
            <p>{loadingApiText}</p>
          </div>
        )}

        {error && (
          <div className={styles.errorState}>
            <p>{errorText}</p>
            <p className={styles.errorDetail}>{error}</p>
            <button className={styles.retryButton} onClick={fetchData}>
              {retryText}
            </button>
          </div>
        )}

        {!loadingData && !error && profile && stats && (
          <>
            {/* ── Profile Hero ── */}
            <div className={styles.profileHero}>
              <div className={styles.profileAvatarSide}>
                {profile.avatar ? (
                  <div className={styles.avatarWrapper}>
                    <Image
                      src={profile.avatar}
                      alt={profile.username}
                      width={200}
                      height={200}
                      className={styles.avatar}
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className={styles.avatarPlaceholder}>♟️</div>
                )}
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.profileLink}
                >
                  {viewOnChessComText}
                </a>
              </div>

              <div className={styles.profileStatsSide}>
                <div className={styles.profileInfoBlock}>
                  <div className={styles.usernameRow}>
                    <span className={styles.username}>{profile.username}</span>
                    {profile.title && (
                      <span className={styles.titleBadge}>{profile.title}</span>
                    )}
                    <span
                      className={`${styles.statusDot} ${profile.status === "premium" ? styles.statusPremium : styles.statusBasic}`}
                    />
                  </div>
                  <div className={styles.profileMeta}>
                    <span>
                      {joinedText} {formatTimestamp(profile.joined)}
                    </span>
                    <span className={styles.metaDot}>·</span>
                    <span>
                      {lastOnlineText} {timeAgo(profile.last_online)}
                    </span>
                    <span className={styles.metaDot}>·</span>
                    <span>
                      {fmt(profile.followers)} {followersText}
                    </span>
                  </div>
                </div>

                <div className={styles.miniStatsGrid}>
                  <div className={styles.miniStatCard}>
                    <span className={styles.miniStatValue}>
                      {fmt(totalGames)}
                    </span>
                    <span className={styles.miniStatLabel}>
                      {gamesPlayedText}
                    </span>
                  </div>
                  <div className={styles.miniStatCard}>
                    <span
                      className={`${styles.miniStatValue} ${styles.winColor}`}
                    >
                      {fmt(totalRecord.win)}
                    </span>
                    <span className={styles.miniStatLabel}>{winsText}</span>
                  </div>
                  <div className={styles.miniStatCard}>
                    <span
                      className={`${styles.miniStatValue} ${styles.lossColor}`}
                    >
                      {fmt(totalRecord.loss)}
                    </span>
                    <span className={styles.miniStatLabel}>{lossesText}</span>
                  </div>
                  <div className={styles.miniStatCard}>
                    <span
                      className={`${styles.miniStatValue} ${styles.drawColor}`}
                    >
                      {fmt(totalRecord.draw)}
                    </span>
                    <span className={styles.miniStatLabel}>{drawsText}</span>
                  </div>
                </div>

                {totalGames > 0 && (
                  <div className={styles.winRateInline}>
                    <div className={styles.winRateHeader}>
                      <span className={styles.winRateLabel}>{winRateText}</span>
                      <span className={styles.winRateValue}>{winRate}%</span>
                    </div>
                    <div className={styles.winRateBar}>
                      <div
                        className={styles.winRateSegmentWin}
                        style={{
                          width: `${(totalRecord.win / totalGames) * 100}%`,
                        }}
                      />
                      <div
                        className={styles.winRateSegmentDraw}
                        style={{
                          width: `${(totalRecord.draw / totalGames) * 100}%`,
                        }}
                      />
                      <div
                        className={styles.winRateSegmentLoss}
                        style={{
                          width: `${(totalRecord.loss / totalGames) * 100}%`,
                        }}
                      />
                    </div>
                    <div className={styles.winRateLegend}>
                      <span className={styles.legendItem}>
                        <span
                          className={`${styles.legendDot} ${styles.winDot}`}
                        />
                        {winsText}
                      </span>
                      <span className={styles.legendItem}>
                        <span
                          className={`${styles.legendDot} ${styles.drawDot}`}
                        />
                        {drawsText}
                      </span>
                      <span className={styles.legendItem}>
                        <span
                          className={`${styles.legendDot} ${styles.lossDot}`}
                        />
                        {lossesText}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* ── Ratings ── */}
            <div className={styles.ratingsGrid}>
              {gameTypes.map((gt) => {
                if (!gt.stats?.last) return null;
                const record = gt.stats.record;
                const gtTotal = record
                  ? record.win + record.loss + record.draw
                  : 0;
                const gtWinRate =
                  gtTotal > 0
                    ? ((record!.win / gtTotal) * 100).toFixed(0)
                    : "0";
                return (
                  <div key={gt.key} className={styles.ratingCard}>
                    <div className={styles.ratingCardHeader}>
                      <span className={styles.ratingCardEmoji}>{gt.emoji}</span>
                      <span className={styles.ratingCardLabel}>{gt.label}</span>
                    </div>
                    <div className={styles.ratingCardRating}>
                      {fmt(gt.stats.last.rating)}
                    </div>
                    {gt.stats.best && (
                      <div className={styles.ratingCardBest}>
                        {bestText}: {fmt(gt.stats.best.rating)}
                      </div>
                    )}
                    {record && (
                      <div className={styles.ratingCardRecord}>
                        <span className={styles.recordWin}>
                          {fmt(record.win)}W
                        </span>
                        <span className={styles.recordLoss}>
                          {fmt(record.loss)}L
                        </span>
                        <span className={styles.recordDraw}>
                          {fmt(record.draw)}D
                        </span>
                      </div>
                    )}
                    {gtTotal > 0 && (
                      <div className={styles.miniWinBar}>
                        <div
                          className={styles.miniWinFill}
                          style={{ width: `${gtWinRate}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Tactics & Puzzle Rush ── */}
            {(stats.tactics?.highest || stats.puzzle_rush?.best) && (
              <div className={styles.extrasGrid}>
                {stats.tactics?.highest && (
                  <div className={styles.extraCard}>
                    <span className={styles.extraEmoji}>🧩</span>
                    <div className={styles.extraInfo}>
                      <span className={styles.extraLabel}>{tacticsText}</span>
                      <span className={styles.extraValue}>
                        {highestText}: {fmt(stats.tactics.highest.rating)}
                      </span>
                    </div>
                  </div>
                )}
                {stats.puzzle_rush?.best && (
                  <div className={styles.extraCard}>
                    <span className={styles.extraEmoji}>🏃</span>
                    <div className={styles.extraInfo}>
                      <span className={styles.extraLabel}>
                        {puzzleRushText}
                      </span>
                      <span className={styles.extraValue}>
                        {bestText}: {fmt(stats.puzzle_rush.best.score)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Recent Games ── */}
            <div className={styles.gamesSection}>
              <div className={styles.gamesSectionHeader}>
                <h2 className={styles.sectionTitle}>{recentGamesText}</h2>
                <div className={styles.gameFilters}>
                  {[
                    { key: "all", label: allText },
                    { key: "rapid", label: `⏱️ ${rapidText}` },
                    { key: "blitz", label: `🔥 ${blitzText}` },
                    { key: "bullet", label: `⚡ ${bulletText}` },
                    { key: "daily", label: `📅 ${dailyText}` },
                  ].map((f) => (
                    <button
                      key={f.key}
                      className={`${styles.filterButton} ${gameFilter === f.key ? styles.active : ""}`}
                      onClick={() => setGameFilter(f.key)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className={styles.gamesList}>
                  {filteredGames.map((game) => {
                    const result = getResultForUser(game, CHESS_USERNAME);
                    const isWhite =
                      game.white.username.toLowerCase() ===
                      CHESS_USERNAME.toLowerCase();
                    const userPlayer = isWhite ? game.white : game.black;
                    const opponent = isWhite ? game.black : game.white;
                    const userResult = isWhite
                      ? game.white.result
                      : game.black.result;
                    const accuracy = game.accuracies
                      ? isWhite
                        ? game.accuracies.white
                        : game.accuracies.black
                      : null;

                    return (
                      <a
                        key={game.uuid}
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.gameCard}
                      >
                        <div
                          className={`${styles.resultStripe} ${result === "win" ? styles.stripeWin : result === "loss" ? styles.stripeLoss : styles.stripeDraw}`}
                        />
                        <div className={styles.gameContent}>
                          <div className={styles.gameTopRow}>
                            <div className={styles.gameOpponent}>
                              <span className={styles.gameColor}>
                                {isWhite ? "⬜" : "⬛"}
                              </span>
                              <span className={styles.opponentName}>
                                vs {opponent.username}
                              </span>
                              <span className={styles.opponentRating}>
                                ({fmt(opponent.rating)})
                              </span>
                            </div>
                            <div
                              className={`${styles.resultBadge} ${result === "win" ? styles.resultWin : result === "loss" ? styles.resultLoss : styles.resultDraw}`}
                            >
                              {result === "win"
                                ? "WIN"
                                : result === "loss"
                                  ? "LOSS"
                                  : "DRAW"}
                            </div>
                          </div>
                          <div className={styles.gameBottomRow}>
                            <span className={styles.gameTimeControl}>
                              {getTimeControlEmoji(game.time_class)}{" "}
                              {getTimeControlLabel(game.time_class)}
                            </span>
                            <span className={styles.gameResultDetail}>
                              {getResultLabel(userResult)}
                            </span>
                            {accuracy !== null && (
                              <span className={styles.gameAccuracy}>
                                🎯 {accuracy.toFixed(1)}%
                              </span>
                            )}
                            <span className={styles.gameRating}>
                              {fmt(userPlayer.rating)}
                            </span>
                            <span className={styles.gameDate}>
                              {timeAgo(game.end_time)}
                            </span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              ) : (
                <p className={styles.noGames}>{noGamesText}</p>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Chess;
