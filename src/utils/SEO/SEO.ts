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
  socialMedia: [
    "https://x.com/Lorimer_Jenkins",
    "https://www.linkedin.com/in/lorimerjenkins",
    "https://github.com/LorimerJenkins",
  ],
};

export const metadata: Metadata = {
  title: SEO.name,
  description: SEO.description,
  keywords: SEO.keyWords,
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
        alt: SEO.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: SEO.url,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.name,
    description: SEO.description,
    images: [SEO.shareImagePath],
  },
  robots: "index, follow",
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: SEO.name,
      description: SEO.description,
      url: SEO.url,
      jobTitle: "Co-founder",
      worksFor: {
        "@type": "Organization",
        name: "LiquidOps",
      },
      sameAs: SEO.socialMedia,
    }),
  },
};
