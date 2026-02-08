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
import { projects, socialIcons, toolIcons } from "./projectsData";

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
  const subtitleText = isLoading ? "What I've been building" : t("subtitle");
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
        <div className={styles.header}>
          <h1 className={styles.title}>{titleText}</h1>
          <p className={styles.subtitle}>{subtitleText}</p>
        </div>

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
