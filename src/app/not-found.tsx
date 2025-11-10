import FoF from "./404/404";
import { metadata as data } from "@/utils/SEO/SEO";

const title = "Lorimer Jenkins - 404";
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
  return <FoF />;
};

export default Page;

