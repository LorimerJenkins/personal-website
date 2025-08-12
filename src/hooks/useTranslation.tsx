"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import {
  SupportedLocale,
  getLocaleFromStorage,
  setLocaleInStorage,
  loadMessages,
} from "@/utils/translations";

// Global locale state that all components will share
let globalLocale: SupportedLocale | null = null;
let localeListeners: Set<(locale: SupportedLocale) => void> = new Set();

const initializeGlobalLocale = () => {
  if (globalLocale === null && typeof window !== "undefined") {
    globalLocale = getLocaleFromStorage();
  }
  return globalLocale || "en";
};

const setGlobalLocale = (newLocale: SupportedLocale) => {
  globalLocale = newLocale;
  localeListeners.forEach((listener) => listener(newLocale));
};

export function useTranslation() {
  const [locale, setLocale] = useState<SupportedLocale>("en"); // Always start with 'en' for SSR
  const [isHydrated, setIsHydrated] = useState(false);
  const queryClient = useQueryClient();

  // Hydration effect
  useEffect(() => {
    const savedLocale = initializeGlobalLocale();
    setLocale(savedLocale);
    setIsHydrated(true);
  }, []);

  // Subscribe to global locale changes
  useEffect(() => {
    const listener = (newLocale: SupportedLocale) => {
      setLocale(newLocale);
    };

    localeListeners.add(listener);

    return () => {
      localeListeners.delete(listener);
    };
  }, []);

  // Query for messages
  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", locale],
    queryFn: () => loadMessages(locale),
    enabled: !!locale && isHydrated,
  });

  // Change language function
  const changeLanguage = useCallback(
    (newLocale: SupportedLocale) => {
      setLocaleInStorage(newLocale);
      setGlobalLocale(newLocale);

      // Prefetch the new messages
      queryClient.prefetchQuery({
        queryKey: ["messages", newLocale],
        queryFn: () => loadMessages(newLocale),
      });
    },
    [queryClient],
  );

  // Translation function
  const t = useCallback(
    (key: string, section?: string): string => {
      if (!messages) return key;

      try {
        if (section) {
          return messages[section]?.[key] || key;
        }

        // Try to find the key in any section
        for (const sectionKey of Object.keys(messages)) {
          if (messages[sectionKey]?.[key]) {
            return messages[sectionKey][key];
          }
        }

        return key;
      } catch (error) {
        return key;
      }
    },
    [messages],
  );

  // Section-specific translation function
  const tSection = useCallback(
    (section: string) => {
      return (key: string): string => t(key, section);
    },
    [t],
  );

  return {
    locale,
    messages,
    isLoading: isLoading || !isHydrated,
    changeLanguage,
    t,
    tSection,
  };
}
