import type { SupportedLocale } from "@/utils/translations";

export interface BlogPostData {
  title: string;
  excerpt: string;
  date: string;
  content: string;
}

export interface LoadedBlog {
  slug: string;
  data: BlogPostData;
}

/**
 * Parses a blog .txt file with the format:
 *
 * title: My Blog Title
 * excerpt: A short description...
 * date: November 9th, 2025
 * ---
 * The actual blog content goes here.
 *
 * Multiple paragraphs supported.
 */
function parseBlogFile(raw: string): BlogPostData {
  const separatorIndex = raw.indexOf("\n---\n");

  if (separatorIndex === -1) {
    // No metadata header — treat entire file as content
    return {
      title: "Untitled",
      excerpt: "",
      date: "",
      content: raw.trim(),
    };
  }

  const header = raw.substring(0, separatorIndex);
  const content = raw.substring(separatorIndex + 5).trim(); // skip \n---\n

  const metadata: Record<string, string> = {};
  for (const line of header.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.substring(0, colonIndex).trim().toLowerCase();
    const value = line.substring(colonIndex + 1).trim();
    metadata[key] = value;
  }

  return {
    title: metadata.title || "Untitled",
    excerpt: metadata.excerpt || "",
    date: metadata.date || "",
    content,
  };
}

/**
 * Fetches a single blog post for a given locale, falling back to English.
 */
export async function fetchBlogPost(
  slug: string,
  locale: SupportedLocale,
): Promise<BlogPostData | null> {
  // Try the requested locale first
  try {
    const res = await fetch(`/blogs/${slug}/${locale}.txt`);
    if (res.ok) {
      const raw = await res.text();
      return parseBlogFile(raw);
    }
  } catch {
    // Fall through to English fallback
  }

  // Fallback to English
  if (locale !== "en") {
    try {
      const res = await fetch(`/blogs/${slug}/en.txt`);
      if (res.ok) {
        const raw = await res.text();
        return parseBlogFile(raw);
      }
    } catch {
      // No content available
    }
  }

  return null;
}

/**
 * Fetches all blog posts for the listing page.
 * Returns an array of loaded blogs in the order provided.
 */
export async function fetchAllBlogPosts(
  slugs: string[],
  locale: SupportedLocale,
): Promise<LoadedBlog[]> {
  const results = await Promise.all(
    slugs.map(async (slug) => {
      const data = await fetchBlogPost(slug, locale);
      if (!data) return null;
      return { slug, data };
    }),
  );

  return results.filter((r): r is LoadedBlog => r !== null);
}
