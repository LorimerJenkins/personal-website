import { use } from "react";
import BlogPost from "./blogPost";
import { blogs } from "../Blogs";
import { metadata as data } from "@/utils/SEO/SEO";

export function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // For metadata we use the slug formatted as a title
  // The actual translated title loads client-side from the txt file
  const formattedSlug = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const title = `Lorimer Jenkins - ${formattedSlug}`;

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
