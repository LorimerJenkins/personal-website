import Blogs from "./blogs";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - Blogs";
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
  return <Blogs />;
};

export default Page;
