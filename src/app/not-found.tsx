import FoF from "./404/404";
import { metadata as data } from "@/utils/SEO/SEO";

export const metadata = {
  ...data,
  title: {
    absolute: "Lorimer Jenkins - 404",
  },
};

const Page = () => {
  return <FoF />;
};

export default Page;
