"use client";

import styles from "./projects.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { parseLinks } from "@/utils/parseLinks";

type SocialPlatform =
  | "website"
  | "github"
  | "youtube"
  | "x"
  | "instagram"
  | "tiktok"
  | "threads"
  | "defillama"
  | "linkedin"
  | "substack"
  | "facebook"
  | "pinterest"
  | "npm"
  | "snapchat"
  | "bluesky"
  | "linktree";

type Tool =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "nodejs"
  | "python"
  | "figma"
  | "git"
  | "graphql"
  | "mongodb"
  | "html"
  | "css"
  | "lua"
  | "heroku"
  | "reactnative"
  | "bun"
  | "npm"
  | "auth0"
  | "arweave"
  | "ao"
  | "markdown"
  | "expo"
  | "githubActions"
  | "jwt"
  | "veed"
  | "tiktok"
  | "jest"
  | "irys"
  | "polkadot"
  | "kusama"
  | "base"
  | "ethereum"
  | "solidity"
  | "prettier"
  | "claude"
  | "repurposeio"
  | "webflow"
  | "parceljs"
  | "npx"
  | "netlify";

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface VideoThumbnail {
  url: string;
  thumbnail: string;
}

interface Project {
  id: string;
  name: string;
  descriptionKey: string;
  year?: string;
  roleKey?: string;
  logo?: string;
  image?: string;
  links?: SocialLink[];
  tools?: Tool[];
  videos?: [VideoThumbnail, VideoThumbnail, VideoThumbnail];
}

const socialIcons: Record<SocialPlatform, string> = {
  website: "/images/icons/social-media/website.svg",
  github: "/images/icons/social-media/github.svg",
  youtube: "/images/icons/social-media/youtube.svg",
  x: "/images/icons/social-media/x.svg",
  instagram: "/images/icons/social-media/instagram.svg",
  tiktok: "/images/icons/social-media/tiktok.svg",
  threads: "/images/icons/social-media/threads.svg",
  defillama: "/images/icons/social-media/defillama.svg",
  linkedin: "/images/icons/social-media/linkedin.svg",
  substack: "/images/icons/social-media/substack.svg",
  facebook: "/images/icons/social-media/facebook.svg",
  pinterest: "/images/icons/social-media/pinterest.svg",
  linktree: "/images/icons/social-media/linktree.svg",
  npm: "/images/icons/social-media/npm.svg",
  snapchat: "/images/icons/social-media/snapchat.svg",
  bluesky: "/images/icons/social-media/bluesky.svg",
};

