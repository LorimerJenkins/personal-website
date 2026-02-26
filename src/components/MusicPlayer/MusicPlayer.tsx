"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./MusicPlayer.module.css";

interface Track {
  file: string;
  title: string;
  artist: string;
  cover?: string;
}

export default function MusicPlayer() {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlist[currentIndex] ?? null;

  // Fetch playlist
  useEffect(() => {
    async function loadPlaylist() {
      try {
        const res = await fetch("/music/playlist.json");
        if (!res.ok) return;
        const data: Track[] = await res.json();
        if (data.length > 0) {
          setPlaylist(data);
          setIsLoaded(true);
          // Stagger the entrance animation
          setTimeout(() => setIsVisible(true), 400);
        }
      } catch {
        // Silently fail — player won't show
      }
    }
    loadPlaylist();
  }, []);

  // Setup audio element
  useEffect(() => {
    if (!currentTrack) return;

    const audio = audioRef.current;
    if (!audio) {
      audioRef.current = new Audio(`/music/${currentTrack.file}`);
      audioRef.current.volume = 0.5;
    } else {
      audio.src = `/music/${currentTrack.file}`;
      audio.load();
    }

    const a = audioRef.current!;

    const onEnded = () => {
      // Auto-advance to next track
      setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };

    a.addEventListener("ended", onEnded);
    return () => {
      a.removeEventListener("ended", onEnded);
    };
  }, [currentTrack, playlist.length]);

  // Handle play state changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // When track changes, auto-play if was already playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || !isPlaying) return;

    audio.play().catch(() => setIsPlaying(false));
  }, [currentIndex]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const prevTrack = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  }, [playlist.length]);

  if (!isLoaded || !currentTrack) return null;

  const coverSrc = currentTrack.cover
    ? `/music/${currentTrack.cover}`
    : "/music/default-cover.jpg";

  return (
    <div
      className={`${styles.playerWrapper} ${isVisible ? styles.playerVisible : ""}`}
    >
      {/* Ambient glow behind the player */}
      <div className={styles.ambientGlow} />

      <div className={styles.player}>
        {/* Album Art */}
        <div className={styles.coverWrapper}>
          <div
            className={`${styles.coverDisc} ${isPlaying ? styles.spinning : ""}`}
          >
            <img
              src={coverSrc}
              alt={currentTrack.title}
              className={styles.coverImage}
              draggable={false}
            />
            <div className={styles.discHole} />
          </div>
        </div>

        {/* Track Info */}
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{currentTrack.title}</div>
          <div className={styles.trackArtist}>{currentTrack.artist}</div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.controlBtn}
            onClick={prevTrack}
            aria-label="Previous track"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          <button
            className={styles.playPauseBtn}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            className={styles.controlBtn}
            onClick={nextTrack}
            aria-label="Next track"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        {/* Visualizer bars (decorative) */}
        <div
          className={`${styles.visualizer} ${isPlaying ? styles.visualizerActive : ""}`}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
      </div>
    </div>
  );
}
