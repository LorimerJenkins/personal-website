export type SupportedLocale =
  | "en"
  | "en-US"
  // Europe
  | "de"
  | "es"
  | "fr"
  | "it"
  | "nl"
  | "pl"
  | "pt"
  | "uk"
  | "ru"
  | "cs"
  | "ro"
  | "el"
  | "hu"
  | "sv"
  | "da"
  | "no"
  | "fi"
  | "tr"
  | "bg"
  | "hr"
  | "sr"
  | "sk"
  | "sl"
  | "lt"
  | "lv"
  | "et"
  | "ca"
  | "sq"
  | "mk"
  | "bs"
  | "be"
  | "is"
  | "ga"
  | "cy"
  | "mt"
  // Asia
  | "zh"
  | "zh-TW"
  | "ja"
  | "ko"
  | "hi"
  | "bn"
  | "ta"
  | "te"
  | "mr"
  | "gu"
  | "kn"
  | "ml"
  | "pa"
  | "or"
  | "as"
  | "ne"
  | "si"
  | "th"
  | "vi"
  | "id"
  | "ms"
  | "tl"
  | "my"
  | "km"
  | "lo"
  | "mn"
  | "ka"
  | "hy"
  | "az"
  | "uz"
  | "kk"
  | "ky"
  | "tg"
  | "tk"
  // Middle East
  | "ar"
  | "he"
  | "fa"
  | "ur"
  | "ku"
  | "ps"
  // Africa
  | "am"
  | "ha"
  | "sw"
  | "yo"
  | "ig"
  | "zu"
  | "xh"
  | "af"
  | "so"
  | "rw"
  | "mg"
  | "sn"
  // Americas
  | "pt-BR"
  | "es-MX";

