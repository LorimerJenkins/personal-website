import { use } from "react";
import fs from "fs";
import path from "path";
import BlogPost from "./blogPost";
import { blogs } from "../slugs";
import { metadata as data, SEO } from "@/utils/SEO/SEO";

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

function parseBlogMeta(slug: string) {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "blogs",
      slug,
      "en.txt",
    );
    const raw = fs.readFileSync(filePath, "utf-8");
    const separatorIndex = raw.indexOf("\n---\n");
    if (separatorIndex === -1) return null;

    const header = raw.substring(0, separatorIndex);
    const metadata: Record<string, string> = {};
    for (const line of header.split("\n")) {
      const colonIndex = line.indexOf(":");
      if (colonIndex === -1) continue;
      const key = line.substring(0, colonIndex).trim().toLowerCase();
      const value = line.substring(colonIndex + 1).trim();
      metadata[key] = value;
    }

    return {
      title: metadata.title || null,
      excerpt: metadata.excerpt || null,
      date: metadata.date || null,
    };
  } catch {
    return null;
  }
}

function getHeaderImage(slug: string): string | null {
  const filePath = path.join(
    process.cwd(),
    "public",
    "blogs",
    slug,
    "header.png",
  );
  if (fs.existsSync(filePath)) {
    return `${SEO.url}/blogs/${slug}/header.png`;
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const meta = parseBlogMeta(slug);
  const headerImage = getHeaderImage(slug);

  const title = meta?.title
    ? `Lorimer Jenkins - ${meta.title}`
    : `Lorimer Jenkins - ${slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}`;

  const description = meta?.excerpt || SEO.description;
  const ogImage = headerImage || SEO.shareImagePath;

  return {
    ...data,
    title: {
      absolute: title,
    },
    description,
    openGraph: {
      ...data.openGraph,
      title,
      description,
      url: `${SEO.url}/writing/${slug}`,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta?.title || slug,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@Lorimer_Jenkins",
      site: "@Lorimer_Jenkins",
    },
    alternates: {
      ...data.alternates,
      canonical: `/writing/${slug}`,
    },
  };
}

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = use(params);
  return <BlogPost slug={slug} />;
};

export default Page;
