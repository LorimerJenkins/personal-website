import { keyWords } from "./keywords";

// SEO content
const siteWideDescription = `Lorimer Jenkins is a tech entrepreneur from the UK, building LiquidOps a decentralized lending and borrowing protocol built in the Arweave and AO Web3 ecosystem.`;

// global SEO vars
export const siteWideSEO = {
  name: "LiquidOps",
  url: "https://liquidops.io",
  description: siteWideDescription,
  keyWords,
  icons: [
    { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    { url: "/favicon.svg", type: "image/svg+xml" },
  ],
};
