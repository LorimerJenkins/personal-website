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
};

const toolIcons: Record<Tool, { icon: string; label: string }> = {
  react: { icon: "/images/icons/tools/react.svg", label: "React" },
  nextjs: { icon: "/images/icons/tools/nextjs.svg", label: "Next.js" },
  typescript: {
    icon: "/images/icons/tools/typescript.svg",
    label: "TypeScript",
  },
  javascript: {
    icon: "/images/icons/tools/javascript.svg",
    label: "JavaScript",
  },
  nodejs: { icon: "/images/icons/tools/nodejs.svg", label: "Node.js" },
  python: { icon: "/images/icons/tools/python.svg", label: "Python" },
  figma: { icon: "/images/icons/tools/figma.svg", label: "Figma" },
  git: { icon: "/images/icons/tools/git.svg", label: "Git" },
  graphql: { icon: "/images/icons/tools/graphql.svg", label: "GraphQL" },
  mongodb: { icon: "/images/icons/tools/mongodb.svg", label: "MongoDB" },
  html: { icon: "/images/icons/tools/html.svg", label: "HTML" },
  css: { icon: "/images/icons/tools/css.svg", label: "CSS" },
  lua: { icon: "/images/icons/tools/lua.svg", label: "Lua" },
  heroku: { icon: "/images/icons/tools/heroku.svg", label: "Heroku" },
  reactnative: { icon: "/images/icons/tools/react.svg", label: "React Native" },
  bun: { icon: "/images/icons/tools/bun.svg", label: "Bun" },
  netlify: { icon: "/images/icons/tools/netlify.svg", label: "Netlify" },
  npm: { icon: "/images/icons/tools/npm.svg", label: "Npm" },
  auth0: { icon: "/images/icons/tools/auth0.svg", label: "Auth0" },
  arweave: { icon: "/images/icons/tools/arweave.svg", label: "Arweave" },
  ao: { icon: "/images/icons/tools/ao.svg", label: "AO" },
  markdown: { icon: "/images/icons/tools/markdown.svg", label: "Markdown" },
  expo: { icon: "/images/icons/tools/expo.svg", label: "Expo" },
  githubActions: {
    icon: "/images/icons/tools/githubActions.svg",
    label: "GitHub Actions",
  },
  jwt: {
    icon: "/images/icons/tools/jwt.svg",
    label: "JWT",
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
    ],
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
    ],
  },
  {
    id: "content-creator",
    name: "Content Creator",
    descriptionKey: "contentCreationDescription",
    year: "2025",
    roleKey: "roleCreator",
    logo: "/images/projectLogos/contentCreator.jpg",
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
        url: "https://youtube.com/shorts/AsSj9otvdBA",
        thumbnail: "/images/ContentCreator/3.png",
      },
    ],
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
        <div className={styles.body}>
          <p style={{ margin: 0 }}>{loadingText}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <h1 className={styles.title}>{titleText}</h1>
        <div className={styles.projectList}>
          {projects && projects.length > 0 ? (
            [...projects].reverse().map((project) => (
              <div
                key={project.id}
                id={project.id}
                className={styles.projectCard}
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
                            sizes="48px"
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
                        <div
                          key={tool}
                          className={styles.toolBadge}
                          title={toolIcons[tool].label}
                        >
                          <Image
                            src={toolIcons[tool].icon}
                            alt={toolIcons[tool].label}
                            width={20}
                            height={20}
                            className={styles.toolIcon}
                          />
                          <span className={styles.toolLabel}>
                            {toolIcons[tool].label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {project.links && project.links.length > 0 && (
                    <div className={styles.projectLinks}>
                      {project.links.map((link) => (
                        <a
                          key={`${link.platform}-${link.url}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.socialIconLink}
                          aria-label={link.platform}
                        >
                          <Image
                            src={socialIcons[link.platform]}
                            alt={link.platform}
                            width={32}
                            height={32}
                            className={styles.socialIcon}
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video Thumbnails (YouTube Shorts, TikTok, etc.) */}
                {project.videos ? (
                  <div className={styles.videosContainer}>
                    {project.videos.map((video, index) => (
                      <a
                        key={video.url}
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.videoLink}
                      >
                        <div className={styles.videoWrapper}>
                          <img
                            src={video.thumbnail}
                            alt={`${project.name} Video ${index + 1}`}
                            className={styles.videoThumbnail}
                          />
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
                      sizes="(max-width: 768px) 100vw, 468px"
                    />
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <p className={styles.noProjects}>{noProjectsText}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
