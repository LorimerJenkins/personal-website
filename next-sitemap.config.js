/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://lorimerjenkins.com",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 1,
  sitemapSize: 5000,
  exclude: ["/"],
  additionalPaths: async (config) => {
    const basePaths = [
      {
        loc: "/blogs",
        changefreq: "daily",
        priority: 0.9,
        lastmod: new Date().toISOString(),
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
    };
  },
};
