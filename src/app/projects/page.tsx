import Projects from "./projects";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Projects";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: "/projects",
  },
};

const Page = () => {
  return <Projects />;
};

export default Page;
