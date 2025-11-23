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

interface Project {
  name: string;
  descriptionKey: string;
  image: string;
  website: string;
  github?: string;
}

const projects: Project[] = [
  {
    name: "Wallety",
    descriptionKey: "walletyDescription",
    image: "/images/projects/Wallety.png",
    website: "https://wallety.org",
    github: "https://github.com/WalletyOrg",
  },
  {
    name: "Othent",
    descriptionKey: "othentDescription",
    image: "/images/projects/Othent.png",
    website: "https://othent.io",
    github: "https://github.com/othent",
  },
  {
    name: "LiquidOps",
    descriptionKey: "liquidOpsDescription",
    image: "/images/projects/LiquidOps.png",
    website: "https://liquidops.io",
    github: "https://github.com/useLiquidOps",
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
  const websiteText = isLoading ? "Website" : t("website");
  const githubText = isLoading ? "Github" : t("github");
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
            projects.toReversed().map((project) => (
              <div key={project.website} className={styles.projectCard}>
                <div className={styles.projectContent}>
                  <h2 className={styles.projectName}>{project.name}</h2>
                  <p className={styles.projectDescription}>
                    {t(project.descriptionKey)}
                  </p>
                  <div className={styles.projectLinks}>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      {websiteText}
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        {githubText}
                      </a>
                    )}
                  </div>
                </div>
                <div className={styles.projectImageWrapper}>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className={styles.projectImage}
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
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
