"use client";
import styles from "./projects.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import projectsData from "./projects.json";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Project {
  name: string;
  description: string;
  image: string;
  website: string;
  github?: string;
}

const projects: Project[] = projectsData;

function Projects() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("Projects");
  const [locale, setLocale] = useState<SupportedLocale>("en");

  useEffect(() => {
    // Set initial locale
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

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <div className={styles.projectList}>
          {projects && projects.length > 0 ? (
            projects.toReversed().map((project) => (
              <div key={project.website} className={styles.projectCard}>
                <div className={styles.projectContent}>
                  <h2 className={styles.projectName}>{project.name}</h2>
                  <p className={styles.projectDescription}>
                    {project.description}
                  </p>
                  <div className={styles.projectLinks}>
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Website
                    </a>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLink}
                      >
                        Github
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
            <p className={styles.noProjects}>No projects available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Projects;
