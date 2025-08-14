import About from "./about";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - About";
export const metadata = {
  ...data,
  title: {
    absolute: title,
  },
  alternates: {
    ...data.alternates,
    canonical: title,
  },
};

const Page = () => {
  return <About />;
};

export default Page;
