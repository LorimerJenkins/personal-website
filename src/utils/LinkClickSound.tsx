"use client";

import { useEffect, useRef } from "react";

interface LinkClickSoundProps {
  src?: string;
  /** Volume from 0 to 1 */
  volume?: number;
}

export default function LinkClickSound({
  src = "/sounds/click.mp3",
  volume = 0.5,
}: LinkClickSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;
  }, [src, volume]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const match = target.closest("a, button");
      if (!match) return;

      const audio = audioRef.current;
      if (!audio) return;

      // Reset and play (allows rapid repeated clicks)
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Browser may block autoplay until first user interaction — safe to ignore
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
