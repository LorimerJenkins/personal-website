"use client";
import styles from "./LegalPage.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect } from "react";
import Link from "next/link";

// Content block types
interface TextBlock {
  type: "text";
  content: string;
}

interface HeadingBlock {
  type: "heading";
  content: string;
  level?: 2 | 3;
}

interface ListBlock {
  type: "list";
  items: string[];
  ordered?: boolean;
}

interface HighlightBlock {
  type: "highlight";
  title?: string;
  content: string;
  note?: string;
}

interface DividerBlock {
  type: "divider";
}

type ContentBlock =
  | TextBlock
  | HeadingBlock
  | ListBlock
  | HighlightBlock
  | DividerBlock;

interface LegalPageProps {
  translationSection: string;
  showLastUpdated?: boolean;
  backLink?: string;
  backLinkText?: string;
}

// Helper to render markdown-style bold text and links
function renderWithFormatting(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  const textWithLinks = text.replace(linkRegex, (_, linkText, url) => {
    return `%%LINK_START%%${linkText}%%LINK_URL%%${url}%%LINK_END%%`;
  });

  const boldParts = textWithLinks.split(/(\*\*[^*]+\*\*)/g);

  return boldParts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const innerText = part.slice(2, -2);
      return <strong key={i}>{innerText}</strong>;
    }

    if (part.includes("%%LINK_START%%")) {
      const linkParts = part.split(/(%%LINK_START%%.*?%%LINK_END%%)/g);
      return linkParts.map((linkPart, j) => {
        if (linkPart.startsWith("%%LINK_START%%")) {
          const linkMatch = linkPart.match(
            /%%LINK_START%%(.+?)%%LINK_URL%%(.+?)%%LINK_END%%/,
          );
          if (linkMatch) {
            return (
              <a
                key={`${i}-${j}`}
                href={linkMatch[2]}
                target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
                rel={
                  linkMatch[2].startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {linkMatch[1]}
              </a>
            );
          }
        }
        return linkPart;
      });
    }

    return part;
  });
}

function LegalPage({
  translationSection,
  showLastUpdated = true,
  backLink,
  backLinkText = "Go back",
}: LegalPageProps) {
  const { tSection, isLoading } = useTranslation();
  const t = tSection(translationSection);
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

  const title = t("title") as string;
  const lastUpdated = t("lastUpdated") as string;
  const contentBlocks = t("content") as unknown as ContentBlock[];

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

  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <p key={index} className={styles.paragraph}>
            {renderWithFormatting(block.content)}
          </p>
        );

      case "heading":
        if (block.level === 3) {
          return (
            <h3 key={index} className={styles.heading3}>
              {renderWithFormatting(block.content)}
            </h3>
          );
        }
        return (
          <h2 key={index} className={styles.heading2}>
            {renderWithFormatting(block.content)}
          </h2>
        );

      case "list":
        if (block.ordered) {
          return (
            <ol key={index} className={styles.orderedList}>
              {block.items.map((item, i) => (
                <li key={i}>{renderWithFormatting(item)}</li>
              ))}
            </ol>
          );
        }
        return (
          <ul key={index} className={styles.unorderedList}>
            {block.items.map((item, i) => (
              <li key={i}>{renderWithFormatting(item)}</li>
            ))}
          </ul>
        );

      case "highlight":
        return (
          <div key={index} className={styles.highlightBox}>
            {block.title && (
              <h4 className={styles.highlightTitle}>
                {renderWithFormatting(block.title)}
              </h4>
            )}
            <p className={styles.highlightContent}>
              {renderWithFormatting(block.content)}
            </p>
            {block.note && (
              <p className={styles.highlightNote}>
                {renderWithFormatting(block.note)}
              </p>
            )}
          </div>
        );

      case "divider":
        return <hr key={index} className={styles.divider} />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        {backLink && (
          <Link href={backLink} className={styles.backLink}>
            ← {backLinkText}
          </Link>
        )}
        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {showLastUpdated && lastUpdated && (
              <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
            )}
          </header>

          <div className={styles.content}>
            {Array.isArray(contentBlocks) &&
              contentBlocks.map((block, index) => renderBlock(block, index))}
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}

export default LegalPage;
