export interface BlogConfig {
  slug: string;
}

const blogsConfig: BlogConfig[] = [{ slug: "upshot" }, { slug: "The-Echelon" }];

export const blogs = [...blogsConfig].reverse();
