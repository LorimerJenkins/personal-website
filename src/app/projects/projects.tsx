"use client";
import styles from "./projects.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
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
  | "pinterest";

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface Project {
  name: string;
  descriptionKey: string;
  image?: string;
  links?: SocialLink[];
  shortIds?: [string, string, string];
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
};

const projects: Project[] = [
  {
    name: "Wallety",
    descriptionKey: "walletyDescription",
    image: "/images/projects/Wallety.png",
    links: [
      { platform: "website", url: "https://wallety.org" },
      { platform: "github", url: "https://github.com/WalletyOrg" },
    ],
  },
  {
    name: "Othent",
    descriptionKey: "othentDescription",
    image: "/images/projects/Othent.png",
    links: [
      { platform: "website", url: "https://othent.io" },
      { platform: "x", url: "https://x.com/KeysArentSimple" },
      { platform: "github", url: "https://github.com/othent" },
    ],
  },
  {
    name: "LiquidOps",
    descriptionKey: "liquidOpsDescription",
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
    ],
  },
  {
    name: "Content Creator",
    descriptionKey: "contentCreationDescription",
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
    ],
    // Update shorts ID's here
    shortIds: ["ZRaYWTjygaQ", "fcc1sHCjXKQ", "fiGrnjI3DyA"],
  },
];

function Projects() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("ProjectsPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");

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
              <div key={project.name} className={styles.projectCard}>
                <div className={styles.projectContent}>
                  <h2 className={styles.projectName}>{project.name}</h2>
                  <p className={styles.projectDescription}>
                    {parseLinks(t(project.descriptionKey))}
                  </p>
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

                {/* YouTube Shorts */}
                {project.shortIds ? (
                  <div className={styles.shortsContainer}>
                    {project.shortIds.map((id, index) => (
                      <a
                        key={id}
                        href={`https://youtube.com/shorts/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shortLink}
                      >
                        <div className={styles.shortWrapper}>
                          <img
                            src={`https://img.youtube.com/vi/${id}/oar2.jpg`}
                            alt={`${project.name} Short ${index + 1}`}
                            className={styles.shortThumbnail}
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
