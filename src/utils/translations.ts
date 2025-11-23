export type SupportedLocale =
  | "en"
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
  | "sw";

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
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇸🇬/🇲🇾" },
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "tl", name: "Tagalog", flag: "🇵🇭" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "pt", name: "Português", flag: "🇧🇷/🇵🇹" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "sw", name: "Kiswahili", flag: "🇰🇪/🇹🇿" },
];

export const getLocaleFromStorage = (): SupportedLocale => {
  if (typeof window === "undefined") return "en";

  const saved = localStorage.getItem("locale") as SupportedLocale;
  if (saved && languages.some((lang) => lang.code === saved)) {
    return saved;
  }

  const browserLocale = navigator.language.split("-")[0] as SupportedLocale;

  if (languages.some((lang) => lang.code === browserLocale)) {
    return browserLocale;
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
