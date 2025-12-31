"use client";
import styles from "./WorkingOn.module.css";
import { useTranslation } from "@/hooks/useTranslation";
import { parseLinks } from "@/utils/parseLinks";
import Image from "next/image";
import Link from "next/link";
import { getProjectById, socialIcons } from "../../projects/projectsData";

interface WorkingOnProps {
  projectId: string;
}

function WorkingOn({ projectId }: WorkingOnProps) {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("ProjectsPage");

  const project = getProjectById(projectId);

  if (!project) {
    return null;
  }

  const sectionTitleText = isLoading ? "Currently Working On" : t("workingOn");
  const descriptionText = isLoading ? "Loading..." : t(project.descriptionKey);
  const roleText = project.roleKey
    ? isLoading
      ? "Loading..."
      : t(project.roleKey)
    : null;
  const seeMoreText = isLoading ? "See more projects" : t("seeMoreProjects");

  return (
    <section className={styles.workingOnContainer}>
      <h2 className={styles.sectionTitle}>{sectionTitleText}</h2>

      <article className={styles.projectCard}>
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
                <h3 className={styles.projectName}>{project.name}</h3>
                {(project.year || roleText) && (
                  <p className={styles.projectMeta}>{roleText}</p>
                )}
              </div>
            </div>
          </div>

          <p className={styles.projectDescription}>
            {parseLinks(descriptionText)}
          </p>

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

          <Link href="/projects" className={styles.seeMoreLink}>
            {seeMoreText}
            <svg
              className={styles.arrowIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {project.image && (
          <div className={styles.projectImageWrapper}>
            <Image
              src={project.image}
              alt={project.name}
              fill
              className={styles.projectImage}
            />
          </div>
        )}
      </article>
    </section>
  );
}

export default WorkingOn;
