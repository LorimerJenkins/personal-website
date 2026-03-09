export interface BlogConfig {
  slug: string;
}

const blogsConfig: BlogConfig[] = [{ slug: "upshot" }];

export const blogs = [...blogsConfig].reverse();
