export type Category =
  | "all"
  | "predictionMarket"
  | "ventureStudio"
  | "satellites"
  | "stablecoins";

export interface Investment {
  name: string;
  website: string;
  year: number;
  month: number;
  roundKey: string;
  descriptionKey: string;
  logo: string;
  category: Category;
  founders: { name: string; x: string }[];
  acquiredBy?: { name: string; website: string };
}

export const portfolio: Investment[] = [
  {
    name: "Astro",
    website: "https://www.astrousd.com",
    year: 2024,
    month: 9,
    roundKey: "preSeed",
    descriptionKey: "astroDescription",
    logo: "/images/angelInvestments/astro.svg",
    category: "stablecoins",
    founders: [{ name: "Kadar Sayed Abdi", x: "https://x.com/Kadar1" }],
    acquiredBy: { name: "Liquid Labs", website: "https://labs.liquidops.io" },
  },
  {
    name: "Upshot",
    website: "https://upshot.cards",
    year: 2025,
    month: 12,
    roundKey: "preSeedExtension",
    descriptionKey: "upshotDescription",
    logo: "/images/angelInvestments/upshot.svg",
    category: "predictionMarket",
    founders: [{ name: "Wayne Wen", x: "https://x.com/retrimentum" }],
  },
  {
    name: "Say So",
    website: "https://sayso.market",
    year: 2026,
    month: 1,
    roundKey: "angelCheck",
    descriptionKey: "saySoDescription",
    logo: "/images/angelInvestments/saySo.svg",
    category: "predictionMarket",
    founders: [{ name: "William Kibbler", x: "https://x.com/kibbler_william" }],
  },
  {
    name: "Plasma Orbital",
    website: "https://www.plasmaorbital.com",
    year: 2026,
    month: 2,
    roundKey: "angelCheck",
    descriptionKey: "plasmaOrbitalDescription",
    logo: "/images/angelInvestments/plasmaOrbital.svg",
    category: "satellites",
    founders: [{ name: "Leo Pauly", x: "https://x.com/leopauly" }],
  },
];

export const categories: { key: Category; labelKey: string }[] = [
  { key: "all", labelKey: "allCategories" },
  { key: "stablecoins", labelKey: "categoryStablecoins" },
  { key: "ventureStudio", labelKey: "categoryVentureStudio" },
  { key: "predictionMarket", labelKey: "categoryPredictionMarket" },
  { key: "satellites", labelKey: "categorySatellites" },
];
