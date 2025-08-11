import { keyWords } from "./keywords";
import { Metadata } from "next";

// global SEO vars
export const SEO = {
  name: "Lorimer Jenkins",
  url: "https://lorimerjenkins.com",
  description: `Lorimer Jenkins is a tech entrepreneur from the UK, building LiquidOps a decentralized lending and borrowing protocol built in the Arweave and AO Web3 ecosystem.`,
  keyWords,
  icons: [
    {
      url: "https://arweave.net/bdL4InvwkBhT5gZ3dq-mhS3lzMCwTVcf-UxMivpKcRQ",
      sizes: "any",
      type: "image/x-icon",
    },
    {
      url: "https://arweave.net/MjJ3aY7v6nafYduLtjZaPbh0Lf2OzEIgr_tDlzdmeas",
      type: "image/svg+xml",
    },
  ],
  shareImagePath:
    "https://arweave.net/Fqu7AZ6B5vkb9KLgQFfV_Yd0egSafsW39W8AIMRDu-Q",
  author: "Lorimer Jenkins",
  locale: "en_US",
  themeColor: "#000000",
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
    "https://arweavehub.com/people/lorimer-jenkins",
    "https://labs.liquidops.io/#team",
  ],
};

export const metadata: Metadata = {
  title: {
    default: SEO.name,
    template: SEO.name,
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
      "en-US": SEO.url,
      "en-GB": SEO.url,
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

  // Theme and viewport (Next.js 14+ handles viewport separately)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SEO.themeColor },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],

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
        jobTitle: "Co-founder & Tech Entrepreneur",
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
