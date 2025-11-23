import { use } from "react";
import BlogPost from "./blogPost";
import { blogPosts } from "../data/blogPosts";
import { metadata as data } from "@/utils/SEO/SEO";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  // Use English title for metadata by default
  const title = post
    ? `Lorimer Jenkins - ${post.translations.en.title}`
    : `Lorimer Jenkins - ${slug}`;

  return {
    ...data,
    title: {
      absolute: title,
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
