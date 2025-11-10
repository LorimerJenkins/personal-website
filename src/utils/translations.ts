export type SupportedLocale = "en" | "de" | "es" | "fr" | "ja" | "zh";

export interface Language {
  code: SupportedLocale;
  name: string;
  flag: string;
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸/🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
];

export const getLocaleFromStorage = (): SupportedLocale => {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem("locale") as SupportedLocale;
  return saved && languages.some((lang) => lang.code === saved) ? saved : "en";
};

export const setLocaleInStorage = (locale: SupportedLocale): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
    // Dispatch event to notify all components about the locale change
    window.dispatchEvent(
      new CustomEvent("localeChange", { detail: { locale } }),
    );
  }
};

export const loadMessages = async (
  locale: SupportedLocale,
): Promise<Record<string, any>> => {
  try {
    const messages = await import(`@/messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error);
    // Fallback to English
    const fallback = await import(`@/messages/en.json`);
    return fallback.default;
  }
};
