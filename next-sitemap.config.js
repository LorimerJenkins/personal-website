/** @type {import('next-sitemap').IConfig} */

const languages = [
  // Americas
  "en",
  "en-US",
  "es-MX",
  "pt-BR",

  // Europe
  "de",
  "es",
  "fr",
  "it",
  "nl",
  "pl",
  "pt",
  "uk",
  "ru",
  "cs",
  "ro",
  "el",
  "hu",
  "sv",
  "da",
  "no",
  "fi",
  "tr",
  "bg",
  "hr",
  "sr",
  "sk",
  "sl",
  "lt",
  "lv",
  "et",
  "ca",
  "sq",
  "mk",
  "bs",
  "be",
  "is",
  "ga",
  "cy",
  "mt",

  // Asia - East
  "zh",
  "zh-TW",
  "ja",
  "ko",

  // Asia - South
  "hi",
  "bn",
  "ta",
  "te",
  "mr",
  "gu",
  "kn",
  "ml",
  "pa",
  "or",
  "as",
  "ne",
  "si",

  // Asia - Southeast
  "th",
  "vi",
  "id",
  "ms",
  "tl",
  "my",
  "km",
  "lo",

  // Asia - Central & Caucasus
  "mn",
  "ka",
  "hy",
  "az",
  "uz",
  "kk",
  "ky",
  "tg",
  "tk",

  // Middle East
  "ar",
  "he",
  "fa",
  "ur",
  "ku",
  "ps",

  // Africa
  "am",
  "ha",
  "sw",
  "yo",
  "ig",
  "zu",
  "xh",
  "af",
  "so",
  "rw",
  "mg",
  "sn",
];

const siteUrl = "https://lorimerjenkins.com";

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 1,
  sitemapSize: 5000,
  exclude: ["/"],
  additionalPaths: async (config) => {
    const basePaths = [
      {
        loc: "/writing",
        changefreq: "daily",
        priority: 0.9,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/writing?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/projects",
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/projects?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/bookshelf",
        changefreq: "daily",
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/bookshelf?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/angel",
        changefreq: "daily",
        priority: 0.6,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/angel?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/films",
        changefreq: "daily",
        priority: 0.5,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/films?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/travel",
        changefreq: "daily",
        priority: 0.4,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/travel?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/terms",
        changefreq: "daily",
        priority: 0.3,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/terms?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/privacy",
        changefreq: "daily",
        priority: 0.2,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/privacy?lang=${lang}`,
          hreflang: lang,
        })),
      },
      {
        loc: "/disclosures",
        changefreq: "daily",
        priority: 0.1,
        lastmod: new Date().toISOString(),
        alternateRefs: languages.map((lang) => ({
          href: `${siteUrl}/disclosures?lang=${lang}`,
          hreflang: lang,
        })),
      },
    ];
    return [...basePaths];
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: languages.map((lang) => ({
        href: `${siteUrl}${path}?lang=${lang}`,
        hreflang: lang,
      })),
    };
  },
};
