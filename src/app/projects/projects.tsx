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

interface InstagramReel {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  title?: string;
  likeCount?: string;
  commentsCount?: string;
  viewCount?: string;
}

function formatCount(count: string): string {
  const n = parseInt(count, 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function Projects() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("ProjectsPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const hasScrolled = useRef(false);
  const [reels, setReels] = useState<InstagramReel[]>([]);

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

  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) return;
        const data = await res.json();
        setReels(Array.isArray(data) ? data : [data]);
      } catch {
        // Silently fail — content creator card hidden if no reels
      }
    }
    fetchReels();
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

  const likeIcon = (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );

  const commentIcon = (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );

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
            {[...projects].reverse().map((project) => {
              const isContentCreator = project.id === "content-creator";

              // Hide content creator card entirely if reels haven't loaded
              if (isContentCreator && reels.length === 0) return null;

              return (
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

                  {/* Instagram Reels for Content Creator, videos for others */}
                  {isContentCreator ? (
                    <div className={styles.videosContainer}>
                      {reels.map((reel) => (
                        <a
                          key={reel.id}
                          href={reel.permalink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.videoLink}
                        >
                          <div className={styles.videoWrapper}>
                            {reel.thumbnailUrl ? (
                              <img
                                src={reel.thumbnailUrl}
                                alt={reel.title ?? "Instagram Reel"}
                                className={styles.videoThumbnail}
                              />
                            ) : (
                              <video
                                src={reel.mediaUrl}
                                className={styles.videoThumbnail}
                                muted
                                playsInline
                              />
                            )}
                            {(reel.likeCount || reel.commentsCount) && (
                              <div className={styles.reelStats}>
                                {reel.likeCount && (
                                  <span className={styles.reelStat}>
                                    {likeIcon}
                                    {formatCount(reel.likeCount)}
                                  </span>
                                )}
                                {reel.commentsCount && (
                                  <span className={styles.reelStat}>
                                    {commentIcon}
                                    {formatCount(reel.commentsCount)}
                                  </span>
                                )}
                              </div>
                            )}
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
                            {reel.title && (
                              <div className={styles.reelTitleOverlay}>
                                <span className={styles.reelTitle}>
                                  {reel.title}
                                </span>
                              </div>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : project.videos ? (
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
              );
            })}
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