const toolIcons: Record<Tool, { icon: string; label: string; url: string }> = {
  react: {
    icon: "/images/icons/tools/react.svg",
    label: "React",
    url: "https://react.dev",
  },
  nextjs: {
    icon: "/images/icons/tools/nextjs.svg",
    label: "Next.js",
    url: "https://nextjs.org",
  },
  typescript: {
    icon: "/images/icons/tools/typescript.svg",
    label: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  javascript: {
    icon: "/images/icons/tools/javascript.svg",
    label: "JavaScript",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  nodejs: {
    icon: "/images/icons/tools/nodejs.svg",
    label: "Node.js",
    url: "https://nodejs.org",
  },
  python: {
    icon: "/images/icons/tools/python.svg",
    label: "Python",
    url: "https://www.python.org",
  },
  figma: {
    icon: "/images/icons/tools/figma.svg",
    label: "Figma",
    url: "https://www.figma.com",
  },
  git: {
    icon: "/images/icons/tools/git.svg",
    label: "Git",
    url: "https://git-scm.com",
  },
  graphql: {
    icon: "/images/icons/tools/graphql.svg",
    label: "GraphQL",
    url: "https://graphql.org",
  },
  mongodb: {
    icon: "/images/icons/tools/mongodb.svg",
    label: "MongoDB",
    url: "https://www.mongodb.com",
  },
  html: {
    icon: "/images/icons/tools/html.svg",
    label: "HTML",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  css: {
    icon: "/images/icons/tools/css.svg",
    label: "CSS",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  lua: {
    icon: "/images/icons/tools/lua.svg",
    label: "Lua",
    url: "https://www.lua.org",
  },
  heroku: {
    icon: "/images/icons/tools/heroku.svg",
    label: "Heroku",
    url: "https://www.heroku.com",
  },
  reactnative: {
    icon: "/images/icons/tools/react.svg",
    label: "React Native",
    url: "https://reactnative.dev",
  },
  bun: {
    icon: "/images/icons/tools/bun.svg",
    label: "Bun",
    url: "https://bun.sh",
  },
  netlify: {
    icon: "/images/icons/tools/netlify.svg",
    label: "Netlify",
    url: "https://www.netlify.com",
  },
  npm: {
    icon: "/images/icons/tools/npm.svg",
    label: "Npm",
    url: "https://www.npmjs.com",
  },
  auth0: {
    icon: "/images/icons/tools/auth0.svg",
    label: "Auth0",
    url: "https://auth0.com",
  },
  arweave: {
    icon: "/images/icons/tools/arweave.svg",
    label: "Arweave",
    url: "https://www.arweave.org",
  },
  ao: {
    icon: "/images/icons/tools/ao.svg",
    label: "AO",
    url: "https://ao.arweave.dev",
  },
  markdown: {
    icon: "/images/icons/tools/markdown.svg",
    label: "Markdown",
    url: "https://www.markdownguide.org",
  },
  expo: {
    icon: "/images/icons/tools/expo.svg",
    label: "Expo",
    url: "https://expo.dev",
  },
  githubActions: {
    icon: "/images/icons/tools/githubActions.svg",
    label: "GitHub Actions",
    url: "https://github.com/features/actions",
  },
  jwt: {
    icon: "/images/icons/tools/jwt.svg",
    label: "JWT",
    url: "https://jwt.io",
  },
  veed: {
    icon: "/images/icons/tools/veed.svg",
    label: "Veed",
    url: "https://www.veed.io",
  },
  tiktok: {
    icon: "/images/icons/tools/tiktok.svg",
    label: "TikTok",
    url: "https://www.tiktok.com",
  },
  jest: {
    icon: "/images/icons/tools/jest.svg",
    label: "Jest",
    url: "https://jestjs.io",
  },
  irys: {
    icon: "/images/icons/tools/irys.svg",
    label: "Irys",
    url: "https://irys.xyz",
  },
  polkadot: {
    icon: "/images/icons/tools/polkadot.svg",
    label: "Polkadot",
    url: "https://polkadot.network",
  },
  kusama: {
    icon: "/images/icons/tools/kusama.svg",
    label: "Kusama",
    url: "https://kusama.network",
  },
  solidity: {
    icon: "/images/icons/tools/solidity.svg",
    label: "Solidity",
    url: "https://soliditylang.org",
  },
  ethereum: {
    icon: "/images/icons/tools/ethereum.svg",
    label: "Ethereum",
    url: "https://ethereum.org",
  },
  base: {
    icon: "/images/icons/tools/base.svg",
    label: "Base",
    url: "https://base.org",
  },
  prettier: {
    icon: "/images/icons/tools/prettier.svg",
    label: "Prettier",
    url: "https://prettier.io",
  },
  claude: {
    icon: "/images/icons/tools/claude.svg",
    label: "Claude",
    url: "https://claude.ai",
  },
  repurposeio: {
    icon: "/images/icons/tools/repurposeio.svg",
    label: "Repurpose.io",
    url: "https://repurpose.io",
  },
  webflow: {
    icon: "/images/icons/tools/webflow.svg",
    label: "Webflow",
    url: "https://webflow.com",
  },
  parceljs: {
    icon: "/images/icons/tools/parceljs.svg",
    label: "Parcel.js",
    url: "https://parceljs.org",
  },
  npx: {
    icon: "/images/icons/tools/npx.svg",
    label: "NPX",
    url: "https://docs.npmjs.com/cli/v11/commands/npx",
  },
};

const projects: Project[] = [
  {
    id: "crypto-teen",
    name: "Crypto Teen",
    descriptionKey: "cryptoTeenDescription",
    year: "2020",
    roleKey: "roleCreator",
    logo: "/images/projectLogos/cryptoTeen.png",
    links: [
      { platform: "tiktok", url: "https://www.tiktok.com/@lorimer__jenkins" },
    ],
    tools: ["tiktok"],
    videos: [
      {
        url: "https://www.tiktok.com/@lorimer__jenkins/video/7232079074049543429",
        thumbnail: "/images/CryptoTeen/1.png",
      },
      {
        url: "https://www.tiktok.com/@lorimer__jenkins/video/7232094831651196165",
        thumbnail: "/images/CryptoTeen/2.png",
      },
      {
        url: "https://www.tiktok.com/@lorimer__jenkins/video/7232075618685390085",
        thumbnail: "/images/CryptoTeen/3.png",
      },
    ],
  },
  {
    id: "wallety",
    name: "Wallety",
    descriptionKey: "walletyDescription",
    year: "2022",
    roleKey: "roleFounder",
    logo: "/images/projectLogos/wallety.png",
    image: "/images/projects/Wallety.png",
    links: [
      { platform: "website", url: "https://wallety.org" },
      { platform: "github", url: "https://github.com/WalletyOrg" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/company/78871022",
      },
    ],
    tools: [
      "javascript",
      "python",
      "html",
      "css",
      "npm",
      "netlify",
      "git",
      "figma",
      "markdown",
      "polkadot",
      "kusama",
    ],
  },
  {
    id: "othent",
    name: "Othent",
    descriptionKey: "othentDescription",
    year: "2023",
    roleKey: "roleFounder",
    logo: "/images/projectLogos/othent.svg",
    image: "/images/projects/Othent.png",
    links: [
      { platform: "website", url: "https://othent.io" },
      { platform: "x", url: "https://x.com/KeysArentSimple" },
      { platform: "github", url: "https://github.com/othent" },
      { platform: "npm", url: "https://www.npmjs.com/package/othent" },
    ],
    tools: [
      "typescript",
      "nextjs",
      "nodejs",
      "css",
      "mongodb",
      "heroku",
      "react",
      "reactnative",
      "npm",
      "netlify",
      "git",
      "figma",
      "html",
      "auth0",
      "arweave",
      "markdown",
      "expo",
      "githubActions",
      "jwt",
      "prettier",
    ],
  },
  {
    id: "subsidisejs",
    name: "Subsidise.js",
    descriptionKey: "subsidisejsDescription",
    year: "2023",
    roleKey: "roleBuilt",
    logo: "/images/projectLogos/subsidisejs.png",
    image: "/images/projects/subsidisejs.png",
    links: [
      {
        platform: "github",
        url: "https://github.com/LorimerJenkins/Subsidise-JS",
      },
      { platform: "npm", url: "https://www.npmjs.com/package/@othent/pay" },
    ],
    tools: [
      "typescript",
      "nodejs",
      "npm",
      "git",
      "arweave",
      "jest",
      "irys",
      "prettier",
    ],
  },
  {
    id: "aohtml",
    name: "AO HTML",
    descriptionKey: "aohtmlDescription",
    year: "2024",
    roleKey: "roleBuilt",
    logo: "/images/projectLogos/aohtml.png",
    image: "/images/projects/aohtml.png",
    links: [
      {
        platform: "github",
        url: "https://github.com/labscommunity/AO_HTML",
      },
    ],
    tools: ["lua", "javascript", "html", "ao", "git", "npm", "parceljs", "npx"],
  },
  {
    id: "coolarweaveaddress",
    name: "Cool Arweave Address",
    descriptionKey: "coolarweaveaddressDescription",
    year: "2024",
    roleKey: "roleBuilt",
    logo: "/images/projectLogos/coolarweaveaddress.png",
    image: "/images/projects/coolarweaveaddress.png",
    links: [
      {
        platform: "github",
        url: "https://github.com/LorimerJenkins/CoolArweaveAddress",
      },
    ],
    tools: ["typescript", "bun", "arweave", "git", "prettier", "claude"],
  },
  {
    id: "liquidops",
    name: "LiquidOps",
    descriptionKey: "liquidOpsDescription",
    year: "2024",
    roleKey: "roleCoFounderCEO",
    logo: "/images/projectLogos/liquidOps.svg",
    image: "/images/projects/LiquidOps.png",
    links: [
      { platform: "website", url: "https://labs.liquidops.io" },
      { platform: "x", url: "https://x.com/Liquid_Ops" },
      { platform: "youtube", url: "https://www.youtube.com/@Liquid_Ops" },
      { platform: "github", url: "https://github.com/useLiquidOps" },
      {
        platform: "defillama",
        url: "https://defillama.com/protocol/liquidops",
      },
      { platform: "linktree", url: "https://linktr.ee/LiquidOps" },
      { platform: "npm", url: "https://www.npmjs.com/package/liquidops" },
    ],
    tools: [
      "typescript",
      "react",
      "nextjs",
      "figma",
      "css",
      "mongodb",
      "lua",
      "heroku",
      "bun",
      "netlify",
      "git",
      "html",
      "arweave",
      "ao",
      "markdown",
      "githubActions",
      "prettier",
      "webflow",
    ],
  },
  {
    id: "content-creator",
    name: "Content Creator",
    descriptionKey: "contentCreationDescription",
    year: "2025",
    roleKey: "roleCreator",
    logo: "/images/projectLogos/contentCreator.jpg",
    tools: ["veed", "figma", "repurposeio"],
    links: [
      { platform: "youtube", url: "https://youtube.com/@LorimerJenkins" },
      {
        platform: "instagram",
        url: "https://www.instagram.com/lorimer_jenkins",
      },
      { platform: "tiktok", url: "https://www.tiktok.com/@lorimer.jenkins" },
      { platform: "x", url: "https://x.com/lorimer_jenkins" },
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/lorimerjenkins/recent-activity/videos",
      },
      { platform: "substack", url: "https://substack.com/@lorimer" },
      { platform: "facebook", url: "https://www.facebook.com/lorimerjenkins" },
      { platform: "pinterest", url: "https://pinterest.com/lorimer_jenkins" },
      { platform: "threads", url: "https://www.threads.com/@lorimer_jenkins" },
      {
        platform: "snapchat",
        url: "https://www.snapchat.com/@lorimer_jenkins",
      },
      { platform: "bluesky", url: "https://bsky.app/profile/lorimerjenkins" },
      { platform: "linktree", url: "https://linktr.ee/lorimerjenkins" },
    ],
    videos: [
      {
        url: "https://youtube.com/shorts/ZRaYWTjygaQ",
        thumbnail: "/images/ContentCreator/1.png",
      },
      {
        url: "https://youtube.com/shorts/dtOlytbvoHU",
        thumbnail: "/images/ContentCreator/2.png",
      },
      {
        url: "https://www.youtube.com/shorts/y3zE3u0YPGs",
        thumbnail: "/images/ContentCreator/3.png",
      },
    ],
  },
  // {
  //   id: "astro",
  //   name: "Astro",
  //   descriptionKey: "astroDescription",
  //   year: "2025",
  //   roleKey: "roleAstro",
  //   logo: "/images/projectLogos/astro.png",
  //   image: "/images/projects/astro.png",
  //   links: [
  //     { platform: "website", url: "https://www.astrousd.com/" },
  //     { platform: "x", url: "https://x.com/AstroUSD" },
  //     {
  //       platform: "defillama",
  //       url: "https://defillama.com/protocol/astro",
  //     },
  //     { platform: "linkedin", url: "https://www.linkedin.com/company/astro-1" },
  //     { platform: "github", url: "https://github.com/astro-protocol" },
  //   ],
  //   tools: [
  //     "typescript",
  //     "nextjs",
  //     "figma",
  //     "css",
  //     "lua",
  //     "git",
  //     "html",
  //     "ao",
  //     "markdown",
  //     "solidity",
  //     "ethereum",
  //     "base",
  //     "prettier",
  //     "webflow",
  //   ],
  // },
  {
    id: "aothecomputer",
    name: "AO The Computer .com",
    descriptionKey: "aothecomputerDescription",
    year: "2025",
    roleKey: "roleBuilt",
    logo: "/images/projectLogos/aothecomputer.png",
    image: "/images/projects/aothecomputer.png",
    links: [{ platform: "website", url: "https://aothecomputer.com" }],
    tools: ["figma", "webflow"],
  },
];

function Projects() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("ProjectsPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const hasScrolled = useRef(false);

  useEffect(() => {
    setLocale(getLocaleFromStorage());

    const handleLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: SupportedLocale }>;
      setLocale(customEvent.detail.locale);
    };

    window.addEventListener("localeChange", handleLocaleChange);
    return () => {
      window.removeEventListener("localeChange", handleLocaleChange);
    };
  }, []);

  // Handle hash navigation
  useEffect(() => {
    if (hasScrolled.current) return;

    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
          hasScrolled.current = true;
        }
      }
    };

    scrollToHash();

    const handleHashChange = () => {
      hasScrolled.current = false;
      scrollToHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isLoading]);

  const loadingText = isLoading ? "Loading..." : t("loading");
  const titleText = isLoading ? "Projects" : t("title");
  const noProjectsText = isLoading ? "No projects available." : t("noProjects");

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.body}>
          <div>{loadingText}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.body}>
        <h1 className={styles.title}>{titleText}</h1>

        {projects && projects.length > 0 ? (
          <div className={styles.projectList}>
            {[...projects].reverse().map((project) => (
              <article
                key={project.id}
                id={project.id}
                className={styles.projectCard}
                tabIndex={-1}
              >
                <div className={styles.projectContent}>
                  <div className={styles.projectHeader}>
                    <div className={styles.projectTitleRow}>
                      {project.logo && (
                        <div className={styles.projectLogoWrapper}>
                          <Image
                            src={project.logo}
                            alt={`${project.name} logo`}
                            fill
                            className={styles.projectLogo}
                          />
                        </div>
                      )}
                      <div className={styles.projectTitleInfo}>
                        <h2 className={styles.projectName}>{project.name}</h2>

                        {(project.year || project.roleKey) && (
                          <p className={styles.projectMeta}>
                            {project.year}
                            {project.year && project.roleKey && (
                              <span className={styles.metaDot}>•</span>
                            )}
                            {project.roleKey && t(project.roleKey)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className={styles.projectDescription}>
                    {parseLinks(t(project.descriptionKey))}
                  </p>

                  {/* Tools/Frameworks */}
                  {project.tools && project.tools.length > 0 && (
                    <div className={styles.toolsContainer}>
                      {project.tools.map((tool) => (
                        <a
                          key={tool}
                          href={toolIcons[tool].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.toolBadgeLink}
                        >
                          <div className={styles.toolBadge}>
                            <Image
                              src={toolIcons[tool].icon}
                              alt={toolIcons[tool].label}
                              width={18}
                              height={18}
                              className={styles.toolIcon}
                            />
                            <span className={styles.toolLabel}>
                              {toolIcons[tool].label}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {project.links && project.links.length > 0 && (
                    <div className={styles.projectLinks}>
                      {project.links.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialIconLink}
                          style={{
                            maskImage: `url(${socialIcons[link.platform]})`,
                          }}
                          aria-label={link.platform}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Video Thumbnails (YouTube Shorts, TikTok, etc.) */}
                {project.videos ? (
                  <div className={styles.videosContainer}>
                    {project.videos.map((video, index) => (
                      <a
                        key={index}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.videoLink}
                      >
                        <div className={styles.videoWrapper}>
                          <Image
                            src={video.thumbnail}
                            alt={`${project.name} video ${index + 1}`}
                            fill
                            className={styles.videoThumbnail}
                          />
                          {/* Play button overlay */}
                          <div className={styles.playOverlay}>
                            <div className={styles.playButton}>
                              <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className={styles.playIcon}
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : project.image ? (
                  <div className={styles.projectImageWrapper}>
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className={styles.projectImage}
                    />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.noProjects}>{noProjectsText}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Projects;