export interface Language {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const languages: Language[] = [
  // ============ AMERICAS ============
  {
    code: "en-US",
    name: "English (US)",
    nativeName: "English (US)",
    flag: "🇺🇸",
    region: "Americas",
  },
  {
    code: "es-MX",
    name: "Spanish (Mexico)",
    nativeName: "Español (México)",
    flag: "🇲🇽",
    region: "Americas",
  },
  {
    code: "pt-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português (Brasil)",
    flag: "🇧🇷",
    region: "Americas",
  },

  // ============ EUROPE ============
  {
    code: "en",
    name: "English (UK)",
    nativeName: "English (UK)",
    flag: "🇬🇧",
    region: "Europe",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    region: "Europe",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    region: "Europe",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    region: "Europe",
  },
  {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    region: "Europe",
  },
  {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
    flag: "🇳🇱",
    region: "Europe",
  },
  {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
    flag: "🇵🇱",
    region: "Europe",
  },
  {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇵🇹",
    region: "Europe",
  },
  {
    code: "uk",
    name: "Ukrainian",
    nativeName: "Українська",
    flag: "🇺🇦",
    region: "Europe",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    region: "Europe",
  },
  {
    code: "cs",
    name: "Czech",
    nativeName: "Čeština",
    flag: "🇨🇿",
    region: "Europe",
  },
  {
    code: "ro",
    name: "Romanian",
    nativeName: "Română",
    flag: "🇷🇴",
    region: "Europe",
  },
  {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
    flag: "🇬🇷",
    region: "Europe",
  },
  {
    code: "hu",
    name: "Hungarian",
    nativeName: "Magyar",
    flag: "🇭🇺",
    region: "Europe",
  },
  {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
    flag: "🇸🇪",
    region: "Europe",
  },
  {
    code: "da",
    name: "Danish",
    nativeName: "Dansk",
    flag: "🇩🇰",
    region: "Europe",
  },
  {
    code: "no",
    name: "Norwegian",
    nativeName: "Norsk",
    flag: "🇳🇴",
    region: "Europe",
  },
  {
    code: "fi",
    name: "Finnish",
    nativeName: "Suomi",
    flag: "🇫🇮",
    region: "Europe",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    flag: "🇹🇷",
    region: "Europe",
  },
  {
    code: "bg",
    name: "Bulgarian",
    nativeName: "Български",
    flag: "🇧🇬",
    region: "Europe",
  },
  {
    code: "hr",
    name: "Croatian",
    nativeName: "Hrvatski",
    flag: "🇭🇷",
    region: "Europe",
  },
  {
    code: "sr",
    name: "Serbian",
    nativeName: "Српски",
    flag: "🇷🇸",
    region: "Europe",
  },
  {
    code: "sk",
    name: "Slovak",
    nativeName: "Slovenčina",
    flag: "🇸🇰",
    region: "Europe",
  },
  {
    code: "sl",
    name: "Slovenian",
    nativeName: "Slovenščina",
    flag: "🇸🇮",
    region: "Europe",
  },
  {
    code: "lt",
    name: "Lithuanian",
    nativeName: "Lietuvių",
    flag: "🇱🇹",
    region: "Europe",
  },
  {
    code: "lv",
    name: "Latvian",
    nativeName: "Latviešu",
    flag: "🇱🇻",
    region: "Europe",
  },
  {
    code: "et",
    name: "Estonian",
    nativeName: "Eesti",
    flag: "🇪🇪",
    region: "Europe",
  },
  {
    code: "ca",
    name: "Catalan",
    nativeName: "Català",
    flag: "🇪🇸",
    region: "Europe",
  },
  {
    code: "sq",
    name: "Albanian",
    nativeName: "Shqip",
    flag: "🇦🇱",
    region: "Europe",
  },
  {
    code: "mk",
    name: "Macedonian",
    nativeName: "Македонски",
    flag: "🇲🇰",
    region: "Europe",
  },
  {
    code: "bs",
    name: "Bosnian",
    nativeName: "Bosanski",
    flag: "🇧🇦",
    region: "Europe",
  },
  {
    code: "be",
    name: "Belarusian",
    nativeName: "Беларуская",
    flag: "🇧🇾",
    region: "Europe",
  },
  {
    code: "is",
    name: "Icelandic",
    nativeName: "Íslenska",
    flag: "🇮🇸",
    region: "Europe",
  },
  {
    code: "ga",
    name: "Irish",
    nativeName: "Gaeilge",
    flag: "🇮🇪",
    region: "Europe",
  },
  {
    code: "cy",
    name: "Welsh",
    nativeName: "Cymraeg",
    flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
    region: "Europe",
  },
  {
    code: "mt",
    name: "Maltese",
    nativeName: "Malti",
    flag: "🇲🇹",
    region: "Europe",
  },

  // ============ ASIA ============
  {
    code: "zh",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
    region: "Asia",
  },
  {
    code: "zh-TW",
    name: "Chinese (Traditional)",
    nativeName: "繁體中文",
    flag: "🇹🇼",
    region: "Asia",
  },
  {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    region: "Asia",
  },
  {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    region: "Asia",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇧🇩",
    region: "Asia",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    flag: "🇮🇳",
    region: "Asia",
  },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳", region: "Asia" },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
    flag: "🇮🇳",
    region: "Asia",
  },
  {
    code: "ne",
    name: "Nepali",
    nativeName: "नेपाली",
    flag: "🇳🇵",
    region: "Asia",
  },
  {
    code: "si",
    name: "Sinhala",
    nativeName: "සිංහල",
    flag: "🇱🇰",
    region: "Asia",
  },
  { code: "th", name: "Thai", nativeName: "ไทย", flag: "🇹🇭", region: "Asia" },
  {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
    flag: "🇻🇳",
    region: "Asia",
  },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
    region: "Asia",
  },
  {
    code: "ms",
    name: "Malay",
    nativeName: "Bahasa Melayu",
    flag: "🇲🇾",
    region: "Asia",
  },
  {
    code: "tl",
    name: "Filipino",
    nativeName: "Tagalog",
    flag: "🇵🇭",
    region: "Asia",
  },
  {
    code: "my",
    name: "Burmese",
    nativeName: "မြန်မာ",
    flag: "🇲🇲",
    region: "Asia",
  },
  {
    code: "km",
    name: "Khmer",
    nativeName: "ខ្មែរ",
    flag: "🇰🇭",
    region: "Asia",
  },
  { code: "lo", name: "Lao", nativeName: "ລາວ", flag: "🇱🇦", region: "Asia" },
  {
    code: "mn",
    name: "Mongolian",
    nativeName: "Монгол",
    flag: "🇲🇳",
    region: "Asia",
  },
  {
    code: "ka",
    name: "Georgian",
    nativeName: "ქართული",
    flag: "🇬🇪",
    region: "Asia",
  },
  {
    code: "hy",
    name: "Armenian",
    nativeName: "Հայերեն",
    flag: "🇦🇲",
    region: "Asia",
  },
  {
    code: "az",
    name: "Azerbaijani",
    nativeName: "Azərbaycan",
    flag: "🇦🇿",
    region: "Asia",
  },
  {
    code: "uz",
    name: "Uzbek",
    nativeName: "Oʻzbek",
    flag: "🇺🇿",
    region: "Asia",
  },
  {
    code: "kk",
    name: "Kazakh",
    nativeName: "Қазақ",
    flag: "🇰🇿",
    region: "Asia",
  },
  {
    code: "ky",
    name: "Kyrgyz",
    nativeName: "Кыргыз",
    flag: "🇰🇬",
    region: "Asia",
  },
  {
    code: "tg",
    name: "Tajik",
    nativeName: "Тоҷикӣ",
    flag: "🇹🇯",
    region: "Asia",
  },
  {
    code: "tk",
    name: "Turkmen",
    nativeName: "Türkmen",
    flag: "🇹🇲",
    region: "Asia",
  },

  // ============ MIDDLE EAST ============
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    region: "Middle East",
  },
  {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
    flag: "🇮🇱",
    region: "Middle East",
  },
  {
    code: "fa",
    name: "Persian",
    nativeName: "فارسی",
    flag: "🇮🇷",
    region: "Middle East",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    region: "Middle East",
  },
  {
    code: "ku",
    name: "Kurdish",
    nativeName: "Kurdî",
    flag: "🇮🇶",
    region: "Middle East",
  },
  {
    code: "ps",
    name: "Pashto",
    nativeName: "پښتو",
    flag: "🇦🇫",
    region: "Middle East",
  },

  // ============ AFRICA ============
  {
    code: "am",
    name: "Amharic",
    nativeName: "አማርኛ",
    flag: "🇪🇹",
    region: "Africa",
  },
  {
    code: "ha",
    name: "Hausa",
    nativeName: "Hausa",
    flag: "🇳🇬",
    region: "Africa",
  },
  {
    code: "sw",
    name: "Swahili",
    nativeName: "Kiswahili",
    flag: "🇰🇪",
    region: "Africa",
  },
  {
    code: "yo",
    name: "Yoruba",
    nativeName: "Yorùbá",
    flag: "🇳🇬",
    region: "Africa",
  },
  {
    code: "ig",
    name: "Igbo",
    nativeName: "Igbo",
    flag: "🇳🇬",
    region: "Africa",
  },
  {
    code: "zu",
    name: "Zulu",
    nativeName: "isiZulu",
    flag: "🇿🇦",
    region: "Africa",
  },
  {
    code: "xh",
    name: "Xhosa",
    nativeName: "isiXhosa",
    flag: "🇿🇦",
    region: "Africa",
  },
  {
    code: "af",
    name: "Afrikaans",
    nativeName: "Afrikaans",
    flag: "🇿🇦",
    region: "Africa",
  },
  {
    code: "so",
    name: "Somali",
    nativeName: "Soomaali",
    flag: "🇸🇴",
    region: "Africa",
  },
  {
    code: "rw",
    name: "Kinyarwanda",
    nativeName: "Kinyarwanda",
    flag: "🇷🇼",
    region: "Africa",
  },
  {
    code: "mg",
    name: "Malagasy",
    nativeName: "Malagasy",
    flag: "🇲🇬",
    region: "Africa",
  },
  {
    code: "sn",
    name: "Shona",
    nativeName: "chiShona",
    flag: "🇿🇼",
    region: "Africa",
  },
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

export const rtlLocales: SupportedLocale[] = [
  "ar",
  "he",
  "fa",
  "ur",
  "ku",
  "ps",
];

export const isRTL = (locale: SupportedLocale): boolean => {
  return rtlLocales.includes(locale);
};

export const getLocaleFromStorage = (): SupportedLocale => {
  if (typeof window === "undefined") return "en";

  // Check URL param first (for shared links like ?lang=de)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang") as SupportedLocale;
  if (langParam && languages.some((lang) => lang.code === langParam)) {
    localStorage.setItem("locale", langParam);
    return langParam;
  }

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

    // Clear ?lang= param from URL if present
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.delete("lang");
      window.history.replaceState({}, "", url.toString());
    }

    window.dispatchEvent(
      new CustomEvent("localeChange", { detail: { locale } }),
    );
  }
};

export const loadMessages = async (
  locale: SupportedLocale,
): Promise<Record<string, any>> => {
  try {
    const messages = await import(`@/locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.error(`Failed to load messages for ${locale}:`, error);
    const fallback = await import(`@/en.json`);
    return fallback.default;
  }
};
