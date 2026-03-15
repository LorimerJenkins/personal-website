export interface BlogConfig {
  slug: string;
}

const blogsConfig: BlogConfig[] = [
  { slug: "upshot" },
  { slug: "stopping-consuming-and-starting-creating" },
];

export const blogs = [...blogsConfig].reverse();
