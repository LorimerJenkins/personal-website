import About from "./about";
import { metadata as data } from "@/utils/SEO/SEO";

export const metadata = {
  ...data,
  title: {
    absolute: "Lorimer Jenkins - About",
  },
};

const Page = () => {
  return <About />;
};

export default Page;
