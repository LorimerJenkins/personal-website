/** @type {import('next-sitemap').IConfig} */

const languages = [
  "en",
  "en-US",
  "de",
  "es",
  "fr",
  "ja",
  "zh",
  "ar",
  "tr",
  "id",
  "vi",
  "am",
  "uk",
  "ru",
  "bn",
  "ms",
  "hu",
  "tl",
  "ha",
  "pt",
  "hi",
  "ko",
  "it",
  "nl",
  "pl",
  "th",
  "sw",
  "cs",
  "ro",
  "el",
  "he",
  "sv",
  "da",
  "no",
  "fi",
  "ta",
  "te",
  "mr",
  "ur",
  "fa",
  "my",
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
