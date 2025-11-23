export type SupportedLocale =
  | "en"
  | "en-US"
  | "de"
  | "es"
  | "fr"
  | "ja"
  | "zh"
  | "ar"
  | "tr"
  | "id"
  | "vi"
  | "am"
  | "uk"
  | "ru"
  | "bn"
  | "ms"
  | "hu"
  | "tl"
  | "ha"
  | "pt"
  | "hi"
  | "ko"
  | "it"
  | "nl"
  | "pl"
  | "th"
  | "sw"
  | "cs"
  | "ro"
  | "el"
  | "he"
  | "sv"
  | "da"
  | "no"
  | "fi"
  | "ta"
  | "te"
  | "mr"
  | "ur"
  | "fa"
  | "my";

export interface Language {
  code: SupportedLocale;
  name: string;
  flag: string;
  region: string;
}

export const languages: Language[] = [
  // Americas
  { code: "en-US", name: "English (US)", flag: "🇺🇸", region: "Americas" },

  // Europe
  { code: "en", name: "English (UK)", flag: "🇬🇧", region: "Europe" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", region: "Europe" },
  { code: "es", name: "Español", flag: "🇪🇸", region: "Europe" },
  { code: "fr", name: "Français", flag: "🇫🇷", region: "Europe" },
  { code: "it", name: "Italiano", flag: "🇮🇹", region: "Europe" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱", region: "Europe" },
  { code: "pl", name: "Polski", flag: "🇵🇱", region: "Europe" },
  { code: "pt", name: "Português", flag: "🇵🇹", region: "Europe" },
  { code: "uk", name: "Українська", flag: "🇺🇦", region: "Europe" },
  { code: "ru", name: "Русский", flag: "🇷🇺", region: "Europe" },
  { code: "cs", name: "Čeština", flag: "🇨🇿", region: "Europe" },
  { code: "ro", name: "Română", flag: "🇷🇴", region: "Europe" },
  { code: "el", name: "Ελληνικά", flag: "🇬🇷", region: "Europe" },
  { code: "hu", name: "Magyar", flag: "🇭🇺", region: "Europe" },
  { code: "sv", name: "Svenska", flag: "🇸🇪", region: "Europe" },
  { code: "da", name: "Dansk", flag: "🇩🇰", region: "Europe" },
  { code: "no", name: "Norsk", flag: "🇳🇴", region: "Europe" },
  { code: "fi", name: "Suomi", flag: "🇫🇮", region: "Europe" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", region: "Europe" },

  // Asia
  { code: "zh", name: "中文", flag: "🇨🇳", region: "Asia" },
  { code: "ja", name: "日本語", flag: "🇯🇵", region: "Asia" },
  { code: "ko", name: "한국어", flag: "🇰🇷", region: "Asia" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳", region: "Asia" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩", region: "Asia" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳", region: "Asia" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳", region: "Asia" },
  { code: "mr", name: "मराठी", flag: "🇮🇳", region: "Asia" },
  { code: "ur", name: "اردو", flag: "🇵🇰", region: "Asia" },
  { code: "th", name: "ไทย", flag: "🇹🇭", region: "Asia" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳", region: "Asia" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩", region: "Asia" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾", region: "Asia" },
  { code: "tl", name: "Tagalog", flag: "🇵🇭", region: "Asia" },
  { code: "my", name: "မြန်မာ", flag: "🇲🇲", region: "Asia" },

  // Middle East
  { code: "ar", name: "العربية", flag: "🇸🇦", region: "Middle East" },
  { code: "he", name: "עברית", flag: "🇮🇱", region: "Middle East" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", region: "Middle East" },

  // Africa
  { code: "am", name: "አማርኛ", flag: "🇪🇹", region: "Africa" },
  { code: "ha", name: "Hausa", flag: "🇳🇬", region: "Africa" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪", region: "Africa" },
];

export const languagesByRegion = languages.reduce(
  (acc, lang) => {
    if (!acc[lang.region]) {
      acc[lang.region] = [];
    }
    acc[lang.region].push(lang);
    return acc;
  },
  {} as Record<string, Language[]>,
);

export const regions = ["Americas", "Europe", "Asia", "Middle East", "Africa"];

export const getLocaleFromStorage = (): SupportedLocale => {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem("locale") as SupportedLocale;
  if (saved && languages.some((lang) => lang.code === saved)) {
    return saved;
  }

  // Handle browser locales like "en-US", "en-GB", etc.
  const browserLocale = navigator.language;
  const browserLocaleShort = browserLocale.split("-")[0] as SupportedLocale;

  // First try exact match (e.g., "en-US")
  if (languages.some((lang) => lang.code === browserLocale)) {
    return browserLocale as SupportedLocale;
  }

  // Then try short code (e.g., "en")
  if (languages.some((lang) => lang.code === browserLocaleShort)) {
    return browserLocaleShort;
  }

  return "en";
};

export const setLocaleInStorage = (locale: SupportedLocale): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
    window.dispatchEvent(
      new CustomEvent("localeChange", { detail: { locale } }),
    );
  }
};

export const loadMessages = async (
  locale: SupportedLocale,
): Promise<Record<string, any>> => {
  try {
    const messages = await import(`@/text/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error);
    const fallback = await import(`@/text/en.json`);
    return fallback.default;
  }
};
