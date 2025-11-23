import { keyWords } from "./keywords";
import { Metadata } from "next";

// global SEO vars
export const SEO = {
  name: "Lorimer Jenkins",
  url: "https://lorimerjenkins.com",
  description: `Lorimer Jenkins is a tech entrepreneur from the UK, building LiquidOps a decentralized lending and borrowing protocol built in the Arweave and AO Web3 ecosystem.`,
  keyWords,
  icons: {
    icon: [
      {
        url: "https://lorimerjenkins.com/favicon.jpg",
        type: "image/jpeg",
        sizes: "any",
      },
    ],
  },
  shareImagePath: "https://lorimerjenkins.com/favicon.jpg",
  author: "Lorimer Jenkins",
  locale: "en_US",
  category: "Technology",
  classification: "Tech Entrepreneur, Web3, DeFi",
  // 15 high domain ranking links where you are mentioned
  sameAs: [
    // social media
    "https://x.com/Lorimer_Jenkins",
    "https://www.linkedin.com/in/lorimerjenkins",
    "https://www.instagram.com/lorimer_jenkins",
    "https://www.facebook.com/profile.php?id=61554337266727",
    "https://www.tiktok.com/@lorimer__jenkins",
    "https://www.reddit.com/user/lorimer_jenkins",
    "https://www.youtube.com/@lorimerjenkins6265",
    "https://github.com/LorimerJenkins",

    // press
    "https://venturebeat.com/business/unlocking-the-future-of-decentralized-finance-lorimer-jenkins-journey-in-building-defi-and-web3/",
    "https://www.ibtimes.co.uk/revolutionizing-defi-how-lorimer-jenkins-marton-lederer-are-transforming-arweave-liquidops-1729945",
    "https://medium.com/@perma_dao/devs-partner-to-build-arweaves-first-lending-protocol-built-with-ao-92abb69c9829",

    // random
    "https://theorg.com/org/liquidops/org-chart/lorimer-jenkins",
    "https://www.crunchbase.com/person/lorimer-jenkins",
    "https://www.imdb.com/name/nm17583255/",
    "https://medium.com/@lorimerjenkins",
  ],
};

export const metadata: Metadata = {
  title: {
    default: SEO.name,
    template: `%s | ${SEO.name}`,
  },
  description: SEO.description,
  keywords: SEO.keyWords,
  authors: [{ name: SEO.author, url: SEO.url }],
  creator: SEO.author,
  publisher: SEO.author,
  category: SEO.category,
  classification: SEO.classification,
  icons: SEO.icons,

  openGraph: {
    title: SEO.name,
    description: SEO.description,
    url: SEO.url,
    siteName: SEO.name,
    images: [
      {
        url: SEO.shareImagePath,
        width: 1200,
        height: 630,
        alt: `${SEO.name} - Tech Entrepreneur & Web3 Builder`,
      },
    ],
    locale: SEO.locale,
    type: "profile",
    countryName: "United Kingdom",
    alternateLocale: ["en_GB"],
  },

  twitter: {
    card: "summary_large_image",
    title: SEO.name,
    description: SEO.description,
    images: [SEO.shareImagePath],
    creator: "@Lorimer_Jenkins",
    site: "@Lorimer_Jenkins",
  },

  alternates: {
    canonical: SEO.url,
    languages: {
      // Americas
      "en-US": SEO.url,

      // Europe
      "en-GB": SEO.url,
      "de-DE": SEO.url,
      "de-AT": SEO.url,
      "de-CH": SEO.url,
      "es-ES": SEO.url,
      "es-MX": SEO.url,
      "es-AR": SEO.url,
      "es-CO": SEO.url,
      "es-CL": SEO.url,
      "fr-FR": SEO.url,
      "fr-CA": SEO.url,
      "fr-BE": SEO.url,
      "fr-CH": SEO.url,
      "it-IT": SEO.url,
      "it-CH": SEO.url,
      "nl-NL": SEO.url,
      "nl-BE": SEO.url,
      "pl-PL": SEO.url,
      "pt-PT": SEO.url,
      "pt-BR": SEO.url,
      "uk-UA": SEO.url,
      "ru-RU": SEO.url,
      "cs-CZ": SEO.url,
      "ro-RO": SEO.url,
      "el-GR": SEO.url,
      "hu-HU": SEO.url,
      "sv-SE": SEO.url,
      "da-DK": SEO.url,
      "no-NO": SEO.url,
      "fi-FI": SEO.url,
      "tr-TR": SEO.url,

      // Asia
      "zh-CN": SEO.url,
      "zh-TW": SEO.url,
      "zh-HK": SEO.url,
      "zh-SG": SEO.url,
      "ja-JP": SEO.url,
      "ko-KR": SEO.url,
      "hi-IN": SEO.url,
      "bn-BD": SEO.url,
      "bn-IN": SEO.url,
      "ta-IN": SEO.url,
      "ta-SG": SEO.url,
      "ta-LK": SEO.url,
      "te-IN": SEO.url,
      "mr-IN": SEO.url,
      "ur-PK": SEO.url,
      "ur-IN": SEO.url,
      "th-TH": SEO.url,
      "vi-VN": SEO.url,
      "id-ID": SEO.url,
      "ms-MY": SEO.url,
      "ms-SG": SEO.url,
      "tl-PH": SEO.url,
      "my-MM": SEO.url,

      // Middle East
      "ar-SA": SEO.url,
      "ar-AE": SEO.url,
      "ar-EG": SEO.url,
      "ar-MA": SEO.url,
      "ar-IQ": SEO.url,
      "ar-JO": SEO.url,
      "ar-KW": SEO.url,
      "ar-LB": SEO.url,
      "ar-QA": SEO.url,
      "he-IL": SEO.url,
      "fa-IR": SEO.url,
      "fa-AF": SEO.url,

      // Africa
      "am-ET": SEO.url,
      "ha-NG": SEO.url,
      "sw-KE": SEO.url,
      "sw-TZ": SEO.url,

      // Default fallback
      "x-default": SEO.url,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  other: {
    "script:ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${SEO.url}#person`,
        name: SEO.name,
        familyName: "Jenkins",
        description: SEO.description,
        birthDate: "2003-07-30",
        brand: "LiquidOps",
        url: SEO.url,
        image: SEO.shareImagePath,
        jobTitle: "Tech Entrepreneur",
        worksFor: {
          "@type": "Organization",
          name: "LiquidOps",
          description: "Decentralized lending and borrowing protocol",
          url: "https://liquidops.io",
        },
        knowsAbout: [
          "Web3",
          "DeFi",
          "Blockchain",
          "Arweave",
          "AO",
          "Decentralized Finance",
          "LiquidOps",
        ],
        alumniOf: "Emil Dale Academy",
        nationality: "British",
        birthPlace: "United Kingdom",
        sameAs: SEO.sameAs,
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SEO.url}#website`,
        name: SEO.name,
        description: SEO.description,
        url: SEO.url,
        author: {
          "@type": "Person",
          "@id": `${SEO.url}#person`,
        },
        inLanguage: "en-US",
        copyrightYear: new Date().getFullYear(),
        copyrightHolder: {
          "@type": "Person",
          "@id": `${SEO.url}#person`,
        },
      },
    ]),
  },
};
